import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import CourseCard from "./CourseCard";
import HighlightText from "./HighlightText";
import "./ExploreMore.css";

const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };

  return (
    <div className="explore-wrapper">
      {/* Heading */}
      <div className="explore-heading">
        Unlock the <HighlightText text={"Power of Code"} />
        <p className="explore-subheading">
          Learn to Build Anything You Can Imagine
        </p>
      </div>

      {/* Tabs */}
      <div className="explore-tabs">
        {tabsName.map((ele, index) => {
          return (
            <div
              className={`tab-item ${currentTab === ele ? "active-tab" : ""}`}
              key={index}
              onClick={() => setMyCards(ele)}
            >
              {ele}
            </div>
          );
        })}
      </div>

      {/* Spacer */}
      <div className="explore-spacer"></div>

      {/* Course Cards */}
      <div className="explore-cards">
        {courses.map((ele, index) => {
          return (
            <CourseCard
              key={index}
              cardData={ele}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ExploreMore;
