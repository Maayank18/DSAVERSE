import React, { useEffect, useState } from "react";
import Footer from "../components/common/Footer";
import { useParams } from "react-router-dom";
import { apiConnector } from "../services/apiconnector";
import { categories } from "../services/apis";
import { getCatalogaPageData } from "../services/operations/pageAndComponentData";
import Course_Card from "../components/core/Catalog/Course_card";
import CourseSlider from "../components/core/Catalog/CourseSlider";
import { useSelector } from "react-redux";
import Error from "./Error";
import "./Catalog.css";

const Catalog = () => {
  const { loading } = useSelector((state) => state.profile);
  const { catalogName } = useParams();
  const [active, setActive] = useState(1);
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    const getCategories = async () => {
      const res = await apiConnector("GET", categories.CATEGORIES_API);
      const category_id = res?.data?.data?.find(
        (ct) =>
          ct.name.trim().toLowerCase().split(" ").join("-") ===
          catalogName.trim().toLowerCase()
      )?._id;
      setCategoryId(category_id);
    };
    getCategories();
  }, [catalogName]);

  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const res = await getCatalogaPageData(categoryId);
        setCatalogPageData(res);
      } catch (error) {
        console.log(error);
      }
    };
    if (categoryId) {
      getCategoryDetails();
    }
  }, [categoryId]);

  if (loading || !catalogPageData) {
    return (
      <div className="catalog-loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!loading && !catalogPageData.success) {
    return <Error />;
  }

  return (
    <>
      {/* Hero Section */}
      <div className="catalog-hero">
        <div className="catalog-hero-content">
          <p className="catalog-breadcrumb">
            Home / Catalog /
            <span className="highlighted">
              {catalogPageData?.data?.selectedCategory?.name}
            </span>
          </p>
          <p className="catalog-title">
            {catalogPageData?.data?.selectedCategory?.name}
          </p>
          <p className="catalog-description">
            {catalogPageData?.data?.selectedCategory?.description}
          </p>
        </div>
      </div>

      {/* Section 1 */}
      <div className="catalog-section">
        <div className="section-heading">Courses to get you started</div>
        <div className="catalog-tabs">
          <p
            className={`tab ${active === 1 ? "active-tab" : ""}`}
            onClick={() => setActive(1)}
          >
            Most Popular
          </p>
          <p
            className={`tab ${active === 2 ? "active-tab" : ""}`}
            onClick={() => setActive(2)}
          >
            New
          </p>
        </div>
        <CourseSlider
          Courses={catalogPageData?.data?.categoryCourses}
        />
      </div>

      {/* Section 2 */}
      <div className="catalog-section">
        <div className="section-heading">
          Top courses in {catalogPageData?.data?.differentCategory?.name}
        </div>
        <div className="section-content">
          <CourseSlider
            Courses={catalogPageData?.data?.differentCategory?.courses}
          />
        </div>
      </div>

      {/* Section 3 */}
      <div className="catalog-section">
        <div className="section-heading">Frequently Bought</div>
        <div className="catalog-grid">
          {catalogPageData?.data?.mostSellingCourses
            ?.slice(0, 4)
            .map((course, i) => (
              <Course_Card course={course} key={i} Height="heigh-course-Card" />
            ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Catalog;
