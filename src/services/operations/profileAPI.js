import { toast } from "react-hot-toast"

import { setLoading, setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { profileEndpoints } from "../apis"
import { logout } from "./authAPI"

const { GET_USER_DETAILS_API, GET_USER_ENROLLED_COURSES_API, GET_INSTRUCTOR_DATA_API } = profileEndpoints

export function getUserDetails(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
        Authorization: `Bearer ${token}`,
      })
      console.log("GET_USER_DETAILS API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      const userImage = response.data.data.image
        ? response.data.data.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
      dispatch(setUser({ ...response.data.data, image: userImage }))
    } catch (error) {
      dispatch(logout(navigate))
      console.log("GET_USER_DETAILS API ERROR............", error)
      toast.error("Could Not Get User Details")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}

// export async function getUserEnrolledCourses(token) {
//   const toastId = toast.loading("Loading...")
//   let result = []
//   try {
//     console.log("BEFORE Calling BACKEND API FOR ENROLLED COURSES");
//     const response = await apiConnector(
//       "GET",
//       GET_USER_ENROLLED_COURSES_API,
//       null,
//       {
//         Authorization: `Bearer ${token}`,
//       }
//     )
//     console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES",response);
//     // console.log(
//     //   "GET_USER_ENROLLED_COURSES_API API RESPONSE............",
//     //   response
//     // )

//     if (!response.data.success) {
//       throw new Error(response.data.message)
//     }
//     result = response.data.data
//     console.log("result for user enrolled courses ",result);
//   } catch (error) {
//     console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
//     toast.error("Could Not Get Enrolled Courses")
//   }
//   toast.dismiss(toastId)
//   return result
// }

export async function getUserEnrolledCourses(token) {
  const toastId = toast.loading("Loading...");
  let result = [];

  try {
    console.log("BEFORE Calling BACKEND API FOR ENROLLED COURSES");
    console.log("token (length):", token ? token.length : "NO TOKEN");

    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES - raw response:", response);

    // Defensive: if response is missing or not shaped like you expect, log and bail
    if (!response) {
      throw new Error("No response from API");
    }

    // Useful debug: log the important parts
    console.log("response.status:", response.status);
    console.log("response.data (top-level):", response.data);

    // If backend returns an error code (401/403) handle it explicitly
    if (response.status === 401 || response.status === 403) {
      throw new Error("Unauthorized - check token");
    }

    // Check that response.data exists and has the 'success' flag
    if (!response.data || response.data.success !== true) {
      // log the payload so you can inspect shape
      console.error("GET_USER_ENROLLED_COURSES_API unexpected payload:", response.data);
      throw new Error(response.data?.message || "API returned unsuccessful response");
    }

    // Now store the actual payload — make sure you match the backend shape
    // Many APIs return data under response.data.data, but confirm with the log above
    result = response.data.data;
    console.log("result for user enrolled courses:", result);
  } catch (error) {
    // Provide more informative console output for debugging
    console.error("GET_USER_ENROLLED_COURSES_API API ERROR............", error);
    toast.error("Could Not Get Enrolled Courses");
  } finally {
    toast.dismiss(toastId);
  }

  return result;
}


export async function getInstructorData(token) {
  const toastId = toast.loading("Loading...");
  let result = [];
  try{
    const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, 
    {
      Authorization: `Bearer ${token}`,
    })

    console.log("GET_INSTRUCTOR_API_RESPONSE", response);
    result = response?.data?.courses

  }
  catch(error) {
    console.log("GET_INSTRUCTOR_API ERROR", error);
    toast.error("Could not Get Instructor Data")
  }
  toast.dismiss(toastId);
  return result;
}