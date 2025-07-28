import React from 'react'
import './HighlightText.css'

const HighlightText = ({ text }) => {
  return (
    <span className='highlight-text'>
      {" "}
      {text}
    </span>
  )
}

export default HighlightText
