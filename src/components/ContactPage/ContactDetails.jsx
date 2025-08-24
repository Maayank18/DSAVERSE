import React from "react";
import * as Icon1 from "react-icons/bi";
import * as Icon3 from "react-icons/hi2";
import * as Icon2 from "react-icons/io5";
import "./ContactDetails.css";

const contactDetails = [
  {
    icon: "HiChatBubbleLeftRight",
    heading: "Chat on us",
    description: "Our friendly team is here to help.",
    details: "info@DSAverse.com",
  },
  {
    icon: "BiWorld",
    heading: "Visit us",
    description: "Come and say hello at our office HQ.",
    details:
      "Where curisoity meets learning, DSAverse-560016",
  },
  {
    icon: "IoCall",
    heading: "Call us",
    description: "Mon - Fri From 8am to 5pm",
    details: "+123 456 7869",
  },
];

const ContactDetails = () => {
  return (
    <div className="contact-container">
      {contactDetails.map((ele, i) => {
        let Icon = Icon1[ele.icon] || Icon2[ele.icon] || Icon3[ele.icon];
        return (
          <div className="contact-card" key={i}>
            <div className="contact-header">
              <Icon size={25} />
              <h1 className="contact-title">{ele?.heading}</h1>
            </div>
            <p className="contact-description">{ele?.description}</p>
            <p className="contact-details">{ele?.details}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ContactDetails;
