import { toast } from "react-hot-toast"

import { setLoading, setToken } from "../../slices/authSlice"
import { resetCart } from "../../slices/cartSlice"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { endpoints } from "../apis"

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints

// export function sendOtp(email, navigate) {
//   return async (dispatch) => {
//     const toastId = toast.loading("Loading...")
//     dispatch(setLoading(true))
//     try {
//       const response = await apiConnector("POST", SENDOTP_API, {
//         email,
//         checkUserPresent: true,
//       })
//       console.log("SENDOTP API RESPONSE............", response)

//       console.log(response.data.success)

//       if (!response.data.success) {
//         throw new Error(response.data.message)
//       }

//       toast.success("OTP Sent Successfully")
//       navigate("/verify-email")
//     } catch (error) {
//       console.log("SENDOTP API ERROR............", error)
//       toast.error("Could Not Send OTP")
//     }
//     dispatch(setLoading(false))
//     toast.dismiss(toastId)
//   }
// }

// export function sendOtp(email, navigate, checkUserPresent = true) { // ✅ added checkUserPresent as parameter
//   return async (dispatch) => {
//     const toastId = toast.loading("Loading...")
//     dispatch(setLoading(true))
//     try {
//       const response = await apiConnector("POST", SENDOTP_API, {
//         email,
//         checkUserPresent, // ✅ now it will take true/false based on caller
//       })
//       console.log("SENDOTP API RESPONSE............", response)

//       console.log(response.data.success)

//       if (!response.data.success) {
//         throw new Error(response.data.message)
//       }

//       toast.success("OTP Sent Successfully")
//       navigate("/verify-email")
//     } catch (error) {
//       console.log("SENDOTP API ERROR............", error);
//       console.log("Error message:", error.message);
//       console.log("Error response:", error.response);
//       console.log("Error response data:", error.response?.data);
//       toast.error("Could Not Send OTP")
//     }
//     dispatch(setLoading(false))
//     toast.dismiss(toastId)
//   }
// }
export function sendOtp(email, navigate, checkUserPresent = true, showToast = true) {
  return async (dispatch) => {
    const toastId = showToast ? toast.loading("Loading...") : null;
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent,
      });

      console.log("SENDOTP API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      if (showToast) toast.success("OTP Sent Successfully");
      navigate("/verify-email");
    } catch (error) {
      console.log("SENDOTP API ERROR............", error);
      if (showToast) toast.error("Could Not Send OTP");
    } finally {
      dispatch(setLoading(false));
      if (showToast && toastId) toast.dismiss(toastId);
    }
  };
}




export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      })

      console.log("SIGNUP API RESPONSE............", response)

      if (!response.data.success) {
        console.log(response.data)
        throw new Error(response.data.message)
      }
      toast.success("Signup Successful")
      navigate("/login")
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      console.log("SIGNUP API ERROR............", error.message)
      toast.error("Signup Failed")
      navigate("/signup")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}






export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      })

      console.log("LOGIN API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Login Successful")
      dispatch(setToken(response.data.token))
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
      dispatch(setUser({ ...response.data.user, image: userImage }))
      
      localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user", JSON.stringify(response.data.user))
      navigate("/dashboard/my-profile")
    } catch (error) {
      console.log("LOGIN API ERROR............", error)
      toast.error("Login Failed")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

// export function logout(navigate) {
//   return (dispatch) => {
//     dispatch(setToken(null))
//     dispatch(setUser(null))
//     dispatch(resetCart())
//     localStorage.removeItem("token")
//     localStorage.removeItem("user")
//     toast.success("Logged Out")
//     navigate("/")
//   }
// }

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));

    // pass silent: true to avoid the cart toast when logging out
    // dispatch(resetCart({ silent: true }));

    // remove only auth-related localStorage keys (don't call localStorage.clear())
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // single toast for logout
    toast.success("Logged Out");

    navigate("/");
  };
}

export function getPasswordResetToken(email , setEmailSent) {
  return async(dispatch) => {
    dispatch(setLoading(true));
    try{
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {email})

      console.log("RESET PASSWORD TOKEN RESPONSE....", response);

      if(!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Reset Email Sent");
      setEmailSent(true);
    }
    catch(error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Failed to send email for resetting password");
    }
    dispatch(setLoading(false));
  }
}

export function resetPassword(password, confirmPassword, token) {
  return async(dispatch) => {
    dispatch(setLoading(true));
    try{
      const response = await apiConnector("POST", RESETPASSWORD_API, {password, confirmPassword, token});

      console.log("RESET Password RESPONSE ... ", response);


      if(!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password has been reset successfully");
    }
    catch(error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Unable to reset password");
    }
    dispatch(setLoading(false));
  }
}