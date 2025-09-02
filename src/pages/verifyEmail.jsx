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

  const otpSentOnce = useRef(false); // ✅ Prevent multiple OTP calls

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

    const sendInitialOtp = async () => {
      try {
        setSending(true);
        // await dispatch(sendOtp(signupData.email, navigate, true, false)).unwrap(); // showToast = false
        dispatch(sendOtp(signupData.email, navigate, true, false));
        setResendCooldown(30); // Start cooldown after initial send
      } catch (err) {
        console.error("Initial OTP send failed:", err);
      } finally {
        setSending(false);
      }
    };

    // Avoid React 18 double fire
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

    try {
      setSending(true);
      await dispatch(sendOtp(signupData.email, navigate, true, true)).unwrap(); // showToast = true
      setResendCooldown(30);
    } catch (err) {
      console.error("Resend OTP failed:", err);
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
            {/* <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              isInputNum
              shouldAutoFocus
              renderInput={(props) => (
                <input {...props} placeholder="-" className="otp-input" />
              )}
              containerStyle={{ justifyContent: "space-between", gap: "0 6px" }}
            /> */}
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              shouldAutoFocus
              renderInput={(props) => (
                <input
                  {...props}
                  type="tel"          // ✅ iOS-friendly
                  inputMode="numeric" // ✅ shows numeric keyboard
                  pattern="[0-9]*"    // ✅ restricts to digits
                  placeholder="-"
                  className="otp-input"
                />
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
