import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { FiMenu } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import IconBtn from "../../common/IconBtn";
import "./VideoDetailsSidebar.css";

import { setCompletedLectures } from "../../../slices/viewCourseSlice";
import { apiConnector } from "../../../services/apiconnector";

export default function VideoDetailsSidebar({ setReviewModal }) {
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");
  const [collapsed, setCollapsed] = useState(false); // UI-only: sidebar toggle for small screens

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { sectionId, subSectionId } = useParams();

  const {
    courseSectionData = [],
    courseEntireData = {},
    totalNoOfLectures = 0,
    completedLectures = {}, // object keyed by courseId
  } = useSelector((state) => state.viewCourse);

  const { token } = useSelector((state) => state.auth);

  // lectures for current course — ensure this is always an array
  const currentCompleted = Array.isArray(completedLectures)
    ? completedLectures
    : Array.isArray(completedLectures?.[courseEntireData?._id])
    ? completedLectures[courseEntireData._id]
    : [];

  // Set active section & subsection
  useEffect(() => {
    if (!courseSectionData.length) return;

    const currentSectionIndex = courseSectionData.findIndex(
      (section) => section._id === sectionId
    );

    const currentSubSectionIndex =
      courseSectionData[currentSectionIndex]?.subSection?.findIndex(
        (sub) => sub._id === subSectionId
      );

    const activeSubSectionId =
      courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;

    setActiveStatus(courseSectionData[currentSectionIndex]?._id);
    setVideoBarActive(activeSubSectionId);
  }, [courseSectionData, sectionId, subSectionId, location.pathname]);

  // Fetch completed lectures from backend
  useEffect(() => {
    const fetchCompletedLectures = async () => {
      if (!courseEntireData._id || !token) return;

      try {
        const response = await apiConnector(
          "GET",
          `/course/${courseEntireData._id}/progress`,
          null,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response?.data?.completedVideos) {
          const normalized = response.data.completedVideos.map((id) => String(id));
          dispatch(
            setCompletedLectures({
              courseId: courseEntireData._id,
              lectures: normalized,
            })
          );
        }
      } catch (error) {
        console.error("Failed to fetch completed lectures:", error);
      }
    };

    fetchCompletedLectures();
  }, [courseEntireData._id, dispatch, token]);

  // Handle marking lecture as complete
  // const handleCheckboxChange = async (subId) => {
  //   if (!token || !courseEntireData._id) return;

  //   // defensive copy: ensure prevCompleted is an array
  //   const prevCompleted = Array.isArray(currentCompleted) ? [...currentCompleted] : [];
  //   const wasCompleted = Array.isArray(prevCompleted) && prevCompleted.includes(String(subId));

  //   const optimistic = wasCompleted
  //     ? prevCompleted.filter((id) => id !== String(subId))
  //     : [...prevCompleted, String(subId)];

  //   dispatch(
  //     setCompletedLectures({
  //       courseId: courseEntireData._id,
  //       lectures: optimistic,
  //     })
  //   );

  //   try {
  //     const data = { courseId: courseEntireData._id, subsectionId: subId };
  //     const response = await apiConnector(
  //       "POST",
  //       `/course/updateCourseProgress`,
  //       data,
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );

  //     if (response?.data?.completedVideos) {
  //       const normalized = response.data.completedVideos.map((id) => String(id));
  //       dispatch(
  //         setCompletedLectures({
  //           courseId: courseEntireData._id,
  //           lectures: normalized,
  //         })
  //       );
  //     } else {
  //       // rollback
  //       dispatch(
  //         setCompletedLectures({
  //           courseId: courseEntireData._id,
  //           lectures: prevCompleted,
  //         })
  //       );
  //     }
  //   } catch (error) {
  //     // rollback
  //     dispatch(
  //       setCompletedLectures({
  //         courseId: courseEntireData._id,
  //         lectures: prevCompleted,
  //       })
  //     );
  //     console.error("Failed to mark lecture as complete:", error);
  //   }
  // };
  const handleCheckboxChange = async (subId, checked) => {
  if (!token || !courseEntireData._id) return;

  const prevCompleted = Array.isArray(currentCompleted) ? [...currentCompleted] : [];
  // Create optimistic new array based on `checked`
  const optimistic = checked
    ? Array.from(new Set([...prevCompleted, String(subId)]))
    : prevCompleted.filter((id) => id !== String(subId));

  dispatch(setCompletedLectures({
    courseId: courseEntireData._id,
    lectures: optimistic,
  }));

  try {
    const data = { courseId: courseEntireData._id, subsectionId: subId };
    const response = await apiConnector(
      "POST",
      `/course/updateCourseProgress`,
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response?.data?.completedVideos) {
      const normalized = response.data.completedVideos.map((id) => String(id));
      dispatch(setCompletedLectures({
        courseId: courseEntireData._id,
        lectures: normalized,
      }));
    } else {
      // rollback
      dispatch(setCompletedLectures({
        courseId: courseEntireData._id,
        lectures: prevCompleted,
      }));
    }
  } catch (error) {
    // rollback
    dispatch(setCompletedLectures({
      courseId: courseEntireData._id,
      lectures: prevCompleted,
    }));
    console.error("Failed to mark lecture as complete:", error);
  }
};


  // Close drawer on navigation (mobile)
  useEffect(() => {
    // close sidebar on route change for small screens
    setCollapsed(false);
  }, [location.pathname]);

  return (
    <>
      {/* overlay (only visible on mobile when sidebar is open) */}
      {collapsed && <div className="sidebar-page-overlay" onClick={() => setCollapsed(false)} />}

      <div className={`sidebar-wrapper ${collapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          <div className="sidebar-header-top">
            {/* Mobile toggle button (visible via CSS on small screens) */}
            <button
              className="sidebar-toggle-btn"
              onClick={() => setCollapsed((c) => !c)}
              aria-label="Toggle sidebar"
              title="Toggle"
            >
              <FiMenu size={18} />
            </button>

            <div
              onClick={() => navigate("/dashboard/enrolled-courses")}
              className="back-button"
              title="Back"
            >
              <IoIosArrowBack size={18} /> Back
            </div>

            <IconBtn
              text="Add Review"
              customClasses="ml-auto"
              onClick={() => setReviewModal(true)}
            />
          </div>

          <div className="sidebar-course-info">
            <p className="course-name">{courseEntireData?.courseName}</p>
            <p className="progress">
              {Array.isArray(currentCompleted) ? currentCompleted.length : 0} / {totalNoOfLectures}
            </p>
          </div>
        </div>

        <div className="sidebar-sections">
          {courseSectionData.map((section) => (
            <div className="section-container" key={section._id}>
              <div
                className="section-header"
                onClick={() =>
                  setActiveStatus((prev) => (prev === section._id ? "" : section._id))
                }
              >
                <div className="section-title">{section?.sectionName}</div>
                <span
                  className={`arrow-icon ${activeStatus === section._id ? "open" : "closed"}`}
                >
                  <BsChevronDown />
                </span>
              </div>

              {activeStatus === section._id && (
                <div className="subsection-container">
                  {(section.subSection || []).map((sub) => (
                    <div
                      key={sub._id}
                      className={`subsection-item ${videoBarActive === sub._id ? "active" : ""}`}
                    >
                      {/* <input
                        type="checkbox"
                        checked={Array.isArray(currentCompleted) && currentCompleted.includes(String(sub._id))}
                        onClick={(e) => e.stopPropagation()}
                        onChange={() => handleCheckboxChange(sub._id)}
                      /> */}
                      <input
                        type="checkbox"
                        checked={Array.isArray(currentCompleted) && currentCompleted.includes(String(sub._id))}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => handleCheckboxChange(sub._id, e.target.checked)}
                      />

                      <span
                        className="subsection-title"
                        onClick={() => {
                          navigate(
                            `/view-course/${courseEntireData._id}/section/${section._id}/sub-section/${sub._id}`
                          );
                          setVideoBarActive(sub._id);
                        }}
                      >
                        {sub.title}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
