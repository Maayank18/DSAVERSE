import React from 'react';
import Instructor from '../../../assets/Images/Instructor.png';
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
            Instructor from round the corner are here to shoe case 
            there talent and the learning skils
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
