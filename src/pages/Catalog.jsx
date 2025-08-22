// import React, { useEffect, useState } from "react";
// import Footer from "../components/common/Footer";
// import { useParams } from "react-router-dom";
// import { apiConnector } from "../services/apiconnector";
// import { categories } from "../services/apis";
// import { getCatalogaPageData } from "../services/operations/pageAndComponentData";
// import Course_Card from "../components/core/Catalog/Course_card";
// import CourseSlider from "../components/core/Catalog/CourseSlider";
// import { useSelector } from "react-redux";
// import Error from "./Error";
// import "./Catalog.css";

// const Catalog = () => {
//   const { loading } = useSelector((state) => state.profile);
//   const { catalogName } = useParams();
//   const [active, setActive] = useState(1);
//   const [catalogPageData, setCatalogPageData] = useState(null);
//   const [categoryId, setCategoryId] = useState("");

//   useEffect(() => {
//     const getCategories = async () => {
//       const res = await apiConnector("GET", categories.CATEGORIES_API);
//       const category_id = res?.data?.data?.find(
//         (ct) =>
//           ct.name.trim().toLowerCase().split(" ").join("-") ===
//           catalogName.trim().toLowerCase()
//       )?._id;
//       setCategoryId(category_id);
//     };
//     getCategories();
//   }, [catalogName]);

//   useEffect(() => {
//     const getCategoryDetails = async () => {
//       try {
//         const res = await getCatalogaPageData(categoryId);
//         setCatalogPageData(res);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     if (categoryId) {
//       getCategoryDetails();
//     }
//   }, [categoryId]);

//   if (loading || !catalogPageData) {
//     return (
//       <div className="catalog-loading">
//         <div className="spinner"></div>
//       </div>
//     );
//   }

//   if (!loading && !catalogPageData.success) {
//     return <Error />;
//   }

//   return (
//     <>
//       {/* Hero Section */}
//       <div className="catalog-hero">
//         <div className="catalog-hero-content">
//           <p className="catalog-breadcrumb">
//             Home / Catalog /
//             <span className="highlighted">
//               {catalogPageData?.data?.selectedCategory?.name}
//             </span>
//           </p>
//           <p className="catalog-title">
//             {catalogPageData?.data?.selectedCategory?.name}
//           </p>
//           <p className="catalog-description">
//             {catalogPageData?.data?.selectedCategory?.description}
//           </p>
//         </div>
//       </div>

//       {/* Section 1 */}
//       <div className="catalog-section">
//         <div className="section-heading">Courses to get you started</div>
//         <div className="catalog-tabs">
//           <p
//             className={`tab ${active === 1 ? "active-tab" : ""}`}
//             onClick={() => setActive(1)}
//           >
//             Most Popular
//           </p>
//           <p
//             className={`tab ${active === 2 ? "active-tab" : ""}`}
//             onClick={() => setActive(2)}
//           >
//             New
//           </p>
//         </div>
//         <CourseSlider
//           Courses={catalogPageData?.data?.categoryCourses}
//         />
//       </div>

//       {/* Section 2 */}
//       <div className="catalog-section">
//         <div className="section-heading">
//           Top courses in {catalogPageData?.data?.differentCategory?.name}
//         </div>
//         <div className="section-content">
//           <CourseSlider
//             Courses={catalogPageData?.data?.differentCategory?.courses}
//           />
//         </div>
//       </div>

//       {/* Section 3 */}
//       <div className="catalog-section">
//         <div className="section-heading">Frequently Bought</div>
//         <div className="catalog-grid">
//           {catalogPageData?.data?.mostSellingCourses
//             ?.slice(0, 4)
//             .map((course, i) => (
//               <Course_Card course={course} key={i} Height="heigh-course-Card" />
//             ))}
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default Catalog;


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Footer from "../components/common/Footer";
import Error from "./Error";
import CourseSlider from "../components/core/Catalog/CourseSlider";
import Course_Card from "../components/core/Catalog/Course_card";

import { apiConnector } from "../services/apiconnector";
import { categories } from "../services/apis";
import { getCatalogaPageData } from "../services/operations/pageAndComponentData";

import "./Catalog.css";

// Utility to turn "Web Development" → "web-development"
const slugify = (str) =>
  str
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")   // spaces → hyphens
    .replace(/-+/g, "-");   // collapse multiple hyphens

const Catalog = () => {
  const { loading } = useSelector((state) => state.profile);
  const { catalogName } = useParams();

  const [categoryId, setCategoryId] = useState("");
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [activeTab, setActiveTab] = useState(1);

  // 1) Fetch all categories, find the one matching our slug
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        const match = res?.data?.data?.find(
          (ct) => slugify(ct.name) === catalogName
        );
        setCategoryId(match?._id || "");
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    };

    fetchCategories();
  }, [catalogName]);

  // 2) Once we have the categoryId, fetch the catalog page payload
  useEffect(() => {
    if (!categoryId) return;

    const fetchCatalogData = async () => {
      try {
        const res = await getCatalogaPageData(categoryId);
        console.log("Catalog payload:", res.data);
        setCatalogPageData(res);
      } catch (err) {
        console.error("Failed to load catalog page data:", err);
      }
    };

    fetchCatalogData();
  }, [categoryId]);

  // 3) Loading & error guards
  if (loading || !catalogPageData) {
    return (
      <div className="catalog-loading">
        <div className="spinner" />
      </div>
    );
  }

  if (!loading && !catalogPageData.success) {
    return <Error />;
  }

  const { selectedCategory, categoryCourses, differentCategory, mostSellingCourses } =
    catalogPageData.data;

  return (
    <>
      {/* Hero Section */}
      <div className="catalog-hero">
        <div className="catalog-hero-content">
          <p className="catalog-breadcrumb">
            Home / Catalog /{" "}
            <span className="highlighted">{selectedCategory.name}</span>
          </p>
          <p className="catalog-title">{selectedCategory.name}</p>
          <p className="catalog-description">{selectedCategory.description}</p>
        </div>
      </div>

      {/* Section 1: Starter Courses */}
      <div className="catalog-section">
        <div className="section-heading">Courses to get you started</div>
        <div className="catalog-tabs">
          <p
            className={`tab ${activeTab === 1 ? "active-tab" : ""}`}
            onClick={() => setActiveTab(1)}
          >
            Most Popular
          </p>
          <p
            className={`tab ${activeTab === 2 ? "active-tab" : ""}`}
            onClick={() => setActiveTab(2)}
          >
            New
          </p>
        </div>
        <CourseSlider Courses={categoryCourses} />
      </div>

      {/* Section 2: Different Category */}
      <div className="catalog-section">
        <div className="section-heading">
          Top courses in {differentCategory?.name}
        </div>

        {differentCategory?.courses?.length > 0 ? (
          <CourseSlider Courses={differentCategory.courses} />
        ) : (
          <p className="no-courses">
            No courses found here yet. Check back soon!
          </p>
        )}
      </div>

      {/* Section 3: Frequently Bought */}
      <div className="catalog-section">
        <div className="section-heading">Frequently Bought</div>
        <div className="catalog-grid">
          {mostSellingCourses?.slice(0, 4).map((course, idx) => (
            <Course_Card
              course={course}
              key={idx}
              Height="heigh-course-Card"
            />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Catalog;
