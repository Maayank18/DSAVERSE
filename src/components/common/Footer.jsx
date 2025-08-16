// import React from "react";
// import { FooterLink2 } from "../../data/footer-links";
// import { Link } from "react-router-dom";

// // Images
// // import Logo from "../../assets/Logo/Logo-Full-Light.png";

// // Icons
// import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

// import './Footer.css';

// const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
// const Resources = [
//   "Articles",
//   "Blog",
//   "Chart Sheet",
//   "Code challenges",
//   "Docs",
//   "Projects",
//   "Videos",
//   "Workspaces",
// ];
// const Plans = ["Paid memberships", "For students", "Business solutions"];
// const Community = ["Forums", "Chapters", "Events"];

// const Footer = () => {
//   return (
//     <div className="footer">
//       <div className="footer-container">
//         <div className="footer-top">
//           {/* Section 1 */}
//           <div className="footer-section left">
//             <div className="footer-box">
//               {/* <img src={Logo} alt="Company Logo" className="logo" /> */}
//               <h1 className="footer-title">Company</h1>
//               <div className="footer-link-group">
//                 {["About", "Careers", "Affiliates"].map((ele, i) => (
//                   <div key={i} className="footer-link">
//                     <Link to={ele.toLowerCase()}>{ele}</Link>
//                   </div>
//                 ))}
//               </div>
//               <div className="footer-icons">
//                 <FaFacebook />
//                 <FaGoogle />
//                 <FaTwitter />
//                 <FaYoutube />
//               </div>
//             </div>

//             <div className="footer-box">
//               <h1 className="footer-title">Resources</h1>
//               <div className="footer-link-group">
//                 {Resources.map((ele, i) => (
//                   <div key={i} className="footer-link">
//                     <Link to={ele.split(" ").join("-").toLowerCase()}>{ele}</Link>
//                   </div>
//                 ))}
//               </div>
//               <h1 className="footer-title mt">Support</h1>
//               <div className="footer-link mt">
//                 <Link to="/help-center">Help Center</Link>
//               </div>
//             </div>

//             <div className="footer-box">
//               <h1 className="footer-title">Plans</h1>
//               <div className="footer-link-group">
//                 {Plans.map((ele, i) => (
//                   <div key={i} className="footer-link">
//                     <Link to={ele.split(" ").join("-").toLowerCase()}>{ele}</Link>
//                   </div>
//                 ))}
//               </div>
//               <h1 className="footer-title mt">Community</h1>
//               <div className="footer-link-group">
//                 {Community.map((ele, i) => (
//                   <div key={i} className="footer-link">
//                     <Link to={ele.split(" ").join("-").toLowerCase()}>{ele}</Link>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Section 2 */}
//           <div className="footer-section right">
//             {FooterLink2.map((ele, i) => (
//               <div key={i} className="footer-box">
//                 <h1 className="footer-title">{ele.title}</h1>
//                 <div className="footer-link-group">
//                   {ele.links.map((link, j) => (
//                     <div key={j} className="footer-link">
//                       <Link to={link.link}>{link.title}</Link>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Bottom footer */}
//       <div className="footer-bottom">
//         <div className="footer-bottom-inner">
//           <div className="footer-bottom-links">
//             {BottomFooter.map((ele, i) => (
//               <div key={i} className={`footer-bottom-link ${i < BottomFooter.length - 1 ? 'bordered' : ''}`}>
//                 <Link to={ele.split(" ").join("-").toLowerCase()}>{ele}</Link>
//               </div>
//             ))}
//           </div>
//           <div className="footer-copy">Made with ❤️ Mayank © 2023 DSAverse</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Footer;

// Footer.jsx
import React from "react";
import { FooterLink2 } from "../../data/footer-links";
import { useNavigate, useLocation } from "react-router-dom";

// Icons
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

import './Footer.css';

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * Universal handler:
   * - prevents the default anchor navigation
   * - if already on '/', it just scrolls to top smoothly
   * - otherwise it navigates to '/' and then scrolls to top after a short delay
   */
  const goHomeAndScrollTop = (e) => {
    // allow middle-click / ctrl+click to open in new tab
    if (e && (e.button === 1 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)) {
      // let the browser handle it (opens in new tab)
      return;
    }

    if (e && e.preventDefault) e.preventDefault();

    if (location.pathname === "/") {
      // already on home: just scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // navigate to home, then scroll a bit after route change
    navigate("/");

    // small delay to let the route change & DOM paint (tweak if needed)
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
  };

  // helper to render a home-linked anchor with the handler
  const HomeLink = ({ children, className = "" }) => (
    <a href="/" onClick={goHomeAndScrollTop} className={className} aria-label="Go to home">
      {children}
    </a>
  );

  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-top">
          {/* Section 1 */}
          <div className="footer-section left">
            <div className="footer-box">
              {/* <img src={Logo} alt="Company Logo" className="logo" /> */}
              <h1 className="footer-title">Company</h1>
              <div className="footer-link-group">
                {["About", "Careers", "Affiliates"].map((ele, i) => (
                  <div key={i} className="footer-link">
                    <HomeLink>{ele}</HomeLink>
                  </div>
                ))}
              </div>
              <div className="footer-icons">
                <a href="/" onClick={goHomeAndScrollTop} aria-label="Home - Facebook">
                  <FaFacebook />
                </a>
                <a href="/" onClick={goHomeAndScrollTop} aria-label="Home - Google">
                  <FaGoogle />
                </a>
                <a href="/" onClick={goHomeAndScrollTop} aria-label="Home - Twitter">
                  <FaTwitter />
                </a>
                <a href="/" onClick={goHomeAndScrollTop} aria-label="Home - YouTube">
                  <FaYoutube />
                </a>
              </div>
            </div>

            <div className="footer-box">
              <h1 className="footer-title">Resources</h1>
              <div className="footer-link-group">
                {Resources.map((ele, i) => (
                  <div key={i} className="footer-link">
                    <HomeLink>{ele}</HomeLink>
                  </div>
                ))}
              </div>
              <h1 className="footer-title mt">Support</h1>
              <div className="footer-link mt">
                <HomeLink>Help Center</HomeLink>
              </div>
            </div>

            <div className="footer-box">
              <h1 className="footer-title">Plans</h1>
              <div className="footer-link-group">
                {Plans.map((ele, i) => (
                  <div key={i} className="footer-link">
                    <HomeLink>{ele}</HomeLink>
                  </div>
                ))}
              </div>
              <h1 className="footer-title mt">Community</h1>
              <div className="footer-link-group">
                {Community.map((ele, i) => (
                  <div key={i} className="footer-link">
                    <HomeLink>{ele}</HomeLink>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="footer-section right">
            {FooterLink2.map((ele, i) => (
              <div key={i} className="footer-box">
                <h1 className="footer-title">{ele.title}</h1>
                <div className="footer-link-group">
                  {ele.links.map((link, j) => (
                    <div key={j} className="footer-link">
                      <HomeLink>{link.title}</HomeLink>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <div className="footer-bottom-links">
            {BottomFooter.map((ele, i) => (
              <div key={i} className={`footer-bottom-link ${i < BottomFooter.length - 1 ? 'bordered' : ''}`}>
                <HomeLink>{ele}</HomeLink>
              </div>
            ))}
          </div>
          <div className="footer-copy">Made with ❤️ Mayank © {new Date().getFullYear()} DSAverse</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

