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
        {/* IMAGE - LEFT */}
        <div className="instructor-image">
          <img src={Instructor} alt="Instructor" className="image-shadow" />
        </div>

        {/* CONTENT - RIGHT */}
        <div className="instructor-content">
          <div className="instructor-heading">
            Become an <HighlightText text="Instructor" />
          </div>
          <p className="instructor-text">
            “<strong>
              Our instructors come with years of hands-on experience and a deep passion for coding.
              They are dedicated to guiding learners through a journey of growth, sharing not only their technical expertise
              but also the insights and lessons they’ve gathered throughout their careers.
              With their support, you can master new skills, tackle real-world challenges, and achieve your professional goals.
            </strong>”
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
