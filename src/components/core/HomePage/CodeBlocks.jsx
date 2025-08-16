// import React from "react";
// import CTAButton from "./Button";
// import { FaArrowRight } from "react-icons/fa";
// import { TypeAnimation } from "react-type-animation";
// import "./CodeBlocks.css";

// const CodeBlocks = ({
//   positioning = "",
//   heading = "Unlock Your coding potential with our online courses",
//   subheading =
//     "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.",
//   ctabtn1 = { btnText: "Try it yourself", linkto: "/", active: true },
//   ctabtn2 = { btnText: "Learn More", linkto: "/learn", active: false },
//   codeSnippet = `<<!DOCTYPE html>
// <html>
// <head><title>Example</title>
// </head>
// <body>
// <h1><ahref="/">Header</a>
// </h1>
// <nav><ahref="one/">One</a><ahref="two/">Two</a>
// <ahref="three/">Three
// </nav>
// </body>
// </html>`,
//   codecolor = "text-yellow-25",
// }) => {
//   const lines = codeSnippet.split("\n");

//   // Build a sequence that types line by line, never fully deleting
//   const sequence = [];
//   for (let i = 0; i < lines.length; i++) {
//     sequence.push(lines.slice(0, i + 1).join("\n"), 1000);
//   }

//   return (
//     <div className={`codeblock-wrapper ${positioning}`}>
//       {/* LEFT SECTION */}
//       <div className="codeblock-left">
//         <h1 className="codeblock-heading">{heading}</h1>
//         <p className="codeblock-subtext">{subheading}</p>
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

//       {/* RIGHT SECTION */}
//       <div className="codeblock-right">
//         <div className="code-editor-container">
//           <div className="codeblock-lines">
//             {lines.map((_, i) => (
//               <span key={i}>{i + 1}</span>
//             ))}
//           </div>
//           <pre className={`codeblock-code ${codecolor}`}>
//             <TypeAnimation
//               sequence={sequence}
//               repeat={Infinity}
//               cursor={true}
//               omitDeletionAnimation={true}
//               style={{ whiteSpace: "pre" }}
//             />
//           </pre>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CodeBlocks;

import React from "react";
import CTAButton from "./Button";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
import "./CodeBlocks.css";

const CodeBlocks = ({
  positioning = "",
  heading = "Unlock Your coding potential with our online courses",
  subheading =
    "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.",
  ctabtn1 = { btnText: "Try it yourself", linkto: "/", active: true },
  ctabtn2 = { btnText: "Learn More", linkto: "/learn", active: false },
  codeSnippet = `<!DOCTYPE html>
<html>
<head><title>Example</title>
</head>
<body>
<h1><a href="/">Header</a></h1>
<nav>
  <a href="one/">One</a>
  <a href="two/">Two</a>
  <a href="three/">Three</a>
</nav>
</body>
</html>`,
  codecolor = "text-yellow-25",
}) => {
  const lines = codeSnippet.split("\n");

  // Build animation sequence: line by line typing
  const sequence = [];
  for (let i = 0; i < lines.length; i++) {
    sequence.push(lines.slice(0, i + 1).join("\n"), 1000);
  }

  return (
    <div className={`codeblock-wrapper ${positioning}`}>
      {/* LEFT */}
      <div className="codeblock-left">
        <h1 className="codeblock-heading">{heading}</h1>
        <p className="codeblock-subtext">{subheading}</p>
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

      {/* RIGHT */}
      <div className="codeblock-right">
        <div className="code-editor-container" role="region" aria-label="Code example">
          <div className="codeblock-lines" aria-hidden>
            {lines.map((_, i) => (
              <span key={i}>{i + 1}</span>
            ))}
          </div>

          {/* The <pre> stays fixed size; TypeAnimation is contained inside it */}
          <pre className={`codeblock-code ${codecolor}`} aria-live="polite">
            <TypeAnimation
              sequence={sequence}
              repeat={Infinity}
              cursor={true}
              omitDeletionAnimation={true}
              style={{ whiteSpace: "pre-wrap", display: "block", width: "100%" }}
            />
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;



