import React from 'react';
import Instructor from '../../../assets/Images/InstructorImage.png';
import CTAButton from '../HomePage/Button';
import HighlightText from '../HomePage/HighlightText';
import { FaArrowRight } from 'react-icons/fa';
import './InstructorSection.css';

const InstructorSection = () => {
  return (
    <div className="instructor-wrapper">
      <div className="instructor-container">
        <div className="instructor-image">
          <img src={Instructor} alt="Instructor" className="image-shadow" />
        </div>
        <div className="instructor-content">
          <div className="instructor-heading">
            Become an <HighlightText text="Instructor" />
          </div>
          <p className="instructor-text">
            " Instructors from around the corner have arrived to showcase their talents and share their remarkable learning journeys. With dedication and expertise, they bring forth a vibrant display of skills honed through years of experience and passion. "
          </p>
          <div className="instructor-button">
            <CTAButton active={true} linkto="/signup">
              <div className="instructor-cta">
                Start Learning today
                <FaArrowRight />
              </div>
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorSection;
