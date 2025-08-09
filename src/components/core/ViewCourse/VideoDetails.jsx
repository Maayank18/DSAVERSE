// import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams, useLocation } from "react-router-dom";

// import ReactPlayer from "react-player";

// import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
// import { updateCompletedLectures } from "../../../slices/viewCourseSlice";
// import IconBtn from "../../common/IconBtn";

// import "./VideoDetails.css";

// const VideoDetails = () => {
//   const { courseId, sectionId, subSectionId } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const playerRef = useRef(null);
//   const dispatch = useDispatch();
//   const { token } = useSelector((state) => state.auth);
//   const { courseSectionData, courseEntireData, completedLectures } = useSelector((state) => state.viewCourse);

//   const [videoData, setVideoData] = useState([]);
//   const [previewSource, setPreviewSource] = useState("");
//   const [videoEnded, setVideoEnded] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [isPlayerReady, setIsPlayerReady] = useState(false); // NEW

//   useEffect(() => {
//     (async () => {
//       if (!courseSectionData.length) return;
//       if (!courseId || !sectionId || !subSectionId) {
//         navigate(`/dashboard/enrolled-courses`);
//       } else {
//         const filteredData = courseSectionData.find((course) => course._id === sectionId);
//         const filteredVideoData = filteredData?.subSection?.find((data) => data._id === subSectionId);
//         console.log("videoData from API:", filteredVideoData);

//         if (filteredVideoData) {
//           setVideoData(filteredVideoData);
//           setPreviewSource(courseEntireData.thumbnail);
//         } else {
//           setVideoData([]);
//           setPreviewSource(courseEntireData.thumbnail);
//         }

//         setVideoEnded(false);
//         setIsPlayerReady(false); // Reset player state on route change
//       }
//     })();
//   }, [courseSectionData, courseEntireData, location.pathname]);



//   useEffect(() => {
//     // Add short delay before enabling autoplay to prevent DOM removal issues
//     const timer = setTimeout(() => setIsPlayerReady(true), 200); // Adjust delay if needed
//     return () => clearTimeout(timer);
//   }, [videoData]);

//   const isFirstVideo = () => {
//     const currentSectionIndx = courseSectionData.findIndex((data) => data._id === sectionId);
//     if (currentSectionIndx === -1) return false;
//     const currentSubSectionIndx = courseSectionData[currentSectionIndx]?.subSection?.findIndex((data) => data._id === subSectionId);
//     return currentSectionIndx === 0 && currentSubSectionIndx === 0;
//   };

//   const isLastVideo = () => {
//     const currentSectionIndx = courseSectionData.findIndex((data) => data._id === sectionId);
//     if (currentSectionIndx === -1) return false;

//     const currentSubSection = courseSectionData[currentSectionIndx]?.subSection;
//     const noOfSubsections = currentSubSection?.length || 0;
//     const currentSubSectionIndx = currentSubSection?.findIndex((data) => data._id === subSectionId);

//     return (
//       currentSectionIndx === courseSectionData.length - 1 &&
//       currentSubSectionIndx === noOfSubsections - 1
//     );
//   };

//   const goToNextVideo = () => {
//     const currentSectionIndx = courseSectionData.findIndex((data) => data._id === sectionId);
//     if (currentSectionIndx === -1) return;

//     const currentSubSection = courseSectionData[currentSectionIndx]?.subSection;
//     const currentSubSectionIndx = currentSubSection?.findIndex((data) => data._id === subSectionId);
//     const noOfSubsections = currentSubSection?.length || 0;

//     if (currentSubSectionIndx < noOfSubsections - 1) {
//       const nextSubSectionId = currentSubSection[currentSubSectionIndx + 1]._id;
//       navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`);
//     } else if (courseSectionData[currentSectionIndx + 1]) {
//       const nextSection = courseSectionData[currentSectionIndx + 1];
//       if (nextSection?.subSection?.length > 0) {
//         const nextSubSectionId = nextSection.subSection[0]._id;
//         navigate(`/view-course/${courseId}/section/${nextSection._id}/sub-section/${nextSubSectionId}`);
//       }
//     }
//   };

//   const goToPrevVideo = () => {
//     const currentSectionIndx = courseSectionData.findIndex((data) => data._id === sectionId);
//     if (currentSectionIndx === -1) return;

//     const currentSubSection = courseSectionData[currentSectionIndx]?.subSection;
//     const currentSubSectionIndx = currentSubSection?.findIndex((data) => data._id === subSectionId);

//     if (currentSubSectionIndx > 0) {
//       const prevSubSectionId = currentSubSection[currentSubSectionIndx - 1]._id;
//       navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`);
//     } else if (currentSectionIndx > 0) {
//       const prevSection = courseSectionData[currentSectionIndx - 1];
//       const prevSubSectionLength = prevSection?.subSection?.length || 0;
//       if (prevSubSectionLength > 0) {
//         const prevSubSectionId = prevSection.subSection[prevSubSectionLength - 1]._id;
//         navigate(`/view-course/${courseId}/section/${prevSection._id}/sub-section/${prevSubSectionId}`);
//       }
//     }
//   };

//   const handleLectureCompletion = async () => {
//     setLoading(true);
//     const res = await markLectureAsComplete({ courseId: courseId, subsectionId: subSectionId }, token);
//     if (res) {
//       dispatch(updateCompletedLectures(subSectionId));
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="video-details-container">
//       {!videoData?.videoUrl  ? (
//         <img src={previewSource} alt="Preview" className="video-preview-image" />
//       ) : (
//         <div className="react-player-wrapper">
//           <ReactPlayer
//             ref={playerRef}
//             url={videoData?.videoUrl || null}
//             width="100%"
//             height="100%"
//             // controls
//             // muted={true}
//             // playing={isPlayerReady} // ✅ Now controlled
//             // onEnded={() => setVideoEnded(true)}
//             playing={true}
//             muted={true} // ✅ fixes autoplay restriction
//             controls={true}
//             playsinline // ✅ helps on iOS Safari
//             onReady={() => console.log("Video is ready")}
//             onError={(e) => console.error("Video error", e)}
//           />
//           {videoEnded && (
//             <div className="video-overlay">
//               {!completedLectures.includes(subSectionId) && (
//                 <IconBtn
//                   disabled={loading}
//                   onclick={handleLectureCompletion}
//                   text={!loading ? "Mark As Completed" : "Loading..."}
//                   customClasses="video-button"
//                 />
//               )}
//               <IconBtn
//                 disabled={loading}
//                 onclick={() => {
//                   if (playerRef?.current) {
//                     playerRef.current.seekTo(0, "seconds");
//                     setVideoEnded(false);
//                   }
//                 }}
//                 text="Rewatch"
//                 customClasses="video-button rewatch"
//               />
//               <div className="video-navigation">
//                 {!isFirstVideo() && (
//                   <button disabled={loading} onClick={goToPrevVideo} className="nav-button">
//                     Prev
//                   </button>
//                 )}
//                 {!isLastVideo() && (
//                   <button disabled={loading} onClick={goToNextVideo} className="nav-button">
//                     Next
//                   </button>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//       <h1 className="video-title">{videoData?.title}</h1>
//       <p className="video-description">{videoData?.description}</p>
//     </div>
//   );
// };

// export default VideoDetails;





































// import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import ReactPlayer from "react-player";
// import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
// import { updateCompletedLectures } from "../../../slices/viewCourseSlice";
// import IconBtn from "../../common/IconBtn";
// import "./VideoDetails.css";

// const VideoDetails = () => {
//   const { courseId, sectionId, subSectionId } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const playerRef = useRef(null);
//   const dispatch = useDispatch();

//   const { token } = useSelector((state) => state.auth);
//   const { courseSectionData, courseEntireData, completedLectures } = useSelector(
//     (state) => state.viewCourse
//   );

//   const [videoData, setVideoData] = useState(null);
//   const [previewSource, setPreviewSource] = useState("");
//   const [videoEnded, setVideoEnded] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // ✅ Load video details when route changes
//   useEffect(() => {
//     if (!courseSectionData.length) return;

//     if (!courseId || !sectionId || !subSectionId) {
//       navigate(`/dashboard/enrolled-courses`);
//       return;
//     }

//     const filteredSection = courseSectionData.find((course) => course._id === sectionId);
//     const filteredVideo = filteredSection?.subSection?.find((data) => data._id === subSectionId);

//     console.log("videoData from API:", filteredVideo);
//     console.log("▶️ ReactPlayer URL:", videoData?.videoUrl);


//     if (filteredVideo) {
//       setVideoData(filteredVideo);
//       setPreviewSource(courseEntireData.thumbnail);
//     } else {
//       setVideoData(null);
//       setPreviewSource(courseEntireData.thumbnail);
//     }

//     setVideoEnded(false);
//   }, [courseSectionData, courseEntireData, location.pathname]);

//   // ✅ Build safe video URL
//   // const getSafeUrl = (url) => {
//   //   if (!url) return null;
//   //   return url.startsWith("http") ? url : `${process.env.REACT_APP_BASE_URL}${url}`;
//   // };

//   const isFirstVideo = () => {
//     const sectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);
//     if (sectionIndex === -1) return false;
//     const subIndex = courseSectionData[sectionIndex]?.subSection?.findIndex(
//       (data) => data._id === subSectionId
//     );
//     return sectionIndex === 0 && subIndex === 0;
//   };

//   const isLastVideo = () => {
//     const sectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);
//     if (sectionIndex === -1) return false;

//     const subSections = courseSectionData[sectionIndex]?.subSection;
//     const subIndex = subSections?.findIndex((data) => data._id === subSectionId);

//     return (
//       sectionIndex === courseSectionData.length - 1 &&
//       subIndex === subSections.length - 1
//     );
//   };

//   const goToNextVideo = () => {
//     const sectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);
//     if (sectionIndex === -1) return;

//     const subSections = courseSectionData[sectionIndex]?.subSection;
//     const subIndex = subSections?.findIndex((data) => data._id === subSectionId);

//     if (subIndex < subSections.length - 1) {
//       navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${subSections[subIndex + 1]._id}`);
//     } else if (courseSectionData[sectionIndex + 1]) {
//       const nextSection = courseSectionData[sectionIndex + 1];
//       if (nextSection?.subSection?.length > 0) {
//         navigate(`/view-course/${courseId}/section/${nextSection._id}/sub-section/${nextSection.subSection[0]._id}`);
//       }
//     }
//   };

//   const goToPrevVideo = () => {
//     const sectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);
//     if (sectionIndex === -1) return;

//     const subSections = courseSectionData[sectionIndex]?.subSection;
//     const subIndex = subSections?.findIndex((data) => data._id === subSectionId);

//     if (subIndex > 0) {
//       navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${subSections[subIndex - 1]._id}`);
//     } else if (sectionIndex > 0) {
//       const prevSection = courseSectionData[sectionIndex - 1];
//       const prevSubLen = prevSection?.subSection?.length || 0;
//       if (prevSubLen > 0) {
//         navigate(`/view-course/${courseId}/section/${prevSection._id}/sub-section/${prevSection.subSection[prevSubLen - 1]._id}`);
//       }
//     }
//   };

//   const handleLectureCompletion = async () => {
//     setLoading(true);
//     const res = await markLectureAsComplete({ courseId, subsectionId: subSectionId }, token);
//     if (res) {
//       dispatch(updateCompletedLectures(subSectionId));
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="video-details-container">
//       {!videoData?.videoUrl ? (
//         <img src={previewSource} alt="Preview" className="video-preview-image" />
        
//       ) : (
        
//         <div className="react-player-wrapper">
          
//           <ReactPlayer
//             ref={playerRef}
//             url={videoData.videoUrl}
//             width="100%"
//             height="100%"
//             playing={true} // ✅ user must click play
//             muted={true}
//             controls
//             playsInLine={true}
//            config={{
//                 file: { attributes: { preload: "auto", crossOrigin: "anonymous" } } }}
//             onReady={() => console.log("✅ Video ready")}
//             onEnded={() => setVideoEnded(true)}
//             onError={(e) => console.error("❌ Video error", e)}
//           />

//           {videoEnded && (
//             <div className="video-overlay">
//               {!completedLectures.includes(subSectionId) && (
//                 <IconBtn
//                   disabled={loading}
//                   onclick={handleLectureCompletion}
//                   text={!loading ? "Mark As Completed" : "Loading..."}
//                   customClasses="video-button"
//                 />
//               )}
//               <IconBtn
//                 disabled={loading}
//                 onclick={() => {
//                   playerRef.current.seekTo(0, "seconds");
//                   setVideoEnded(false);
//                 }}
//                 text="Rewatch"
//                 customClasses="video-button rewatch"
//               />
//               <div className="video-navigation">
//                 {!isFirstVideo() && (
//                   <button disabled={loading} onClick={goToPrevVideo} className="nav-button">
//                     Prev
//                   </button>
//                 )}
//                 {!isLastVideo() && (
//                   <button disabled={loading} onClick={goToNextVideo} className="nav-button">
//                     Next
//                   </button>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       <h1 className="video-title">{videoData?.title}</h1>
//       <p className="video-description">{videoData?.description}</p>
//     </div>
//   );
// };

// export default VideoDetails;


















import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
// import ReactPlayer removed earlier if using <video>
import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";
import IconBtn from "../../common/IconBtn";
import "./VideoDetails.css";

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const playerRef = useRef(null);
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  const courseSectionData = useSelector((state) => state.viewCourse.courseSectionData) ?? [];
  const courseEntireData = useSelector((state) => state.viewCourse.courseEntireData) ?? {};
  const completedLectures = useSelector((state) => state.viewCourse.completedLectures) ?? [];

  const [videoData, setVideoData] = useState(null);
  const [previewSource, setPreviewSource] = useState("");
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  const getSafeUrl = (url) => {
    if (!url) return null;
    return url.startsWith("http") ? url : `${process.env.REACT_APP_BASE_URL}${url}`;
  };

  useEffect(() => {
    if (!courseSectionData.length) return;

    if (!courseId || !sectionId || !subSectionId) {
      navigate(`/dashboard/enrolled-courses`);
      return;
    }

    const filteredSection = courseSectionData.find((course) => course._id === sectionId);
    const filteredVideo = filteredSection?.subSection?.find((data) => data._id === subSectionId);

    if (filteredVideo) {
      setVideoData(filteredVideo);
      setPreviewSource(courseEntireData.thumbnail);
    } else {
      setVideoData(null);
      setPreviewSource(courseEntireData.thumbnail);
    }

    setVideoEnded(false);
  }, [courseSectionData, courseEntireData, location.pathname, courseId, sectionId, subSectionId, navigate]);

  const isFirstVideo = () => {
    if (!courseSectionData.length) return false;
    const sectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);
    if (sectionIndex === -1) return false;
    const subIndex = courseSectionData[sectionIndex]?.subSection?.findIndex(
      (data) => data._id === subSectionId
    );
    return sectionIndex === 0 && subIndex === 0;
  };

  const isLastVideo = () => {
    if (!courseSectionData.length) return false;
    const sectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);
    if (sectionIndex === -1) return false;

    const subSections = courseSectionData[sectionIndex]?.subSection ?? [];
    const subIndex = subSections.findIndex((data) => data._id === subSectionId);

    return sectionIndex === courseSectionData.length - 1 && subIndex === subSections.length - 1;
  };

  const goToNextVideo = () => {
    const sectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);
    if (sectionIndex === -1) return;

    const subSections = courseSectionData[sectionIndex]?.subSection ?? [];
    const subIndex = subSections.findIndex((data) => data._id === subSectionId);

    if (subIndex < subSections.length - 1) {
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${subSections[subIndex + 1]._id}`);
    } else if (courseSectionData[sectionIndex + 1]) {
      const nextSection = courseSectionData[sectionIndex + 1];
      if (nextSection?.subSection?.length > 0) {
        navigate(`/view-course/${courseId}/section/${nextSection._id}/sub-section/${nextSection.subSection[0]._id}`);
      }
    }
  };

  const goToPrevVideo = () => {
    const sectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);
    if (sectionIndex === -1) return;

    const subSections = courseSectionData[sectionIndex]?.subSection ?? [];
    const subIndex = subSections.findIndex((data) => data._id === subSectionId);

    if (subIndex > 0) {
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${subSections[subIndex - 1]._id}`);
    } else if (sectionIndex > 0) {
      const prevSection = courseSectionData[sectionIndex - 1];
      const prevSubLen = prevSection?.subSection?.length || 0;
      if (prevSubLen > 0) {
        navigate(`/view-course/${courseId}/section/${prevSection._id}/sub-section/${prevSection.subSection[prevSubLen - 1]._id}`);
      }
    }
  };

  const handleLectureCompletion = async () => {
    setLoading(true);
    const res = await markLectureAsComplete({ courseId, subsectionId: subSectionId }, token);
    if (res) {
      dispatch(updateCompletedLectures(subSectionId));
    }
    setLoading(false);
  };

  const handleRewatch = () => {
    const vid = playerRef.current;
    if (!vid) return;
    vid.currentTime = 0;
    const playPromise = vid.play();
    if (playPromise && typeof playPromise.then === "function") {
      playPromise.catch((err) => {
        console.warn("Autoplay prevented:", err);
      });
    }
    setVideoEnded(false);
  };

  return (
    <div className="video-details-container">
      {!videoData?.videoUrl ? (
        <img src={previewSource} alt="Preview" className="video-preview-image" />
      ) : (
        <div className="react-player-wrapper">
          <video
            ref={playerRef}
            src={getSafeUrl(videoData.videoUrl)}
            className="native-video"
            width="100%"
            height="100%"
            controls
            muted={true}
            playsInline
            preload="auto"
            crossOrigin="anonymous"
            onEnded={() => setVideoEnded(true)}
            onError={(e) => console.error("❌ Video error", e)}
          />

          {videoEnded && (
            <div className="video-overlay">
              {!completedLectures.includes(subSectionId) && (
                <IconBtn
                  disabled={loading}
                  onClick={handleLectureCompletion}  
                  text={!loading ? "Mark As Completed" : "Loading..."}
                  customClasses="video-button"
                />
              )}
              <IconBtn
                disabled={loading}
                onClick={handleRewatch}  
                text="Rewatch"
                customClasses="video-button rewatch"
              />
              <div className="video-navigation">
                {!isFirstVideo() && (
                  <button disabled={loading} onClick={goToPrevVideo} className="nav-button">
                    Prev
                  </button>
                )}
                {!isLastVideo() && (
                  <button disabled={loading} onClick={goToNextVideo} className="nav-button">
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <h1 className="video-title">{videoData?.title}</h1>
      <p className="video-description">{videoData?.description}</p>
    </div>
  );
};

export default VideoDetails;
