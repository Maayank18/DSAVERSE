import React from "react";
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";
import "./CourseCard.css";

const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
  const isActive = currentCard === cardData?.heading;

  return (
    <div
      className={`course-card ${isActive ? "active" : ""}`}
      onClick={() => setCurrentCard(cardData?.heading)}
    >
      {/* Top Content */}
      <div className="card-top">
        <div className={`card-heading ${isActive ? "active-heading" : ""}`}>
          {cardData?.heading}
        </div>
        <div className="card-description">{cardData?.description}</div>
      </div>

      {/* Bottom Content */}
      <div className={`card-bottom ${isActive ? "active-bottom" : ""}`}>
        <div className="card-info">
          <HiUsers />
          <p>{cardData?.level}</p>
        </div>
        <div className="card-info">
          <ImTree />
          <p>{cardData?.lessionNumber} Lession</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
