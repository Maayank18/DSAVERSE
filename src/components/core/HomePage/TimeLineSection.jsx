import React from 'react'
import './TimeLineSection.css'
import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import TimelineImage from '../../../assets/Images/TimelineImage.png'

const timeLine = [
  {
    Logo: Logo1,
    heading: "Leadership",
    Description: "Fully committed to successful company",
  },
  {
    Logo: Logo2,
    heading: "Responsibility",
    Description: "Take ownership and build strong results",
  },
  {
    Logo: Logo3,
    heading: "Growth",
    Description: "Continuously improving skills and mindset",
  },
  {
    Logo: Logo4,
    heading: "Innovation",
    Description: "Think different, deliver better solutions",
  },
]

const TimeLineSection = () => {
  return (
    <div className="timeline-wrapper">
      <div className="timeline-container">
        {/* Left Timeline Points */}
        <div className="timeline-left">
          {timeLine.map((element, index) => {
            return (
              <div className="timeline-item" key={index}>
                <div className="timeline-icon">
                  <img src={element.Logo} alt={`step-${index}`} />
                </div>
                <div className="timeline-text">
                  <h2>{element.heading}</h2>
                  <p>{element.Description}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Right Image */}
        <div className="timeline-image-wrapper">
          <img src={TimelineImage} alt="timelineImage" className="timeline-main-image" />
          <div className="timeline-overlay">
            <div className="timeline-metric">
              <p className="metric-number">10</p>
              <p className="metric-label">Years of Experience</p>
            </div>
            <div className="timeline-metric">
              <p className="metric-number">250</p>
              <p className="metric-label">Types of Courses</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimeLineSection
