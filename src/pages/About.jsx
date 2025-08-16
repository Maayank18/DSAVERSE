// import React from "react"

// import FoundingStory from "../assets/Images/FoundingStory.png"
// import BannerImage1 from "../assets/Images/aboutus1.webp"
// import BannerImage2 from "../assets/Images/aboutus2.webp"
// import BannerImage3 from "../assets/Images/aboutus3.webp"
// import ContactFormSection from "../components/core/AboutPage/ContactFormSection"
// import LearningGrid from "../components/core/AboutPage/LearningGrid"
// import Quote from "../components/core/AboutPage/Quote"
// import StatsComponenet from "../components/core/AboutPage/Stats"
// import HighlightText from "../components/core/HomePage/HighlightText"
// import ReviewSlider from "../components/common/ReviewSlider"
// import Footer from "../components/common/Footer"


// import "./About.css"

// const About = () => {
//   return (
//     <div>
//       <section className="about-hero">
//         <div className="about-hero-container">
//           <header className="about-header">
//             Driving Innovation in Online Education for a
//             <HighlightText text={"Brighter Future"} />
//             <p className="about-subtext">
//               DSAverse is at the forefront of driving innovation in online
//               education. We're passionate about creating a brighter future by
//               offering cutting-edge courses, leveraging emerging technologies,
//               and nurturing a vibrant learning community.
//             </p>
//           </header>
//           <div className="hero-spacer"></div>
//           <div className="about-banner-images">
//             <img src={BannerImage1} alt="" />
//             <img src={BannerImage2} alt="" />
//             <img src={BannerImage3} alt="" />
//           </div>
//         </div>
//       </section>

//       <section className="about-quote-section">
//         <div className="about-quote-container">
//           <div className="quote-spacer"></div>
//           <Quote />
//         </div>
//       </section>

//       <section>
//         <div className="about-section">
//           <div className="about-story">
//             <div className="about-story-text">
//               <h1 className="gradient-text-1">
//                 Our Founding Story
//               </h1>
//               <p>
//                 Our e-learning platform was born out of a shared vision and
//                 passion for transforming education. It all began with a group of
//                 educators, technologists, and lifelong learners who recognized
//                 the need for accessible, flexible, and high-quality learning
//                 opportunities in a rapidly evolving digital world.
//               </p>
//               <p>
//                 As experienced educators ourselves, we witnessed firsthand the
//                 limitations and challenges of traditional education systems. We
//                 believed that education should not be confined to the walls of a
//                 classroom or restricted by geographical boundaries. We
//                 envisioned a platform that could bridge these gaps and empower
//                 individuals from all walks of life to unlock their full
//                 potential.
//               </p>
//             </div>
//             <div>
//               <img
//                 src={FoundingStory}
//                 alt=""
//                 className="founding-image"
//               />
//             </div>
//           </div>

//           <div className="about-vision-mission">
//             <div className="about-vision">
//               <h1 className="gradient-text-2">Our Vision</h1>
//               <p>
//                 With this vision in mind, we set out on a journey to create an
//                 e-learning platform that would revolutionize the way people
//                 learn. Our team of dedicated experts worked tirelessly to
//                 develop a robust and intuitive platform that combines
//                 cutting-edge technology with engaging content, fostering a
//                 dynamic and interactive learning experience.
//               </p>
//             </div>
//             <div className="about-mission">
//               <h1 className="gradient-text-3">Our Mission</h1>
//               <p>
//                 Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       <StatsComponenet />

//       <section className="about-learning-contact">
//         <LearningGrid />
//         <ContactFormSection />
//       </section>

//       <div className="about-reviews">
//         <h1>Reviews from other learners</h1>
//         <ReviewSlider />
//       </div>

//       <Footer />
//     </div>
//   )
// }

// export default About



import React from "react";

import FoundingStory from "../assets/Images/FoundingStory.png";
import BannerImage1 from "../assets/Images/aboutus1.webp";
import BannerImage2 from "../assets/Images/aboutus2.webp";
import BannerImage3 from "../assets/Images/aboutus3.webp";
import ContactFormSection from "../components/core/AboutPage/ContactFormSection";
import LearningGrid from "../components/core/AboutPage/LearningGrid";
import Quote from "../components/core/AboutPage/Quote";
import StatsComponenet from "../components/core/AboutPage/Stats";
import HighlightText from "../components/core/HomePage/HighlightText";
import ReviewSlider from "../components/common/ReviewSlider";
import Footer from "../components/common/Footer";

import "./About.css";

const About = () => {
  return (
    <div>
      {/* HERO (now only contains text content) */}
      <section className="about-hero">
        <div className="about-hero-container">
          <header className="about-header">
            Driving Innovation in Online Education for a
            <HighlightText text={" Brighter Future"} />
            <p className="about-subtext">
              DSAverse is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </p>
          </header>

          {/* small spacer to control spacing inside hero */}
          <div className="hero-spacer" />
        </div>
      </section>

      {/* BANNER IMAGES moved OUT of hero to prevent any overlap/covering */}
      <section className="about-banner-wrapper" aria-hidden="true">
        <div className="about-banner-images">
          <img src={BannerImage1} alt="" />
          <img src={BannerImage2} alt="" />
          <img src={BannerImage3} alt="" />
        </div>
      </section>

      <section className="about-quote-section">
        <div className="about-quote-container">
          <div className="quote-spacer" />
          <Quote />
        </div>
      </section>

      <section>
        <div className="about-section">
          <div className="about-story">
            <div className="about-story-text">
              <h1 className="gradient-text-1">Our Founding Story</h1>
              <p>
                Our e-learning platform was born out of a shared vision and
                passion for transforming education. It all began with a group of
                educators, technologists, and lifelong learners who recognized
                the need for accessible, flexible, and high-quality learning
                opportunities in a rapidly evolving digital world.
              </p>
              <p>
                As experienced educators ourselves, we witnessed firsthand the
                limitations and challenges of traditional education systems. We
                believed that education should not be confined to the walls of a
                classroom or restricted by geographical boundaries. We
                envisioned a platform that could bridge these gaps and empower
                individuals from all walks of life to unlock their full
                potential.
              </p>
            </div>

            <div className="about-story-image-wrap">
              <img src={FoundingStory} alt="" className="founding-image" />
            </div>
          </div>

          <div className="about-vision-mission">
            <div className="about-vision">
              <h1 className="gradient-text-2">Our Vision</h1>
              <p>
                With this vision in mind, we set out on a journey to create an
                e-learning platform that would revolutionize the way people
                learn. Our team of dedicated experts worked tirelessly to
                develop a robust and intuitive platform that combines
                cutting-edge technology with engaging content, fostering a
                dynamic and interactive learning experience.
              </p>
            </div>
            <div className="about-mission">
              <h1 className="gradient-text-3">Our Mission</h1>
              <p>
                Our mission goes beyond just delivering courses online. We
                wanted to create a vibrant community of learners, where
                individuals can connect, collaborate, and learn from one
                another. We believe that knowledge thrives in an environment of
                sharing and dialogue, and we foster this spirit of collaboration
                through forums, live sessions, and networking opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      <StatsComponenet />

      <section className="about-learning-contact">
        <LearningGrid />
        <ContactFormSection />
      </section>

      <div className="about-reviews">
        <h1>Reviews from other learners</h1>
        <ReviewSlider />
      </div>

      <Footer />
    </div>
  );
};

export default About;



