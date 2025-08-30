import { toast } from "react-hot-toast"

import { updateCompletedLectures } from "../../slices/viewCourseSlice"
// import { setLoading } from "../../slices/profileSlice";
import { apiConnector } from "../apiconnector"
import { courseEndpoints } from "../apis"

const {
  COURSE_DETAILS_API,
  COURSE_CATEGORIES_API,
  GET_ALL_COURSE_API,
  CREATE_COURSE_API,
  EDIT_COURSE_API,
  CREATE_SECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SECTION_API,
  UPDATE_SUBSECTION_API,
  DELETE_SECTION_API,
  DELETE_SUBSECTION_API,
  GET_ALL_INSTRUCTOR_COURSES_API,
  DELETE_COURSE_API,
  GET_FULL_COURSE_DETAILS_AUTHENTICATED,
  GET_COURSE_DETAILS_NOT_AUTHENTICATED,
  CREATE_RATING_API,
  LECTURE_COMPLETION_API,
} = courseEndpoints

export const getAllCourses = async () => {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    
    const response = await apiConnector("GET", GET_ALL_COURSE_API)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Course Categories")
    }
    result = response?.data?.data
  } catch (error) {
    console.log("GET_ALL_COURSE_API API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const fetchCourseDetails = async (courseId) => {
  const toastId = toast.loading("Loading...");
  let result = null;

  try {
    const response = await apiConnector("POST", COURSE_DETAILS_API, {
      courseId,
    });

    console.log("COURSE_DETAILS_API RESPONSE:", response);

    if (response?.data?.success && response?.data?.courseDetails) {
      result = response.data;
    } else {
      throw new Error(response?.data?.message || "Invalid response");
    }
  } catch (error) {
    console.log("COURSE_DETAILS_API ERROR:", error);
    toast.error(
      error?.response?.data?.message || "Could not fetch course details"
    );
    result = {
      success: false,
      message: error?.response?.data?.message || error.message,
      courseDetails: null,
    };
  }

  toast.dismiss(toastId);
  return result;
};


// fetching the available course categories
export const fetchCourseCategories = async () => {
  let result = []
  try {
    const response = await apiConnector("GET", COURSE_CATEGORIES_API)
    console.log("COURSE_CATEGORIES_API API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Course Categories")
    }
    result = response?.data?.data  // debug change 

  } catch (error) {
    console.log("COURSE_CATEGORY_API API ERROR............", error)
    toast.error(error.message)
  }
  return result
}


export const addCourseDetails = async (data, token = localStorage.getItem("token")) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CREATE_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE COURSE API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Add Course Details")
    }
    toast.success("Course Details Added Successfully")
    result = response?.data?.data
  } catch (error) {
    console.log("CREATE COURSE API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}


// edit the course details
export const editCourseDetails = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", EDIT_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
    console.log("EDIT COURSE API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Course Details")
    }
    toast.success("Course Details Updated Successfully")
    result = response?.data?.data
  } catch (error) {
    console.log("EDIT COURSE API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// create a section
export const createSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CREATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Create Section")
    }
    toast.success("Course Section Created")
    result = response?.data?.data // debug change 
  } catch (error) {
    console.log("CREATE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// create a subsection
export const createSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");

  try {
    const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        // DO NOT set Content-Type here; Axios will handle it for FormData
      },
    });

    console.log("CREATE SUB-SECTION API RESPONSE............", response);

    if (!response?.data?.success) {
      throw new Error("Could Not Add Lecture");
    }

    toast.success("Lecture Added");
    result = response?.data?.data;

  } catch (error) {
    console.log("CREATE SUB-SECTION API ERROR............", error);
    toast.error(error?.response?.data?.message || error.message);
  }

  toast.dismiss(toastId);
  return result;
};


// update a section
export const updateSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("UPDATE SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Section")
    }
    toast.success("Course Section Updated")
    result = response?.data?.data
  } catch (error) {
    console.log("UPDATE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// update a subsection
export const updateSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("UPDATE SUB-SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Lecture")
    }
    toast.success("Lecture Updated")
    result = response?.data?.data
  } catch (error) {
    console.log("UPDATE SUB-SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// delete a section
export const deleteSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", DELETE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("DELETE SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Section")
    }
    toast.success("Course Section Deleted")
    result = response?.data?.data
  } catch (error) {
    console.log("DELETE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}
// delete a subsection
export const deleteSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("DELETE SUB-SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Lecture")
    }
    toast.success("Lecture Deleted")
    result = response?.data?.data
  } catch (error) {
    console.log("DELETE SUB-SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// fetching all courses under a specific instructor
// export const fetchInstructorCourses = async (token) => {
//   let result = []
//   const toastId = toast.loading("Loading...")
//   try {
//     const response = await apiConnector(
//       "GET",
//       GET_ALL_INSTRUCTOR_COURSES_API,
//       null,
//       {
//         Authorization: `Bearer ${token}`,
//       }
//     )
//     console.log("INSTRUCTOR COURSES API RESPONSE............", response)
//     if (!response?.data?.success) {
//       throw new Error("Could Not Fetch Instructor Courses")
//     }
//     result = response?.data?.data
//   } catch (error) {
//     console.log("INSTRUCTOR COURSES API ERROR............", error)
//     toast.error(error.message)
//   }
//   toast.dismiss(toastId)
//   return result
// }

export const fetchInstructorCourses = async (token) => {
  let result = []
  const toastId = toast.loading("Loading...")

  try {
    console.log("fetchInstructorCourses token:", token, "type:", typeof token)
    if (!token) {
      throw new Error("No auth token provided. Please login.")
    }

    const response = await apiConnector(
      "GET",
      GET_ALL_INSTRUCTOR_COURSES_API,
      null,
      { Authorization: `Bearer ${token}` }
    )

    console.log("INSTRUCTOR COURSES API RESPONSE", response?.status, response?.data)

    if (response?.status === 401) {
      throw new Error("Unauthorized — token invalid/expired or you lack instructor permissions.")
    }
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could Not Fetch Instructor Courses")
    }

    result = response?.data?.data || []
  } catch (error) {
    console.error("INSTRUCTOR COURSES API ERROR............", error)
    const msg = error.response?.data?.message || error.message || "Unknown error"
    toast.error(msg)
  } finally {
    toast.dismiss(toastId)
  }

  return result
}




export const deleteCourse = async (courseId, token) => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector(
      "DELETE",
      `${DELETE_COURSE_API}/${courseId}`,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Course");
    }
    toast.success("Course Deleted");
  } catch (error) {
    console.error("DELETE COURSE API ERROR:", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
};


// get full details of a course



// export const getFullDetailsOfCourse = async (courseId, token = null) => {
//   // Build URL (your endpoint may expect POST or GET; adjust accordingly)
//   const url = `${courseEndpoints.GET_FULL_COURSE_DETAILS_AUTHENTICATED}?courseId=${courseId}`;

//   // Only set Authorization header when we actually have a usable token
//   const headers = {};
//   const hasToken = token && typeof token === "string" && token.trim() !== "" && token !== "null";

//   if (hasToken) {
//     headers["Authorization"] = `Bearer ${token}`;
//   }

//   // For GET, pass null body and headers
//   return apiConnector("GET", url, null, headers);
// };

// export const getFullDetailsOfCourse = async (courseId, token = null) => {
//   // detect usable token
//   const hasToken =
//     token && typeof token === "string" && token.trim() !== "" && token !== "null";

//   if (hasToken) {
//     // Logged-in user: call authenticated GET endpoint with Authorization header
//     const endpointAuth = courseEndpoints.GET_FULL_COURSE_DETAILS_AUTHENTICATED;
//     const url = `${endpointAuth}?courseId=${courseId}`;
//     const headers = { Authorization: `Bearer ${token}` };
//     return apiConnector("GET", url, null, headers);
//   } else {
//     // Guest: call public POST endpoint (router.post("/getCourseDetails", ...))
//     const endpointPublic = courseEndpoints.GET_COURSE_DETAILS_NOT_AUTHENTICATED;
//     const url = endpointPublic;
//     const body = { courseId };
//     // No Authorization header for public request
//     return apiConnector("POST", url, body, {});
//   }
// };

// export const getFullDetailsOfCourse = async (courseId, token = null) => {
//   if (!courseId) throw new Error("courseId is required in getFullDetailsOfCourse");

//   const hasToken =
//     token && typeof token === "string" && token.trim() !== "" && token !== "null";

//   // defensive: ensure endpoints exist (gives clearer error if names are wrong)
//   const endpointAuth = courseEndpoints?.GET_FULL_COURSE_DETAILS_AUTHENTICATED;
//   const endpointPublic = courseEndpoints?.GET_COURSE_DETAILS_NOT_AUTHENTICATED;

//   if (hasToken) {
//     if (!endpointAuth) {
//       throw new Error("Authenticated endpoint not configured: courseEndpoints.GET_FULL_COURSE_DETAILS_AUTHENTICATED is missing");
//     }
//     const url = `${endpointAuth}?courseId=${courseId}`;
//     const headers = { Authorization: `Bearer ${token}` };
//     console.log("[getFullDetailsOfCourse] calling AUTH GET:", url);
//     return apiConnector("GET", url, null, headers);
//   } else {
//     if (!endpointPublic) {
//       throw new Error("Public endpoint not configured: courseEndpoints.GET_COURSE_DETAILS_NOT_AUTHENTICATED is missing");
//     }
//     const url = endpointPublic;
//     const body = { courseId };
//     console.log("[getFullDetailsOfCourse] calling PUBLIC POST:", url, body);
//     return apiConnector("POST", url, body, {});
//   }
// };

// export const getFullDetailsOfCourse = async (courseId, token = null) => {
//   if (!courseId) {
//     throw new Error("getFullDetailsOfCourse: courseId is required");
//   }

//   const hasToken = token && typeof token === "string" && token.trim() !== "" && token !== "null";

//   const endpointAuth = courseEndpoints?.GET_FULL_COURSE_DETAILS_AUTHENTICATED;
//   const endpointPublic = courseEndpoints?.GET_COURSE_DETAILS_NOT_AUTHENTICATED;

//   if (hasToken) {
//     if (!endpointAuth) {
//       throw new Error("courseEndpoints.GET_FULL_COURSE_DETAILS_AUTHENTICATED is not configured");
//     }
//     const url = `${endpointAuth}?courseId=${courseId}`;
//     console.info("[getFullDetailsOfCourse] AUTH GET ->", url);
//     return apiConnector("GET", url, null, { Authorization: `Bearer ${token}` });
//   } else {
//     if (!endpointPublic) {
//       throw new Error("courseEndpoints.GET_COURSE_DETAILS_NOT_AUTHENTICATED is not configured");
//     }
//     console.info("[getFullDetailsOfCourse] PUBLIC POST ->", endpointPublic, { courseId });
//     return apiConnector("POST", endpointPublic, { courseId }, {});
//   }
// };


export const getFullDetailsOfCourse = async (courseId, token = null) => {
  if (!courseId) {
    throw new Error("getFullDetailsOfCourse: courseId is required");
  }

  const hasToken = token && typeof token === "string" && token.trim() !== "" && token !== "null";
  const endpointAuth = courseEndpoints?.GET_FULL_COURSE_DETAILS_AUTHENTICATED;
  const endpointPublic = courseEndpoints?.GET_COURSE_DETAILS_NOT_AUTHENTICATED;

  // Helpful debug log (will show in browser console)
  console.info("[getFullDetailsOfCourse] called", { courseId, hasToken, endpointAuth, endpointPublic });

  try {
    if (hasToken) {
      if (!endpointAuth) throw new Error("Missing endpoint: GET_FULL_COURSE_DETAILS_AUTHENTICATED");
      const url = `${endpointAuth}?courseId=${courseId}`;
      console.info("[getFullDetailsOfCourse] -> AUTH GET", url);
      return await apiConnector("GET", url, null, { Authorization: `Bearer ${token}` });
    } else {
      if (!endpointPublic) throw new Error("Missing endpoint: GET_COURSE_DETAILS_NOT_AUTHENTICATED");
      console.info("[getFullDetailsOfCourse] -> PUBLIC POST", endpointPublic);
      // call the public POST which your backend exposes for unauthenticated users
      try {
        return await apiConnector("POST", endpointPublic, { courseId }, {});
      } catch (err) {
        // If the public POST fails (some environments may not have it),
        // try GET without auth as a last resort and log the reason.
        console.warn("[getFullDetailsOfCourse] public POST failed; attempting GET without auth", err?.message || err);
        if (!endpointAuth) throw err;
        const url = `${endpointAuth}?courseId=${courseId}`;
        return await apiConnector("GET", url, null, {}); // no Authorization header
      }
    }
  } catch (e) {
    console.error("[getFullDetailsOfCourse] final error:", e);
    throw e;
  }
};


// services/operations/courseDetailsAPI.js (or wherever it lives)
export const markLectureAsComplete = async (data, token) => {
  let result = false;
  console.log("mark complete data", data);
  const toastId = toast.loading("Loading...");

  try {
    const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("MARK_LECTURE_AS_COMPLETE_API API RESPONSE............", response);

    // Success path from server
    if (response?.data?.message) {
      toast.success(response.data.message || "Lecture Completed");
      result = true;
    } else {
      // If server returned 2xx but no message, still treat as success (optional)
      toast.success("Lecture Completed");
      result = true;
    }
  } catch (error) {
    console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error);

    // If backend responds 400 with "Subsection already completed", treat as success
    const status = error?.response?.status;
    const serverMsg = error?.response?.data?.message || error?.response?.data?.error || "";

    if (status === 400 && String(serverMsg).toLowerCase().includes("already completed")) {
      console.warn("Marked already completed on server — treating as success.");
      toast.success("Lecture already completed");
      result = true;
    } else {
      // Log more backend info to help debugging
      if (error?.response) {
        console.error("Status:", error.response.status, "Data:", error.response.data);
      } else {
        console.error(error);
      }
      toast.error(error.message || "Failed to mark lecture complete");
      result = false;
    }
  } finally {
    toast.dismiss(toastId);
  }

  return result;
};


export const createRating = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let success = false;

  try {
    // Standard Axios-style config: headers must be under `headers`
    const response = await apiConnector("POST", CREATE_RATING_API, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("CREATE RATING API RESPONSE............", response);

    // backend convention: success boolean
    if (response?.data?.success) {
      toast.success(response.data.message || "Rating Created");
      success = true;
    } else {
      // Backend returned 2xx but did not mark success
      console.warn("createRating - unexpected response shape:", response?.data);
      toast.error(response?.data?.message || "Could not create rating");
      success = false;
    }
  } catch (error) {
    // Log full error for debugging
    console.error("CREATE RATING API ERROR............", error);
    if (error?.response) {
      console.error("Status:", error.response.status, "Data:", error.response.data);
    }

    // Show a friendly message (prefer backend message if present)
    const serverMsg = error?.response?.data?.message || error?.response?.data?.error;
    toast.error(serverMsg || error.message || "Failed to create rating");
    success = false;
  } finally {
    toast.dismiss(toastId);
  }

  return success;
};