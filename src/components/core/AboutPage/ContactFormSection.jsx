import React from "react";
import ContactUsForm from "../../ContactPage/ContactUsForm";
import "./ContactFormSection.css";

const ContactFormSection = () => {
  return (
    <div className="contact-section-container">
      <h1 className="contact-title">Get in Touch</h1>
      <p className="contact-subtitle">
        We&apos;d love to hear from you, Please fill out this form.
      </p>
      <div className="contact-form-wrapper">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactFormSection;
