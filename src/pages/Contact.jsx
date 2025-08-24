// import React from "react";
// import Footer from "../components/common/Footer";
// import ReviewSlider from "../components/common/ReviewSlider";

// import "./Contact.css";

// const Contact = () => {
//   return (
//     <div className="contact-page">
//       <main className="contact-main">
//         {/* Left: contact details */}
//         <aside className="contact-left" aria-label="Contact details">
//           <div className="contact-card contact-card--dark">
//             <div className="card-row">
//               <div className="card-icon" aria-hidden>
//                 {/* chat icon */}
//                 <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
//                   <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="#dbe2eb"/>
//                 </svg>
//               </div>
//               <div className="card-content">
//                 <h3>Chat on us</h3>
//                 <p className="muted">Our friendly team is here to help.</p>
//                 <p className="muted strong">info@DSAverse.com</p>
//               </div>
//             </div>
//           </div>

//           <div className="contact-card contact-card--dark">
//             <div className="card-row">
//               <div className="card-icon" aria-hidden>
//                 {/* globe icon */}
//                 <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
//                   <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" fill="#cfe0ef" />
//                 </svg>
//               </div>
//               <div className="card-content">
//                 <h3>Visit us</h3>
//                 <p className="muted">Come and say hello at our office HQ.</p>
//                 <p className="muted strong">
//                   Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="contact-card contact-card--dark">
//             <div className="card-row">
//               <div className="card-icon" aria-hidden>
//                 {/* phone icon */}
//                 <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
//                   <path d="M21 16.5v3a1.5 1.5 0 0 1-1.7 1.49C12.5 20.5 3.5 11.5 3.01 4.7A1.5 1.5 0 0 1 4.5 3h3a1.5 1.5 0 0 1 1.5 1.2c.1.8.4 1.6.9 2.3l-.7.7a1 1 0 0 0-.2 1.1l1.8 3a1 1 0 0 0 1.1.4l2.1-.7c.8.5 1.6.8 2.5.9A1.5 1.5 0 0 1 20.8 16h.2z" fill="#dbe2eb"/>
//                 </svg>
//               </div>
//               <div className="card-content">
//                 <h3>Call us</h3>
//                 <p className="muted">Mon - Fri From 8am to 5pm</p>
//                 <p className="muted strong">+91 6366 000 666</p>
//               </div>
//             </div>
//           </div>
//         </aside>

//         {/* Right: contact form */}
//         <section className="contact-right" aria-label="Contact form">
//           <div className="form-card">
//             <h1 className="form-title">Got a Idea? We've got the skills. Let's team up</h1>
//             <p className="form-sub">Tell us more about yourself and what you're got in mind.</p>

//             <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
//               <div className="form-row">
//                 <div className="form-group">
//                   <label htmlFor="firstName">First Name</label>
//                   <input id="firstName" name="firstName" placeholder="Enter first name" />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="lastName">Last Name</label>
//                   <input id="lastName" name="lastName" placeholder="Enter last name" />
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label htmlFor="email">Email Address</label>
//                 <input id="email" name="email" placeholder="Enter email address" />
//               </div>

//               <div className="form-row phone-row">
//                 <div className="form-group phone-select">
//                   <label htmlFor="country">Country</label>
//                   <select id="country" name="country" defaultValue="+91">
//                     <option value="+91">+91</option>
//                     <option value="+93">+93</option>
//                     <option value="+1">+1</option>
//                   </select>
//                 </div>

//                 <div className="form-group phone-input">
//                   <label htmlFor="phone">Phone Number</label>
//                   <input id="phone" name="phone" placeholder="12345 67890" />
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label htmlFor="message">Message</label>
//                 <textarea id="message" name="message" rows="5" placeholder="Tell us about your project or question"></textarea>
//               </div>

//               <div className="form-actions">
//                 <button type="submit" className="btn-primary">Send Message</button>
//                 <button type="button" className="btn-ghost">Call Us</button>
//               </div>
//             </form>
//           </div>
//         </section>
//       </main>

//       {/* Reviews and footer (kept as-is) */}
//       <section className="reviews-section">
//         <h2 className="reviews-heading">Reviews from other learners</h2>
//         <ReviewSlider />
//       </section>

//       <Footer />
//     </div>
//   );
// };

// export default Contact;


// src/pages/Contact.jsx
import React from "react";
import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";
import ContactUsForm from "../components/ContactPage/ContactUsForm"; // ensure this path matches your project
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-page">
      <main className="contact-main">
        {/* Left: contact details */}
        <aside className="contact-left" aria-label="Contact details">
          <div className="contact-card contact-card--dark">
            <div className="card-row">
              <div className="card-icon" aria-hidden>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="#dbe2eb"/>
                </svg>
              </div>
              <div className="card-content">
                <h3>Chat on us</h3>
                <p className="muted">Our friendly team is here to help.</p>
                <p className="muted strong">info@DSAverse.com</p>
              </div>
            </div>
          </div>

          <div className="contact-card contact-card--dark">
            <div className="card-row">
              <div className="card-icon" aria-hidden>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" fill="#cfe0ef" />
                </svg>
              </div>
              <div className="card-content">
                <h3>Visit us</h3>
                <p className="muted">Come and say hello at our office HQ.</p>
                <p className="muted strong">
                  Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016
                </p>
              </div>
            </div>
          </div>

          <div className="contact-card contact-card--dark">
            <div className="card-row">
              <div className="card-icon" aria-hidden>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M21 16.5v3a1.5 1.5 0 0 1-1.7 1.49C12.5 20.5 3.5 11.5 3.01 4.7A1.5 1.5 0 0 1 4.5 3h3a1.5 1.5 0 0 1 1.5 1.2c.1.8.4 1.6.9 2.3l-.7.7a1 1 0 0 0-.2 1.1l1.8 3a1 1 0 0 0 1.1.4l2.1-.7c.8.5 1.6.8 2.5.9A1.5 1.5 0 0 1 20.8 16h.2z" fill="#dbe2eb"/>
                </svg>
              </div>
              <div className="card-content">
                <h3>Call us</h3>
                <p className="muted">Mon - Fri From 8am to 5pm</p>
                <p className="muted strong">+91 6366 000 666</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Right: use the dedicated ContactUsForm component (handles validation + API) */}
        <section className="contact-right" aria-label="Contact form">
          <div className="form-card">
            <h1 className="form-title">Got a Idea? We've got the skills. Let's team up</h1>
            <p className="form-sub">Tell us more about yourself and what you're got in mind.</p>

            {/* Use the working ContactUsForm component */}
            <ContactUsForm />
          </div>
        </section>
      </main>

      {/* Reviews and footer (kept as-is) */}
      <section className="reviews-section">
        <h2 className="reviews-heading">Reviews from other learners</h2>
        <ReviewSlider />
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
