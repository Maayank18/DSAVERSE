import React from 'react'
import HighlightText from './HighlightText'
import know_your_progress from '../../../assets/Images/Know_your_progress.png'
import compare_with_others from '../../../assets/Images/Compare_with_others.png'
import plan_your_lesson from '../../../assets/Images/Plan_your_lessons.png'
import CTAButton from '../HomePage/Button'
import './LearningLanguageSection.css'

const LearningLanguageSection = () => {
  return (
    <div className="learning-wrapper">
      <div className="learning-container">
        <div className="learning-heading">
          Your swiss knife for
          <HighlightText text={"for learning any language"} />
        </div>

        <div className="learning-subheading">
          using an immense dsa platform for learing from the best
        </div>

        <div className="learning-images">
          <img
            src={know_your_progress}
            alt="know_your_progress"
            className="img-left"
          />
          <img
            src={compare_with_others}
            alt="compare_with_others"
            className="img-center"
          />
          <img
            src={plan_your_lesson}
            alt="plan_your_lesson"
            className="img-right"
          />
        </div>

        <div className="learning-button">
          <CTAButton active={true} linkto="/signup">
            <div>Learn More</div>
          </CTAButton>
        </div>
      </div>
    </div>
  )
}

export default LearningLanguageSection
