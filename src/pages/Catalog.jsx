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
    .replace(/\s+/g, "-") // spaces → hyphens
    .replace(/-+/g, "-"); // collapse multiple hyphens

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
        // res.data.data should be an array of categories
        const match = res?.data?.data?.find(
          (ct) => slugify(ct.name) === catalogName
        );

        // If matched, set its ObjectId; otherwise set slug (so backend can fallback)
        setCategoryId(match?._id || catalogName || "");
      } catch (err) {
        console.error("Failed to load categories:", err);
        // fallback: set categoryId to slug so backend can try to search by slug
        setCategoryId(catalogName || "");
      }
    };

    fetchCategories();
  }, [catalogName]);

useEffect(() => {
  if (!categoryId) return;

  const fetchCatalogData = async () => {
    try {
      // getCatalogaPageData returns either:
      //  - { success: true, data: {...} }   (preferred)
      //  - or sometimes the API inner data object {...} (older/unwrapped)
      let apiBody = await getCatalogaPageData(categoryId);
      console.log("Catalog payload (raw):", apiBody);

      // Normalise: if apiBody has no `success` but looks like the inner data,
      // wrap it so we always have { success, data } shape.
      if (apiBody && typeof apiBody.success === "undefined") {
        // check for a likely inner-data shape (selectedCategory exists)
        if (apiBody.selectedCategory || apiBody.categoryCourses || apiBody.mostSellingCourses) {
          apiBody = { success: true, data: apiBody };
          console.log("Catalog payload: normalized to apiBody with success:", apiBody);
        } else {
          // it's probably an error object from axios (error.response.data)
          apiBody = { success: false, message: apiBody?.message || "Could not fetch catalog data" };
        }
      }

      setCatalogPageData(apiBody);
    } catch (err) {
      console.error("Failed to load catalog page data:", err);
      setCatalogPageData({ success: false, message: "Failed to fetch catalog data" });
    }
  };

  fetchCatalogData();
}, [categoryId]);

if (loading || catalogPageData === null) {
  return (
    <div className="catalog-loading">
      <div className="spinner" />
    </div>
  );
}

if (!loading && !catalogPageData.success) {
  // show friendly error using API's message when available
  return (
    <div className="catalog-error">
      <h2>{catalogPageData.message || "Category not found"}</h2>
      <p>Try a different category or go back to catalog list.</p>
    </div>
  );
}


  const { selectedCategory, categoryCourses, differentCategory, mostSellingCourses } =
    catalogPageData.data;

  return (
    <>
      {/* Hero Section */}
      <div className="catalog-hero">
        <div className="catalog-hero-content">
          <p className="catalog-breadcrumb">
            Home / Catalog / <span className="highlighted">{selectedCategory.name}</span>
          </p>
          <p className="catalog-title">{selectedCategory.name}</p>
          <p className="catalog-description">{selectedCategory.description}</p>
        </div>
      </div>

      {/* Section 1: Starter Courses */}
      <div className="catalog-section">
        <div className="section-heading">Courses to get you started</div>
        <div className="catalog-tabs">
          <p className={`tab ${activeTab === 1 ? "active-tab" : ""}`} onClick={() => setActiveTab(1)}>
            Most Popular
          </p>
          <p className={`tab ${activeTab === 2 ? "active-tab" : ""}`} onClick={() => setActiveTab(2)}>
            New
          </p>
        </div>
        <CourseSlider Courses={categoryCourses} />
      </div>

      {/* Section 2: Different Category */}
      <div className="catalog-section">
        <div className="section-heading">Top courses in {differentCategory?.name}</div>

        {differentCategory?.courses?.length > 0 ? (
          <CourseSlider Courses={differentCategory.courses} />
        ) : (
          <p className="no-courses">No courses found here yet. Check back soon!</p>
        )}
      </div>

      {/* Section 3: Frequently Bought */}
      <div className="catalog-section">
        <div className="section-heading">Frequently Bought</div>

        {/* Use CourseSlider so this section is horizontally scrollable on touch and via buttons */}
        {mostSellingCourses && mostSellingCourses.length > 0 ? (
          <CourseSlider Courses={mostSellingCourses.slice(0, 12)} />
        ) : (
          <p className="no-courses">No frequently bought courses found.</p>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Catalog;
