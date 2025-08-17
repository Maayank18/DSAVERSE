import React from "react";
import "./Stats.css";

const Stats = [
  { count: "5K", label: "Active Students" },
  { count: "10+", label: "Mentors" },
  { count: "200+", label: "Courses" },
  { count: "50+", label: "Awards" },
];

const StatsComponenet = () => {
  return (
    <div className="stats-wrapper">
      <div className="stats-container">
        <div className="stats-grid">
          {Stats.map((data, index) => (
            <div className="stats-item" key={index}>
              <h1 className="stats-count">{data.count}</h1>
              <h2 className="stats-label">{data.label}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsComponenet;

