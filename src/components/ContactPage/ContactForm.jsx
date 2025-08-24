// import React from "react";
// import ContactUsForm from "./ContactUsForm";
// import "./ContactForm.css";

// const ContactForm = () => {
//   return (
//     <div className="contactform-container">
//       <h1 className="contactform-heading">
//         Got a Idea? We&apos;ve got the skills. Let&apos;s team up
//       </h1>
//       <p className="contactform-subtext">
//         Tell us more about yourself and what you&apos;re got in mind.
//       </p>

//       <div className="contactform-form">
//         <ContactUsForm />
//       </div>
//     </div>
//   );
// };

// export default ContactForm;

// ContactForm.jsx
import React from "react";
import ContactUsForm from "./ContactUsForm";
import "./ContactForm.css";

const ContactForm = () => {
  return (
    <div className="contactform-container">
      <h1 className="contactform-heading">
        Got a Idea? We&apos;ve got the skills. Let&apos;s team up
      </h1>
      <p className="contactform-subtext">
        Tell us more about yourself and what you&apos;re got in mind.
      </p>

      <div className="contactform-form">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactForm;
