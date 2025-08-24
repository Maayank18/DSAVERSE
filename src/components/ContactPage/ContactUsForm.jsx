// ContactUsForm.jsx
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import CountryCode from "../../data/countrycode.json";
import { apiConnector } from "../../services/apiconnector";
import { contactusEndpoint } from "../../services/apis";
import "./ContactUsForm.css";

const ContactUsForm = () => {
  const navigate = useNavigate();
  const defaultCountry = CountryCode?.[0]?.code || "";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      countrycode: defaultCountry,
      firstname: "",
      lastname: "",
      email: "",
      phoneNo: "",
      message: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const submitContactForm = async (data) => {
    console.log("FORM SUBMIT - data:", data);
    try {
      setLoading(true);

      const res = await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        data
      );

      // handle response according to your apiConnector shape
      const payload = res?.data ?? res;
      if (payload?.success) {
        toast.success(payload.message || "Message sent successfully!");
        // reset form (keep default country)
        reset({
          firstname: "",
          lastname: "",
          email: "",
          phoneNo: "",
          countrycode: defaultCountry,
          message: "",
        });
        // navigate after short delay so toast is visible
        setTimeout(() => navigate("/"), 1000);
      } else {
        // backend may return success:false or error structure
        toast.error(payload?.message || "Failed to send message");
      }
    } catch (error) {
      console.error("CONTACT US ERROR -", error);
      toast.error(error?.message || "Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
        countrycode: defaultCountry,
      });
    }
  }, [reset, isSubmitSuccessful, defaultCountry]);

  return (
    <form className="contact-form" onSubmit={handleSubmit(submitContactForm)} noValidate>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="firstname" className="label-style">First Name</label>
          <input
            id="firstname"
            className="form-style"
            placeholder="Enter first name"
            {...register("firstname", { required: "Please enter your first name." })}
          />
          {errors.firstname && <span className="error-text">{errors.firstname.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="lastname" className="label-style">Last Name</label>
          <input
            id="lastname"
            className="form-style"
            placeholder="Enter last name"
            {...register("lastname")}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="email" className="label-style">Email Address</label>
        <input
          id="email"
          type="email"
          className="form-style"
          placeholder="Enter email address"
          {...register("email", {
            required: "Please enter your Email address.",
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email." },
          })}
        />
        {errors.email && <span className="error-text">{errors.email.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="phoneNo" className="label-style">Phone Number</label>
        <div className="phone-row">
          <div className="country-select">
            <select id="countrycode" className="form-style" {...register("countrycode", { required: true })}>
              {CountryCode.map((ele, i) => (
                <option key={i} value={ele.code}>
                  {ele.code} - {ele.country}
                </option>
              ))}
            </select>
          </div>

          <div className="phone-input">
            <input
              id="phoneNo"
              type="tel"
              inputMode="numeric"
              className="form-style"
              placeholder="12345 67890"
              {...register("phoneNo", {
                required: "Please enter your Phone Number.",
                minLength: { value: 10, message: "Invalid Phone Number" },
                maxLength: { value: 12, message: "Invalid Phone Number" },
                pattern: { value: /^[0-9]+$/, message: "Only digits allowed." },
              })}
            />
          </div>
        </div>
        {errors.phoneNo && <span className="error-text">{errors.phoneNo.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="message" className="label-style">Message</label>
        <textarea
          id="message"
          rows={6}
          className="form-style"
          placeholder="Enter your message here"
          {...register("message", { required: "Please enter your message." })}
        />
        {errors.message && <span className="error-text">{errors.message.message}</span>}
      </div>

      <button
        disabled={loading}
        type="submit"
        className="submit-button"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
};

export default ContactUsForm;
