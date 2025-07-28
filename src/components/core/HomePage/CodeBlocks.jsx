// import React from "react";
// import CTAButton from "./Button";
// import HighlightText from "./HighlightText";
// import { FaArrowRight } from "react-icons/fa";
// import { TypeAnimation } from "react-type-animation";
// import "./CodeBlocks.css";

// const CodeBlocks = ({
//   positioning = "",
//   heading,
//   subheading,
//   ctabtn1 = {},
//   ctabtn2 = {},
//   codeSnippet = "",
//   codecolor,
// }) => {
//   // Split code snippet by lines
//   const lines = codeSnippet.split("\n");

//   return (
//     <div className={`codeblock-wrapper ${positioning}`}>
//       {/* Left Section */}
//       <div className="codeblock-left">
//         {heading}
//         <div className="codeblock-subtext">{subheading}</div>
//         <div className="codeblock-buttons">
//           <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
//             <div className="cta-content">
//               {ctabtn1.btnText}
//               <FaArrowRight />
//             </div>
//           </CTAButton>
//           <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
//             {ctabtn2.btnText}
//           </CTAButton>
//         </div>
//       </div>

//       {/* Right Section */}
//       <div className="codeblock-right">
//         {/* Line Numbers */}
//         <div className="codeblock-lines">
//           {lines.map((_, i) => (
//             <p key={i}>{i + 1}</p>
//           ))}
//         </div>

//         {/* Code Lines with Type Animation */}
//         <div className={`codeblock-code ${codecolor}`}>
//           {lines.map((line, i) => (
//             <TypeAnimation
//               key={i}
//               sequence={[line, 1000]}
//               repeat={Infinity}
//               cursor={false}
//               style={{
//                 whiteSpace: "pre",
//                 display: "block",
//               }}
//               omitDeletionAnimation={true}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CodeBlocks;

import React from "react";
import CTAButton from "./Button";
import HighlightText from "./HighlightText";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
import "./CodeBlocks.css";

const CodeBlocks = ({
  positioning = "",
  heading,
  subheading,
  ctabtn1 = {},
  ctabtn2 = {},
  codeSnippet,
  codecolor,
}) => {
  // Split the snippet into lines
  const lines = codeSnippet.split("\n");

  // Create animation steps: type each line incrementally
  const sequence = [];
  for (let i = 0; i < lines.length; i++) {
    const current = lines.slice(0, i + 1).join("\n");
    sequence.push(current, 1000); // 1s delay
  }
  sequence.push("", 1000); // clear and pause
  // This gives effect like type → type → full → delete → repeat

  return (
    <div className={`codeblock-wrapper ${positioning}`}>
      {/* Left Section */}
      <div className="codeblock-left">
        {heading}
        <div className="codeblock-subtext">{subheading}</div>
        <div className="codeblock-buttons">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className="cta-content">
              {ctabtn1.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>
          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            {ctabtn2.btnText}
          </CTAButton>
        </div>
      </div>

      {/* Right Section */}
      <div className="codeblock-right">
        <div className="codeblock-lines">
          {[...Array(10)].map((_, i) => (
            <p key={i}>{i + 1}</p>
          ))}
        </div>
        <div className={`codeblock-code ${codecolor}`}>
          <TypeAnimation
            sequence={sequence}
            repeat={Infinity}
            cursor={true}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
            omitDeletionAnimation={false}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;
