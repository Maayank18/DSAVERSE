// import React, { useEffect, useState, useCallback } from "react";
// import { BiInfoCircle } from "react-icons/bi";
// import { HiOutlineGlobeAlt } from "react-icons/hi";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { setToken } from "../slices/authSlice";
// import toast from "react-hot-toast";

// import ConfirmationModal from "../components/common/ConfirmationModal";
// import Footer from "../components/common/Footer";
// import RatingStars from "../components/common/RatingStars";
// import CourseAccordionBar from "../components/core/Course/CourseAccordionBar";
// import CourseDetailsCard from "../components/core/Course/CourseDetailsCard";
// import { formatDate } from "../services/formatDate";
// import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI";
// import { buyCourse } from "../services/operations/studentFeaturesAPI";
// import GetAvgRating from "../utils/avgRating";
// import Error from "./Error";

// import { apiConnector } from "../services/apiconnector";
// import { ratingsEndpoints } from "../services/apis";

// import "./CourseDetails.css";

// function CourseDetails() {
//   const { user } = useSelector((state) => state.profile);
//   const { token } = useSelector((state) => state.auth);
//   const rawToken = token && token !== "null" ? token : null;
//   const { loading } = useSelector((state) => state.profile);
//   const { paymentLoading } = useSelector((state) => state.course);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { courseId } = useParams();

//   const [response, setResponse] = useState(null);
//   const [confirmationModal, setConfirmationModal] = useState(null);


// useEffect(() => {
//   if (!courseId) return;

//   const fetch = async () => {
//     try {
//       console.log("Fetching course details for id:", courseId, "tokenPresent:", Boolean(rawToken));
//       const res = await getFullDetailsOfCourse(courseId, rawToken);
//       console.log("getFullDetailsOfCourse raw response:", res);
//       const payload = res?.data ?? res;
//       const data = payload?.data ?? payload;

//       if (data?.courseDetails) {
//         setResponse({
//           success: true,
//           ...data,
//         });
//       } else {
//         setResponse({ success: false, courseDetails: null, message: data?.message || "Not found" });
//       }
//     } catch (error) {
//       console.error("getFullDetailsOfCourse error:", error);
//       // If backend told us token invalid/expired, clear it
//       const status = error?.response?.status;
//       const serverMsg = error?.response?.data?.message || error?.message;
//       if (status === 401) {
//         // toast.error(serverMsg || "Session expired. Please log in again.");
//         // clear client token (dispatch the auth action)
//         dispatch(setToken(null));
//         // optional: navigate("/login");
//       } else {
//         // toast.error(serverMsg || "Could not load course details.");
//       }

//       setResponse({
//         success: false,
//         courseDetails: null,
//         message: serverMsg || "fetch error",
//       });
//     }
//   };

//   fetch();
// }, [courseId, rawToken]); // rawToken instead of token


//   // --- NEW: aggregated rating & review count from the API ---
//   const [avgRating, setAvgRating] = useState(0);
//   const [reviewCount, setReviewCount] = useState(0);

//   const fetchAverageRating = useCallback(
//     async (id) => {
//       if (!id) return;
//       try {
//         const url = `${ratingsEndpoints.GET_AVERAGE_RATING_API}?courseId=${id}`;
//         const res = await apiConnector("GET", url);
//         if (res?.data?.success) {
//           setAvgRating(Number(res.data.averageRating) || 0);
//           setReviewCount(Number(res.data.reviewCount) || 0);
//         } else {
//           const fallbackAvg = GetAvgRating(
//             response?.courseDetails?.ratingAndReviews
//           );
//           setAvgRating(fallbackAvg);
//           setReviewCount(
//             response?.courseDetails?.ratingAndReviews?.length || 0
//           );
//         }
//       } catch (err) {
//         console.error("fetchAverageRating error:", err);
//         const fallbackAvg = GetAvgRating(
//           response?.courseDetails?.ratingAndReviews
//         );
//         setAvgRating(fallbackAvg);
//         setReviewCount(
//           response?.courseDetails?.ratingAndReviews?.length || 0
//         );
//       }
//     },
//     [response]
//   );

//   useEffect(() => {
//     const id = response?.courseDetails?._id;
//     if (id) fetchAverageRating(id);
//   }, [response?.courseDetails?._id, fetchAverageRating]);

//   // --- existing state logic ---
//   const [isActive, setIsActive] = useState([]);
//   const handleActive = (id) => {
//     setIsActive(
//       !isActive.includes(id)
//         ? isActive.concat([id])
//         : isActive.filter((e) => e !== id)
//     );
//   };

//   const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
//   useEffect(() => {
//     let lectures = 0;
//     response?.courseDetails?.courseContent?.forEach((sec) => {
//       lectures += Array.isArray(sec.subSection) ? sec.subSection.length : 0;
//     });
//     setTotalNoOfLectures(lectures);
//   }, [response]);

//   if (loading || !response) {
//     return (
//       <div className="loading-container">
//         <div className="spinner"></div>
//       </div>
//     );
//   }

//   if (!response.success || !response.courseDetails) {
//     return <Error />;
//   }

//   const {
//     _id: course_Id,
//     courseName,
//     courseDescription,
//     thumbnail,
//     price,
//     whatYouWillLearn,
//     courseContent,
//     ratingAndReviews = [],
//     instructor, // keep original
//     studentsEnrolled = [],
//     createdAt,
//   } = response.courseDetails;

//   const handleBuyCourse = () => {
//     if (token) {
//       buyCourse(token, [course_Id], user, navigate, dispatch);
//       return;
//     }
//     setConfirmationModal({
//       text1: "You are not logged in!",
//       text2: "Please login to Purchase Course.",
//       btn1Text: "Login",
//       btn2Text: "Cancel",
//       btn1Handler: () => navigate("/login"),
//       btn2Handler: () => setConfirmationModal(null),
//     });
//   };

//   if (paymentLoading) {
//     return (
//       <div className="loading-container">
//         <div className="spinner"></div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="course-details-wrapper">
//         <div className="course-details-container">
//           <div className="course-details-main">
//             {/* Left Column */}
//             <div className="course-left-column">
//               <div className="course-thumbnail-mobile">
//                 <div className="thumbnail-shadow"></div>
//                 <img
//                   src={thumbnail}
//                   alt="course thumbnail"
//                   className="thumbnail-image"
//                 />
//               </div>
//               <div className="course-meta">
//                 <p className="course-title">{courseName}</p>
//                 <p className="course-description">{courseDescription}</p>
//                 <div className="course-reviews">
//                   <span className="highlight">
//                     {typeof avgRating === "number"
//                       ? avgRating.toFixed(1)
//                       : "0.0"}
//                   </span>
//                   <RatingStars Review_Count={avgRating} Star_Size={24} />
//                   <span>{`(${reviewCount} reviews)`}</span>
//                   <span>{`${studentsEnrolled.length} students enrolled`}</span>
//                 </div>
//                 <p>
//                   Created By{" "}
//                   {instructor?.firstName || instructor?.lastName
//                     ? `${instructor?.firstName ?? ""} ${
//                         instructor?.lastName ?? ""
//                       }`
//                     : "Instructor not available"}
//                 </p>
//                 <div className="course-meta-info">
//                   <p>
//                     <BiInfoCircle /> Created at {formatDate(createdAt)}
//                   </p>
//                   <p>
//                     <HiOutlineGlobeAlt /> English
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Right Column */}
//             <div className="course-card-desktop">
//               <CourseDetailsCard
//                 course={response?.courseDetails}
//                 setConfirmationModal={setConfirmationModal}
//                 handleBuyCourse={handleBuyCourse}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="course-content-wrapper">
//         <div className="course-what-you-learn">
//           <p className="section-title">What you'll learn</p>
//           <div className="section-body">
//             <ReactMarkdown remarkPlugins={[remarkGfm]}>
//               {whatYouWillLearn}
//             </ReactMarkdown>
//           </div>
//         </div>

//         <div className="course-content">
//           <div className="course-content-header">
//             <p className="section-title">Course Content</p>
//             <div className="course-content-summary">
//               <span>{courseContent.length} section(s)</span>
//               <span>{totalNoOfLectures} lecture(s)</span>
//               <span>{response.totalDuration} total length</span>
//             </div>
//             <button className="btn-collapse" onClick={() => setIsActive([])}>
//               Collapse all sections
//             </button>
//           </div>

//           <div className="accordion-section">
//             {courseContent?.map((course, index) => (
//               <div key={index} className="accordion-item">
//                 <CourseAccordionBar
//                   course={course}
//                   isActive={isActive}
//                   handleActive={handleActive}
//                 />
//                 {isActive.includes(course._id) && (
//                   <div className="lecture-list">
//                     {course.subSection?.map((lecture, idx) => (
//                       <div className="lecture-item" key={idx}>
//                         <span>{lecture.title}</span>
//                         <span>{lecture.duration}</span>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           <div className="course-author">
//             <p className="section-title">Author</p>
//             <div className="author-info">
//               <img
//                 src={
//                   instructor?.image
//                     ? instructor.image
//                     : `https://api.dicebear.com/5.x/initials/svg?seed=${
//                         instructor?.firstName ?? "U"
//                       } ${instructor?.lastName ?? ""}`
//                 }
//                 alt="Author"
//                 className="author-avatar"
//               />
//               <p>
//                 {instructor?.firstName || instructor?.lastName
//                   ? `${instructor?.firstName ?? ""} ${
//                       instructor?.lastName ?? ""
//                     }`
//                   : "Unknown Author"}
//               </p>
//             </div>
//             <p className="author-bio">
//               {instructor?.additionalDetails?.about ??
//                 "No information available."}
//             </p>
//           </div>
//         </div>
//       </div>

//       <Footer />
//       {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
//     </>
//   );
// }

// export default CourseDetails;


import React, { useEffect, useState, useCallback } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { setToken } from "../slices/authSlice";
import toast from "react-hot-toast";

import ConfirmationModal from "../components/common/ConfirmationModal";
import Footer from "../components/common/Footer";
import RatingStars from "../components/common/RatingStars";
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar";
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard";
import { formatDate } from "../services/formatDate";
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI";
import { buyCourse } from "../services/operations/studentFeaturesAPI";
import GetAvgRating from "../utils/avgRating";
import Error from "./Error";

import { apiConnector } from "../services/apiconnector";
import { ratingsEndpoints } from "../services/apis";

import "./CourseDetails.css";

function CourseDetails() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const rawToken = token && token !== "null" ? token : null;
  const { loading } = useSelector((state) => state.profile);
  const { paymentLoading } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const location = useLocation();

  // If the catalog passed preview data via Link state, use it to initialize UI quickly
  const preview = location.state?.coursePreview ?? null;

  // Initialize response from preview if available (preview fields typically match courseDetails shape)
  const [response, setResponse] = useState(
    preview
      ? { success: true, courseDetails: preview, totalDuration: preview.totalDuration || "" }
      : null
  );

  const [confirmationModal, setConfirmationModal] = useState(null);

  useEffect(() => {
    if (!courseId) return;

    const fetch = async () => {
      try {
        console.log("Fetching course details for id:", courseId, "tokenPresent:", Boolean(rawToken));
        const res = await getFullDetailsOfCourse(courseId, rawToken);
        console.log("getFullDetailsOfCourse raw response:", res);
        const payload = res?.data ?? res;
        const data = payload?.data ?? payload;

        if (data?.courseDetails) {
          setResponse({
            success: true,
            ...data,
          });
        } else {
          setResponse({ success: false, courseDetails: null, message: data?.message || "Not found" });
        }
      } catch (error) {
        console.error("getFullDetailsOfCourse error:", error);
        // If backend told us token invalid/expired, clear it only if we actually sent a token
        const status = error?.response?.status;
        const serverMsg = error?.response?.data?.message || error?.message;

        const hadToken = !!rawToken;
        if (status === 401 && hadToken) {
          // token was invalid/expired — clear it from client
          dispatch(setToken(null));
        }

        // If 401 but we didn't have a token and preview exists, keep preview (do not treat as error)
        if (status === 401 && !hadToken && preview) {
          setResponse({
            success: true,
            courseDetails: preview,
            totalDuration: preview.totalDuration || "",
            _isPreview: true,
          });
          return;
        }

        setResponse({
          success: false,
          courseDetails: null,
          message: serverMsg || "fetch error",
        });
      }
    };

    fetch();
  }, [courseId, rawToken, preview, dispatch]);

  // --- aggregated rating & review count ---
  const [avgRating, setAvgRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  const fetchAverageRating = useCallback(
    async (id) => {
      if (!id) return;
      try {
        const url = `${ratingsEndpoints.GET_AVERAGE_RATING_API}?courseId=${id}`;
        const res = await apiConnector("GET", url);
        if (res?.data?.success) {
          setAvgRating(Number(res.data.averageRating) || 0);
          setReviewCount(Number(res.data.reviewCount) || 0);
        } else {
          const fallbackAvg = GetAvgRating(response?.courseDetails?.ratingAndReviews);
          setAvgRating(fallbackAvg);
          setReviewCount(response?.courseDetails?.ratingAndReviews?.length || 0);
        }
      } catch (err) {
        console.error("fetchAverageRating error:", err);
        const fallbackAvg = GetAvgRating(response?.courseDetails?.ratingAndReviews);
        setAvgRating(fallbackAvg);
        setReviewCount(response?.courseDetails?.ratingAndReviews?.length || 0);
      }
    },
    [response]
  );

  useEffect(() => {
    const id = response?.courseDetails?._id;
    if (id) fetchAverageRating(id);
  }, [response?.courseDetails?._id, fetchAverageRating]);

  // --- existing state logic ---
  const [isActive, setIsActive] = useState([]);
  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat([id])
        : isActive.filter((e) => e !== id)
    );
  };

  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
  useEffect(() => {
    let lectures = 0;
    response?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += Array.isArray(sec.subSection) ? sec.subSection.length : 0;
    });
    setTotalNoOfLectures(lectures);
  }, [response]);

  // show spinner only while response is null (preview will avoid spinner)
  if (!response) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!response.success || !response.courseDetails) {
    return <Error />;
  }

  const {
    _id: course_Id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews = [],
    instructor,
    studentsEnrolled = [],
    createdAt,
  } = response.courseDetails;

  const handleBuyCourse = () => {
    if (token) {
      buyCourse(token, [course_Id], user, navigate, dispatch);
      return;
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  if (paymentLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      <div className="course-details-wrapper">
        <div className="course-details-container">
          <div className="course-details-main">
            {/* Left Column */}
            <div className="course-left-column">
              <div className="course-thumbnail-mobile">
                <div className="thumbnail-shadow"></div>
                <img
                  src={thumbnail}
                  alt="course thumbnail"
                  className="thumbnail-image"
                />
              </div>
              <div className="course-meta">
                <p className="course-title">{courseName}</p>
                <p className="course-description">{courseDescription}</p>
                <div className="course-reviews">
                  <span className="highlight">
                    {typeof avgRating === "number" ? avgRating.toFixed(1) : "0.0"}
                  </span>
                  <RatingStars Review_Count={avgRating} Star_Size={24} />
                  <span>{`(${reviewCount} reviews)`}</span>
                  <span>{`${studentsEnrolled.length} students enrolled`}</span>
                </div>
                <p>
                  Created By{" "}
                  {instructor?.firstName || instructor?.lastName
                    ? `${instructor?.firstName ?? ""} ${instructor?.lastName ?? ""}`
                    : "Instructor not available"}
                </p>
                <div className="course-meta-info">
                  <p>
                    <BiInfoCircle /> Created at {formatDate(createdAt)}
                  </p>
                  <p>
                    <HiOutlineGlobeAlt /> English
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="course-card-desktop">
              <CourseDetailsCard
                course={response?.courseDetails}
                setConfirmationModal={setConfirmationModal}
                handleBuyCourse={handleBuyCourse}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="course-content-wrapper">
        <div className="course-what-you-learn">
          <p className="section-title">What you'll learn</p>
          <div className="section-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {whatYouWillLearn}
            </ReactMarkdown>
          </div>
        </div>

        <div className="course-content">
          <div className="course-content-header">
            <p className="section-title">Course Content</p>
            <div className="course-content-summary">
              <span>{courseContent.length} section(s)</span>
              <span>{totalNoOfLectures} lecture(s)</span>
              <span>{response.totalDuration} total length</span>
            </div>
            <button className="btn-collapse" onClick={() => setIsActive([])}>
              Collapse all sections
            </button>
          </div>

          <div className="accordion-section">
            {courseContent?.map((course, index) => (
              <div key={index} className="accordion-item">
                <CourseAccordionBar
                  course={course}
                  isActive={isActive}
                  handleActive={handleActive}
                />
                {isActive.includes(course._id) && (
                  <div className="lecture-list">
                    {course.subSection?.map((lecture, idx) => (
                      <div className="lecture-item" key={idx}>
                        <span>{lecture.title}</span>
                        <span>{lecture.duration}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="course-author">
            <p className="section-title">Author</p>
            <div className="author-info">
              <img
                src={
                  instructor?.image
                    ? instructor.image
                    : `https://api.dicebear.com/5.x/initials/svg?seed=${
                        instructor?.firstName ?? "U"
                      } ${instructor?.lastName ?? ""}`
                }
                alt="Author"
                className="author-avatar"
              />
              <p>
                {instructor?.firstName || instructor?.lastName
                  ? `${instructor?.firstName ?? ""} ${instructor?.lastName ?? ""}`
                  : "Unknown Author"}
              </p>
            </div>
            <p className="author-bio">
              {instructor?.additionalDetails?.about ?? "No information available."}
            </p>
          </div>
        </div>
      </div>

      <Footer />
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}

export default CourseDetails;
