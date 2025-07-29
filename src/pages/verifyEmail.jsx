import { useEffect, useState } from "react";
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
  const { signupData, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!signupData?.email) {
      navigate("/signup");
    }
  }, [signupData, navigate]);

  useEffect(() => {
    const fireOtp = async () => {
      if (!signupData?.email) return;
      try {
        setSending(true);
        await dispatch(sendOtp(signupData.email, navigate,false)).unwrap();
      } catch (err) {
        console.error("sendOtp failed:", err);
      } finally {
        setSending(false);
      }
    };
    fireOtp();
  }, [signupData, dispatch, navigate]);

  const handleVerifyAndSignup = (e) => {
    e.preventDefault();
    const { accountType, firstName, lastName, email, password, confirmPassword } =
      signupData;

    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };

  const handleResend = async () => {
    if (!signupData?.email || sending) return;
    try {
      setSending(true);
      console.log("signupData.email", signupData.email);
      await dispatch(sendOtp(signupData.email, navigate,false)).unwrap();
    } catch (err) {
      console.error("resendOtp failed:", err);
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
            A verification code has been sent to <b>{signupData?.email}</b>. Enter
            it below:
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
              disabled={sending}
            >
              <RxCountdownTimer />
              {sending ? "Sending..." : "Resend OTP"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerifyEmail;
