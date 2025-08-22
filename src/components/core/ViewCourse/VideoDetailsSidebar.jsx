// import { useEffect, useState } from "react";
// import { BsChevronDown } from "react-icons/bs";
// import { IoIosArrowBack } from "react-icons/io";
// import { useSelector, useDispatch } from "react-redux";
// import { useLocation, useNavigate, useParams } from "react-router-dom";

// import IconBtn from "../../common/IconBtn";
// import "./VideoDetailsSidebar.css";

// // Actions
// import { markLectureAsComplete, setCompletedLectures } from "../../../slices/viewCourseSlice";
// import { apiConnector } from "../../../services/apiconnector"; // make sure this import exists

// export default function VideoDetailsSidebar({ setReviewModal }) {
//   const [activeStatus, setActiveStatus] = useState("");
//   const [videoBarActive, setVideoBarActive] = useState("");

//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const { sectionId, subSectionId } = useParams();

//   // Redux state
//   const {
//     courseSectionData = [],
//     courseEntireData = {},
//     totalNoOfLectures = 0,
//     completedLectures = [],
//   } = useSelector((state) => state.viewCourse);

//   const { token } = useSelector((state) => state.auth); // <- get token from auth slice

//   // Set active section & sub-section on mount / URL change
//   useEffect(() => {
//     if (!courseSectionData.length) return;

//     const currentSectionIndex = courseSectionData.findIndex(
//       (section) => section._id === sectionId
//     );

//     const currentSubSectionIndex =
//       courseSectionData[currentSectionIndex]?.subSection?.findIndex(
//         (sub) => sub._id === subSectionId
//       );

//     const activeSubSectionId =
//       courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;

//     setActiveStatus(courseSectionData[currentSectionIndex]?._id);
//     setVideoBarActive(activeSubSectionId);
//   }, [courseSectionData, sectionId, subSectionId, location.pathname]);

//   // Fetch completed lectures
//   useEffect(() => {
//     const fetchCompletedLectures = async () => {
//       if (!courseEntireData._id || !token) return;

//       try {
//         const response = await apiConnector(
//           "GET",
//           `/api/course/${courseEntireData._id}/progress`,
//           null,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         if (response?.data?.completedVideos) {
//           dispatch(setCompletedLectures(response.data.completedVideos));
//         }
//       } catch (error) {
//         console.error("Failed to fetch completed lectures:", error);
//       }
//     };

//     fetchCompletedLectures();
//   }, [courseEntireData._id, dispatch, token]);

//   return (
//     <div className="sidebar-wrapper">
//       <div className="sidebar-header">
//         <div className="sidebar-header-top">
//           <div
//             onClick={() => navigate("/dashboard/enrolled-courses")}
//             className="back-button"
//             title="Back"
//           >
//             <IoIosArrowBack size={24} />
//           </div>
//           <IconBtn
//             text="Add Review"
//             customClasses="ml-auto"
//             onClick={() => setReviewModal(true)}
//           />
//         </div>

//         <div className="sidebar-course-info">
//           <p className="course-name">{courseEntireData?.courseName}</p>
//           <p className="progress">
//             {completedLectures?.length} / {totalNoOfLectures}
//           </p>
//         </div>
//       </div>

//       <div className="sidebar-sections">
//         {courseSectionData.map((section) => (
//           <div className="section-container" key={section._id}>
//             <div
//               className="section-header"
//               onClick={() =>
//                 setActiveStatus((prev) => (prev === section._id ? "" : section._id))
//               }
//             >
//               <div className="section-title">{section?.sectionName}</div>
//               <span
//                 className={`arrow-icon ${activeStatus === section._id ? "open" : "closed"}`}
//               >
//                 <BsChevronDown />
//               </span>
//             </div>

//             {activeStatus === section._id && (
//               <div className="subsection-container">
//                 {section.subSection.map((sub) => (
//                   <div
//                     key={sub._id}
//                     className={`subsection-item ${videoBarActive === sub._id ? "active" : ""}`}
//                   >
//                     <input
//                       type="checkbox"
//                       checked={completedLectures.includes(sub._id)}
//                       onClick={(e) => e.stopPropagation()}
//                       onChange={async (e) => {
//                         e.stopPropagation();

//                         // Optimistically update Redux
//                         dispatch(markLectureAsComplete(sub._id));

//                         // Persist to backend
//                         const data = { courseId: courseEntireData._id, subsectionId: sub._id };
//                         const success = await apiConnector(
//                           "POST", 
//                           "/api/course/mark-lecture-complete", 
//                           data, 
//                           { headers: { Authorization: `Bearer ${token}` } }
//                         );


//                         // Optional: revert Redux if backend fails
//                         if (!success) {
//                           dispatch(markLectureAsComplete(sub._id)); // toggle back
//                         }
//                       }}
//                     />

//                     <span
//                       className="subsection-title"
//                       onClick={() => {
//                         navigate(
//                           `/view-course/${courseEntireData._id}/section/${section._id}/sub-section/${sub._id}`
//                         );
//                         setVideoBarActive(sub._id);
//                       }}
//                     >
//                       {sub.title}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }








// import { useEffect, useState } from "react";
// import { BsChevronDown } from "react-icons/bs";
// import { IoIosArrowBack } from "react-icons/io";
// import { useSelector, useDispatch } from "react-redux";
// import { useLocation, useNavigate, useParams } from "react-router-dom";

// import IconBtn from "../../common/IconBtn";
// import "./VideoDetailsSidebar.css";

// import { setCompletedLectures } from "../../../slices/viewCourseSlice";
// import { apiConnector } from "../../../services/apiconnector";

// export default function VideoDetailsSidebar({ setReviewModal }) {
//   const [activeStatus, setActiveStatus] = useState("");
//   const [videoBarActive, setVideoBarActive] = useState("");

//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const { sectionId, subSectionId } = useParams();

//   const {
//     courseSectionData = [],
//     courseEntireData = {},
//     totalNoOfLectures = 0,
//     completedLectures = [],
//   } = useSelector((state) => state.viewCourse);

//   const { token } = useSelector((state) => state.auth);

//   // Set active section & subsection
//   useEffect(() => {
//     if (!courseSectionData.length) return;

//     const currentSectionIndex = courseSectionData.findIndex(
//       (section) => section._id === sectionId
//     );

//     const currentSubSectionIndex =
//       courseSectionData[currentSectionIndex]?.subSection?.findIndex(
//         (sub) => sub._id === subSectionId
//       );

//     const activeSubSectionId =
//       courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;

//     setActiveStatus(courseSectionData[currentSectionIndex]?._id);
//     setVideoBarActive(activeSubSectionId);
//   }, [courseSectionData, sectionId, subSectionId, location.pathname]);

//   // Fetch completed lectures from backend
//   useEffect(() => {
//     const fetchCompletedLectures = async () => {
//       if (!courseEntireData._id || !token) return;

//       try {
//         const response = await apiConnector(
//           "GET",
//           `/course/${courseEntireData._id}/progress`,
//           null,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         if (response?.data?.completedVideos) {
//           const normalized = response.data.completedVideos.map((id) => String(id));
//           dispatch(setCompletedLectures(normalized));
//         }
//       } catch (error) {
//         console.error("Failed to fetch completed lectures:", error);
//       }
//     };

//     fetchCompletedLectures();
//   }, [courseEntireData._id, dispatch, token]);

//   // Handle marking lecture as complete
//   // inside component
// const handleCheckboxChange = async (subId) => {
//   if (!token || !courseEntireData._id) return;

//   // snapshot for rollback
//   // const prevCompleted = Array.isArray(completedLectures) ? [...completedLectures] : [];
//   const prevCompleted = Array.isArray(completedLectures)
//   ? completedLectures.map((id) => String(id))
//   : [];

//   const wasCompleted = prevCompleted.includes(subId);

//   // single optimistic update (optional)
//   // const optimistic = wasCompleted ? prevCompleted.filter(id => id !== subId) : [...prevCompleted, subId];
//   // dispatch(setCompletedLectures(optimistic));
//   const optimistic = wasCompleted
//     ? prevCompleted.filter((id) => id !== String(subId))
//     : [...prevCompleted, String(subId)];
//   dispatch(setCompletedLectures(optimistic));


//   try {
//     // ← correct endpoint name here:
//     const data = { courseId: courseEntireData._id, subsectionId: subId };
//     const response = await apiConnector(
//       "POST",
//       `/course/updateCourseProgress`,   // <- CORRECT PATH
//       data,
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     if (response?.data?.completedVideos) {
//       const normalized = response.data.completedVideos.map((id) => String(id));
//       dispatch(setCompletedLectures(normalized));
//     } else {
//       dispatch(setCompletedLectures(prevCompleted)); // prevCompleted should already be strings
//     }

//   } catch (error) {
//     // revert optimistic update on error
//     dispatch(setCompletedLectures(prevCompleted));
//     console.error("Failed to mark lecture as complete:", error);
//   }
// };


//   return (
//     <div className="sidebar-wrapper">
//       <div className="sidebar-header">
//         <div className="sidebar-header-top">
//           <div
//             onClick={() => navigate("/dashboard/enrolled-courses")}
//             className="back-button"
//             title="Back"
//           >
//             <IoIosArrowBack size={24} />
//           </div>
//           <IconBtn
//             text="Add Review"
//             customClasses="ml-auto"
//             onClick={() => setReviewModal(true)}
//           />
//         </div>

//         <div className="sidebar-course-info">
//           <p className="course-name">{courseEntireData?.courseName}</p>
//           <p className="progress">
//             {completedLectures?.length} / {totalNoOfLectures}
//           </p>
//         </div>
//       </div>

//       <div className="sidebar-sections">
//         {courseSectionData.map((section) => (
//           <div className="section-container" key={section._id}>
//             <div
//               className="section-header"
//               onClick={() =>
//                 setActiveStatus((prev) => (prev === section._id ? "" : section._id))
//               }
//             >
//               <div className="section-title">{section?.sectionName}</div>
//               <span
//                 className={`arrow-icon ${activeStatus === section._id ? "open" : "closed"}`}
//               >
//                 <BsChevronDown />
//               </span>
//             </div>

//             {activeStatus === section._id && (
//               <div className="subsection-container">
//                 {section.subSection.map((sub) => (
//                   <div
//                     key={sub._id}
//                     className={`subsection-item ${videoBarActive === sub._id ? "active" : ""}`}
//                   >
//                     {/* <input
//                       type="checkbox"
//                       checked={completedLectures.includes(sub._id)}
//                       onClick={(e) => e.stopPropagation()}
//                       onChange={() => handleCheckboxChange(sub._id)}
//                     /> */}
//                     <input
//                       type="checkbox"
//                       checked={completedLectures.map(String).includes(String(sub._id))}
//                       onClick={(e) => e.stopPropagation()}
//                       onChange={() => handleCheckboxChange(sub._id)}
//                     />



//                     <span
//                       className="subsection-title"
//                       onClick={() => {
//                         navigate(
//                           `/view-course/${courseEntireData._id}/section/${section._id}/sub-section/${sub._id}`
//                         );
//                         setVideoBarActive(sub._id);
//                       }}
//                     >
//                       {sub.title}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import IconBtn from "../../common/IconBtn";
import "./VideoDetailsSidebar.css";

import { setCompletedLectures } from "../../../slices/viewCourseSlice";
import { apiConnector } from "../../../services/apiconnector";

export default function VideoDetailsSidebar({ setReviewModal }) {
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { sectionId, subSectionId } = useParams();

  const {
    courseSectionData = [],
    courseEntireData = {},
    totalNoOfLectures = 0,
    completedLectures = {},   // ✅ now object
  } = useSelector((state) => state.viewCourse);

  const { token } = useSelector((state) => state.auth);

  // lectures for current course
  const currentCompleted = completedLectures[courseEntireData._id] || [];

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
  const handleCheckboxChange = async (subId) => {
    if (!token || !courseEntireData._id) return;

    const prevCompleted = [...currentCompleted];
    const wasCompleted = prevCompleted.includes(String(subId));

    const optimistic = wasCompleted
      ? prevCompleted.filter((id) => id !== String(subId))
      : [...prevCompleted, String(subId)];

    dispatch(
      setCompletedLectures({
        courseId: courseEntireData._id,
        lectures: optimistic,
      })
    );

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
        dispatch(
          setCompletedLectures({
            courseId: courseEntireData._id,
            lectures: normalized,
          })
        );
      } else {
        // rollback
        dispatch(
          setCompletedLectures({
            courseId: courseEntireData._id,
            lectures: prevCompleted,
          })
        );
      }
    } catch (error) {
      // rollback
      dispatch(
        setCompletedLectures({
          courseId: courseEntireData._id,
          lectures: prevCompleted,
        })
      );
      console.error("Failed to mark lecture as complete:", error);
    }
  };

  return (
    <div className="sidebar-wrapper">
      <div className="sidebar-header">
        <div className="sidebar-header-top">
          <div
            onClick={() => navigate("/dashboard/enrolled-courses")}
            className="back-button"
            title="Back"
          >
            <IoIosArrowBack size={24} />
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
            {currentCompleted.length} / {totalNoOfLectures}
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
                {section.subSection.map((sub) => (
                  <div
                    key={sub._id}
                    className={`subsection-item ${videoBarActive === sub._id ? "active" : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={currentCompleted.includes(String(sub._id))}
                      onClick={(e) => e.stopPropagation()}
                      onChange={() => handleCheckboxChange(sub._id)}
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
  );
}
