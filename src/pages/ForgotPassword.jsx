import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getPasswordResetToken } from '../services/operations/authAPI';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
  }

  return (
    <div className='forgot-container'>
      {
        loading ? (
          <div className='loading'>Loading...</div>
        ) : (
          <div className='forgot-card'>
            <h1 className='forgot-title'>
              { !emailSent ? "Reset your password" : "Check your email" }
            </h1>
            <p className='forgot-description'>
              {
                !emailSent
                  ? "Have no fear. We will email you instructions to reset your password. If you don’t have access to your email, we can try account recovery."
                  : `We have sent the reset request to ${email}`
              }
            </p>
            <form onSubmit={handleOnSubmit} className='forgot-form'>
              {
                !emailSent && (
                  <label className='forgot-label'>
                    <p>Email Address*</p>
                    <input
                      type="email"
                      required
                      name='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder='Enter Your Email Address'
                      className='forgot-input'
                    />
                  </label>
                )
              }

              <button type='submit' className='forgot-button'>
                { !emailSent ? "Reset Password" : "Resend Email" }
              </button>
            </form>

            <div className='forgot-link'>
              <Link to='/login'>
                <p>Back To Login</p>
              </Link>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default ForgotPassword;
