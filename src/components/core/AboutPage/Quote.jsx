import React from 'react'
import HighlightText from '../HomePage/HighlightText'
import './Quote.css'

const Quote = () => {
  return (
    <div className="quote-container">
      We are passionate about revolutionizing the way we learn. Our
      innovative platform <HighlightText text={"combines technology"} />,{" "}
      <span className="quote-gradient-orange">
        {" "}
        expertise
      </span>
      , and community to create an
      <span className="quote-gradient-yellow">
        {" "}
        unparalleled educational experience.
      </span> 
    </div>
  )
}

export default Quote
