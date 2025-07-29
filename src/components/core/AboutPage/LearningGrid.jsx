import React from "react";
import HighlightText from "../../../components/core/HomePage/HighlightText";
import CTAButton from "../../../components/core/HomePage/Button";
import "./LearningGrid.css";

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
];

const LearningGrid = () => {
  return (
    <div className="learning-grid-wrapper">
      {LearningGridArray.map((card, i) => (
        <div
          key={i}
          className={`learning-grid-card 
            ${i === 0 ? "card-span-large" : ""}
            ${card.order % 2 === 1 ? "bg-700" : ""}
            ${card.order % 2 === 0 && card.order > 0 ? "bg-800" : ""}
            ${card.order === 3 ? "card-start-2" : ""}
          `}
        >
          {card.order < 0 ? (
            <div className="learning-card-main">
              <div className="learning-card-heading">
                {card.heading} <HighlightText text={card.highlightText} />
              </div>
              <p className="learning-card-description">{card.description}</p>
              <div className="learning-card-button">
                <CTAButton active={true} linkto={card.BtnLink}>
                  {card.BtnText}
                </CTAButton>
              </div>
            </div>
          ) : (
            <div className="learning-card-secondary">
              <h1 className="secondary-title">{card.heading}</h1>
              <p className="learning-card-description">{card.description}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LearningGrid;
