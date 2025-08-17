import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import HighlightText from '../components/core/HomePage/HighlightText';
import CTAButton from '../components/core/HomePage/Button';
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import Banner from '../assets/Images/Banner.mp4';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import TimeLineSection from '../components/core/HomePage/TimeLineSection';
import InstructorSection from '../components/core/HomePage/InstructorSection';
import Footer from '../components/common/Footer';
import ExploreMore from '../components/core/HomePage/ExploreMore';
import ReviewSlider from '../components/common/ReviewSlider';

import './Home.css';

const Home = () => {
  return (
    <div>
      {/* Section One */}
      <div className="home-container">
        <Link to={"/signup"} style={{ textDecoration: "none" }}>
          <div className="instructor-button">
            <div className="instructor-inner">
              <p>Become an instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="home-heading">
          Learn. Grow. Code. Achieve Your Future
          <HighlightText text={"Coding Skills"} />
        </div>

        <div className="home-subtext">
          “Our courses are crafted to help you build strong coding foundations, 
          solve real challenges, and grow confidently in your tech journey.”
        </div>

        <div className="cta-buttons">
          <CTAButton active={true} linkto={"/signup"}>
            {" "}
            Learn more{" "}
          </CTAButton>
          <CTAButton active={false} linkto={"/login"}>
            {" "}
            Book a demo{" "}
          </CTAButton>
        </div>

        <div className="video-container">
          <video muted loop autoPlay className="video-player">
            <source src={Banner} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <CodeBlocks
          positioning="flex-row-lg"
          heading={
            <div className="code-heading">
              Unlock Your <HighlightText text={"coding potential"} /> with our
              online courses
            </div>
          }
          subheading={
            "Our courses empower students to unlock their true potential and achieve lifelong growth."
          }
          ctabtn1={{
            btnText: "Try it yourself",
            linkto: "/signup",
            active: true,
          }}
          ctabtn2={{
            btnText: "Learn More",
            linkto: "/login",
            active: false,
          }}
          codeSnippet={`<!DOCTYPE html>\n<html>\n  <title>My Page</title>\n  <body>\n    <h1>Hello, world!</h1>\n  </body>\n</html>`}

          codecolor="text-yellow-25"
        />

        <CodeBlocks
          positioning="flex-row-reverse-lg"
          heading={
            <div className="code-heading">
              <HighlightText text={"Code smarter, grow faster"} /> — learn with our online courses.
            </div>
          }
          subheading={
            "With our learning, students discover their strengths, unlock opportunities, and shape a brighter future."
          }
          ctabtn1={{
            btnText: "Try it yourself",
            linkto: "/signup",
            active: true,
          }}
          ctabtn2={{
            btnText: "Learn More",
            linkto: "/login",
            active: false,
          }}
          codeSnippet={`<!DOCTYPE html>\n<html>\n  <title>My Page</title>\n  <body>\n    <h1>Hello, world!</h1>\n  </body>\n</html>`}

          codecolor="text-yellow-25"
        />

        <ExploreMore />
      </div>

      {/* Section Two */}
      <div className="section-two">
        <div className="homepage-bg dark-buttons">
          <div className="section-two-inner buttons-centered">
            <div className="cta-group">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="cta-link">
                  Explore Full catalog
                  <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={"/signup"}>
                <div>Learn more</div>
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="section-two-content compact-white">
          <div className="skills-section">
            <div className="skills-heading">
              Gain the practical expertise you need to thrive in your
              <HighlightText text={"career and beyond"} />
            </div>
            <div className="skills-subtext">
              <div className="skills-para">
                Step into the modern DSAverse, a groundbreaking resource that reshapes how you learn and solve.
              </div>
              <CTAButton active={true} linkto={"/signup"}>
                Learn More
              </CTAButton>
            </div>
          </div>

          <TimeLineSection />
          <LearningLanguageSection />
        </div>
      </div>


      {/* Section Three */}
      <div className="section-three">
        <InstructorSection />
        <h2 className="review-heading">Review from other learners</h2>
        <ReviewSlider />
      </div>

      {/* Section Four */}
      <Footer />
    </div>
  );
};

export default Home;
