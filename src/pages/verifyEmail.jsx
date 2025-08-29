// import { useEffect, useRef, useState } from "react";
// import OtpInput from "react-otp-input";
// import { Link, useNavigate } from "react-router-dom";
// import { BiArrowBack } from "react-icons/bi";
// import { RxCountdownTimer } from "react-icons/rx";
// import { useDispatch, useSelector } from "react-redux";
// import { sendOtp, signUp } from "../services/operations/authAPI";
// import "./verifyEmail.css";

// function VerifyEmail() {
//   const [otp, setOtp] = useState("");
//   const [sending, setSending] = useState(false);
//   const [resendCooldown, setResendCooldown] = useState(0);
//   const { signupData, loading } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const otpSentOnce = useRef(false); // ✅ Prevent multiple OTP calls

//   // Redirect if signupData is missing
//   useEffect(() => {
//     if (!signupData?.email) {
//       navigate("/signup");
//     }
//   }, [signupData, navigate]);

//   // Send OTP on first mount (guarded)
//   useEffect(() => {
//     if (!signupData?.email || otpSentOnce.current) return;

//     otpSentOnce.current = true;

//     const sendInitialOtp = async () => {
//       try {
//         setSending(true);
//         // await dispatch(sendOtp(signupData.email, navigate, true, false)).unwrap(); // showToast = false
//         dispatch(sendOtp(signupData.email, navigate, true, false));
//         setResendCooldown(30); // Start cooldown after initial send
//       } catch (err) {
//         console.error("Initial OTP send failed:", err);
//       } finally {
//         setSending(false);
//       }
//     };

//     // Avoid React 18 double fire
//     const timer = setTimeout(() => {
//       sendInitialOtp();
//     }, 0);

//     return () => clearTimeout(timer);
//   }, [signupData, dispatch, navigate]);

//   // Cooldown timer
//   useEffect(() => {
//     let interval;
//     if (resendCooldown > 0) {
//       interval = setInterval(() => {
//         setResendCooldown((prev) => prev - 1);
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//   }, [resendCooldown]);

//   const handleVerifyAndSignup = (e) => {
//     e.preventDefault();
//     const { accountType, firstName, lastName, email, password, confirmPassword } = signupData;
//     dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate));
//   };

//   const handleResend = async () => {
//     if (!signupData?.email || sending || resendCooldown > 0) return;

//     try {
//       setSending(true);
//       await dispatch(sendOtp(signupData.email, navigate, true, true)).unwrap(); // showToast = true
//       setResendCooldown(30);
//     } catch (err) {
//       console.error("Resend OTP failed:", err);
//     } finally {
//       setSending(false);
//     }
//   };

//   return (
//     <div className="verify-wrapper">
//       {loading ? (
//         <div className="spinner" />
//       ) : (
//         <div className="verify-card">
//           <h1 className="verify-title">Verify Email</h1>
//           <p className="verify-description">
//             A verification code has been sent to <b>{signupData?.email}</b>. Enter it below:
//           </p>

//           <form onSubmit={handleVerifyAndSignup} className="verify-form">
//             <OtpInput
//               value={otp}
//               onChange={setOtp}
//               numInputs={6}
//               isInputNum
//               shouldAutoFocus
//               renderInput={(props) => (
//                 <input {...props} placeholder="-" className="otp-input" />
//               )}
//               containerStyle={{ justifyContent: "space-between", gap: "0 6px" }}
//             />
//             <button type="submit" className="verify-button" disabled={otp.length < 6}>
//               Verify Email
//             </button>
//           </form>

//           <div className="verify-footer">
//             <Link to="/signup">
//               <p className="verify-back">
//                 <BiArrowBack /> Back To Signup
//               </p>
//             </Link>
//             <button
//               className="verify-resend"
//               onClick={handleResend}
//               disabled={sending || resendCooldown > 0}
//             >
//               <RxCountdownTimer />
//               {sending
//                 ? "Sending..."
//                 : resendCooldown > 0
//                 ? `Resend in ${resendCooldown}s`
//                 : "Resend OTP"}
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default VerifyEmail;

import { useEffect, useRef, useState } from "react";
import OtpInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, signUp } from "../services/operations/authAPI";
import "./verifyEmail.css";

function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const [sending, setSending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const { signupData, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const otpSentOnce = useRef(false); // ✅ Prevent multiple OTP calls in same mount

  // Redirect if signupData is missing
  useEffect(() => {
    if (!signupData?.email) {
      navigate("/signup");
    }
  }, [signupData, navigate]);

  // Send OTP on first mount (guarded)
  useEffect(() => {
    if (!signupData?.email || otpSentOnce.current) return;

    otpSentOnce.current = true;

    // normalized key to avoid casing/space issues
    const emailKey = String(signupData.email).trim().toLowerCase();
    const storageKey = `otpSent_${emailKey}`;

    // If sessionStorage already says we've sent an OTP for this email, don't send again
    if (sessionStorage.getItem(storageKey)) {
      return;
    }

    const sendInitialOtp = async () => {
      try {
        setSending(true);
        // mark as pending so Strict Mode remounts won't send again
        sessionStorage.setItem(storageKey, "pending");

        // Await the thunk (no .unwrap() since this is a plain thunk)
        await dispatch(sendOtp(signupData.email, navigate, true, false));

        // only start cooldown after successful send
        setResendCooldown(30);

        // Optionally mark success (timestamp) — helps debugging
        sessionStorage.setItem(storageKey, String(Date.now()));
      } catch (err) {
        console.error("Initial OTP send failed:", err);
        // allow retry by removing the session flag on failure
        sessionStorage.removeItem(storageKey);
      } finally {
        setSending(false);
      }
    };

    // Avoid React 18 double fire timing issues
    const timer = setTimeout(() => {
      sendInitialOtp();
    }, 0);

    return () => clearTimeout(timer);
  }, [signupData, dispatch, navigate]);

  // Cooldown timer
  useEffect(() => {
    let interval;
    if (resendCooldown > 0) {
      interval = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendCooldown]);

  const handleVerifyAndSignup = (e) => {
    e.preventDefault();
    const { accountType, firstName, lastName, email, password, confirmPassword } = signupData;
    dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate));
  };

  const handleResend = async () => {
    if (!signupData?.email || sending || resendCooldown > 0) return;

    // normalized key for resend guard — optional but keeps parity with initial send
    const emailKey = String(signupData.email).trim().toLowerCase();
    const storageKey = `otpSent_${emailKey}`;

    try {
      setSending(true);
      // mark pending so multiple clicks don't create duplicates
      sessionStorage.setItem(storageKey, "pending");

      // Await the thunk (no .unwrap())
      await dispatch(sendOtp(signupData.email, navigate, true, true));

      // success => start cooldown and record timestamp
      setResendCooldown(30);
      sessionStorage.setItem(storageKey, String(Date.now()));
    } catch (err) {
      console.error("Resend OTP failed:", err);
      // remove flag so user can try again
      sessionStorage.removeItem(storageKey);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="verify-wrapper">
      {loading ? (
        <div className="spinner" />
      ) : (
        <div className="verify-card">
          <h1 className="verify-title">Verify Email</h1>
          <p className="verify-description">
            A verification code has been sent to <b>{signupData?.email}</b>. Enter it below:
          </p>

          <form onSubmit={handleVerifyAndSignup} className="verify-form">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              isInputNum
              shouldAutoFocus
              renderInput={(props) => (
                <input {...props} placeholder="-" className="otp-input" />
              )}
              containerStyle={{ justifyContent: "space-between", gap: "0 6px" }}
            />
            <button type="submit" className="verify-button" disabled={otp.length < 6}>
              Verify Email
            </button>
          </form>

          <div className="verify-footer">
            <Link to="/signup">
              <p className="verify-back">
                <BiArrowBack /> Back To Signup
              </p>
            </Link>
            <button
              className="verify-resend"
              onClick={handleResend}
              disabled={sending || resendCooldown > 0}
            >
              <RxCountdownTimer />
              {sending
                ? "Sending..."
                : resendCooldown > 0
                ? `Resend in ${resendCooldown}s`
                : "Resend OTP"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerifyEmail;
