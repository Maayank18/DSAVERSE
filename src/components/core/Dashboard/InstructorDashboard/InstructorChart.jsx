// import React, { useMemo, useState } from "react";
// import { Chart, registerables } from "chart.js";
// import { Pie } from "react-chartjs-2";
// import "./InstructorChart.css";

// Chart.register(...registerables);

// export default function InstructorChart({
//   courses = [],
//   instructorName = "",
//   subtitle = "",
// }) {
//   const [currChart, setCurrChart] = useState("students");

//   const generateColors = (n) => {
//     const base = [
//       "#7c3aed", "#2563eb", "#f97316", "#ef4444",
//       "#059669", "#eab308", "#06b6d4", "#c026d3",
//     ];
//     if (n <= base.length) return base.slice(0, n);
//     const colors = [...base];
//     for (let i = base.length; i < n; i++) {
//       const hue = Math.round((360 / n) * i) % 360;
//       colors.push(`hsl(${hue} 65% 60%)`);
//     }
//     return colors;
//   };

//   const labels = useMemo(
//     () => courses.map((c) => c.courseName || "Untitled"),
//     [courses]
//   );

//   const studentsData = useMemo(
//     () =>
//       courses.map((c) => {
//         const v = Number(c.totalStudentsEnrolled ?? c.students ?? 0);
//         return Number.isFinite(v) ? Math.max(0, Math.round(v)) : 0;
//       }),
//     [courses]
//   );

//   const revenueData = useMemo(
//     () =>
//       courses.map((c) => {
//         const explicitNum = Number(c.totalAmountGenerated);
//         if (c.totalAmountGenerated !== undefined && Number.isFinite(explicitNum)) {
//           return Math.max(0, explicitNum);
//         }
//         const price = [c.price, c.coursePrice, c.unitPrice, c.amountPerStudent]
//           .map((p) => (p === undefined ? NaN : Number(p)))
//           .find((n) => Number.isFinite(n));
//         const students = Number(c.totalStudentsEnrolled ?? c.students ?? 0);
//         if (Number.isFinite(price) && Number.isFinite(students)) {
//           return Math.max(0, price * students);
//         }
//         return 0;
//       }),
//     [courses]
//   );

//   const colors = useMemo(
//     () => generateColors(Math.max(labels.length, 1)),
//     [labels.length]
//   );

//   const chartDataStudents = {
//     labels,
//     datasets: [
//       {
//         data: studentsData,
//         backgroundColor: colors,
//         borderColor: "#0b0f13",
//         borderWidth: 1,
//       },
//     ],
//   };
//   const chartDataRevenue = {
//     labels,
//     datasets: [
//       {
//         data: revenueData,
//         backgroundColor: colors,
//         borderColor: "#0b0f13",
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = useMemo(
//     () => ({
//       responsive: true,
//       maintainAspectRatio: false,
//       plugins: {
//         legend: {
//           position: "top",
//           labels: {
//             boxWidth: 14,
//             padding: 12,
//             color: "#e5e7eb",
//             font: { size: 12 },
//           },
//         },
//         tooltip: {
//           callbacks: {
//             label: (ctx) => {
//               const v = ctx.raw ?? 0;
//               return currChart === "revenue"
//                 ? `₹ ${Number(v).toLocaleString("en-IN")}`
//                 : `${v} ${Number(v) === 1 ? "student" : "students"}`;
//             },
//           },
//         },
//       },
//       elements: { arc: { borderJoinStyle: "round" } },
//     }),
//     [currChart]
//   );

//   const hasData =
//     courses.length > 0 &&
//     (currChart === "students" ? studentsData : revenueData).some((v) => Number(v) > 0);

//   const totalCourses = labels.length;
//   const totalStudents = studentsData.reduce(
//     (a, b) => a + (Number.isFinite(b) ? b : 0),
//     0
//   );
//   const totalRevenue = revenueData.reduce(
//     (a, b) => a + (Number.isFinite(b) ? b : 0),
//     0
//   );

//   {/* ...top imports and state logic stay the same */}

// return (
//   <section className="instructor-chart instructor-full-bleed">
//     {(instructorName || subtitle) && (
//       <header className="instructor-meta">
//         {instructorName && <h2 className="instructor-name">Hi {instructorName}</h2>}
//         {subtitle && <p className="instructor-subtitle">{subtitle}</p>}
//       </header>
//     )}

//     {/* Main row: chart + stats */}
//     <div className="chart-stats-row">
//       <section className="chart-section">
//         <div className="chart-header">
//           <p className="chart-title">Visualize</p>
//           <div className="chart-toggle" role="tablist">
//             <button
//               onClick={() => setCurrChart("revenue")}
//               className={`toggle-segment ${currChart === "revenue" ? "active" : ""}`}
//             >
//               Revenue
//             </button>
//             <button
//               onClick={() => setCurrChart("students")}
//               className={`toggle-segment ${currChart === "students" ? "active" : ""}`}
//             >
//               Students
//             </button>
//           </div>
//         </div>
//         <div className="chart-wrapper">
//           {!hasData ? (
//             <p className="chart-empty">Nothing to visualize yet</p>
//           ) : (
//             <Pie
//               data={currChart === "students" ? chartDataStudents : chartDataRevenue}
//               options={options}
//             />
//           )}
//         </div>
//       </section>

//       <section className="stats-panel">
//         <p className="stat-heading">Statistics</p>
//         <div className="stats-grid">
//           <div className="stat-card">
//             <span className="stat-label">Total courses</span>
//             <span className="stat-value">{totalCourses}</span>
//           </div>
//           <div className="stat-card">
//             <span className="stat-label">Total students</span>
//             <span className="stat-value">{totalStudents}</span>
//           </div>
//           <div className="stat-card">
//             <span className="stat-label">Total income</span>
//             <span className="stat-value">
//               ₹ {Number(totalRevenue).toLocaleString("en-IN")}
//             </span>
//           </div>
//         </div>
//       </section>
//     </div>

//     {/* Courses full width below */}
//     <section className="courses-grid">
//       {courses.map((c, idx) => (
//         <article key={idx} className="course-card">
//           <h4 className="course-title">{c.courseName}</h4>
//         </article>
//       ))}
//     </section>
//   </section>
// );

// }

import React, { useMemo, useState } from "react";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";
import "./InstructorChart.css";

Chart.register(...registerables);

export default function InstructorChart({
  courses = [],
  instructorName = "",
  subtitle = "",
}) {
  const [currChart, setCurrChart] = useState("students");

  const generateColors = (n) => {
    const base = [
      "#7c3aed", "#2563eb", "#f97316", "#ef4444",
      "#059669", "#eab308", "#06b6d4", "#c026d3",
    ];
    if (n <= base.length) return base.slice(0, n);
    const colors = [...base];
    for (let i = base.length; i < n; i++) {
      const hue = Math.round((360 / n) * i) % 360;
      colors.push(`hsl(${hue} 65% 60%)`);
    }
    return colors;
  };

  const labels = useMemo(
    () => courses.map((c) => c.courseName || "Untitled"),
    [courses]
  );

  const studentsData = useMemo(
    () =>
      courses.map((c) => {
        const v = Number(c.totalStudentsEnrolled ?? c.students ?? 0);
        return Number.isFinite(v) ? Math.max(0, Math.round(v)) : 0;
      }),
    [courses]
  );

  const revenueData = useMemo(
    () =>
      courses.map((c) => {
        const explicitNum = Number(c.totalAmountGenerated);
        if (c.totalAmountGenerated !== undefined && Number.isFinite(explicitNum)) {
          return Math.max(0, explicitNum);
        }
        const price = [c.price, c.coursePrice, c.unitPrice, c.amountPerStudent]
          .map((p) => (p === undefined ? NaN : Number(p)))
          .find((n) => Number.isFinite(n));
        const students = Number(c.totalStudentsEnrolled ?? c.students ?? 0);
        if (Number.isFinite(price) && Number.isFinite(students)) {
          return Math.max(0, price * students);
        }
        return 0;
      }),
    [courses]
  );

  const colors = useMemo(
    () => generateColors(Math.max(labels.length, 1)),
    [labels.length]
  );

  const chartDataStudents = {
    labels,
    datasets: [
      {
        data: studentsData,
        backgroundColor: colors,
        borderColor: "#0b0f13",
        borderWidth: 1,
      },
    ],
  };
  const chartDataRevenue = {
    labels,
    datasets: [
      {
        data: revenueData,
        backgroundColor: colors,
        borderColor: "#0b0f13",
        borderWidth: 1,
      },
    ],
  };

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
          labels: {
            boxWidth: 14,
            padding: 12,
            color: "#e5e7eb",
            font: { size: 12 },
          },
        },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              const v = ctx.raw ?? 0;
              return currChart === "revenue"
                ? `₹ ${Number(v).toLocaleString("en-IN")}`
                : `${v} ${Number(v) === 1 ? "student" : "students"}`;
            },
          },
        },
      },
      elements: { arc: { borderJoinStyle: "round" } },
    }),
    [currChart]
  );

  const hasData =
    courses.length > 0 &&
    (currChart === "students" ? studentsData : revenueData).some((v) => Number(v) > 0);

  const totalCourses = labels.length;
  const totalStudents = studentsData.reduce(
    (a, b) => a + (Number.isFinite(b) ? b : 0),
    0
  );
  const totalRevenue = revenueData.reduce(
    (a, b) => a + (Number.isFinite(b) ? b : 0),
    0
  );

  return (
    <section className="instructor-chart instructor-full-bleed">
      {(instructorName || subtitle) && (
        <header className="instructor-meta">
          {instructorName && <h2 className="instructor-name">Hi {instructorName}</h2>}
          {subtitle && <p className="instructor-subtitle">{subtitle}</p>}
        </header>
      )}

      {/* Main row: chart + stats */}
      <div className="chart-stats-row">
        <section className="chart-section">
          <div className="chart-header">
            <p className="chart-title">Visualize</p>
            <div className="chart-toggle" role="tablist">
              <button
                onClick={() => setCurrChart("revenue")}
                className={`toggle-segment ${currChart === "revenue" ? "active" : ""}`}
              >
                Revenue
              </button>
              <button
                onClick={() => setCurrChart("students")}
                className={`toggle-segment ${currChart === "students" ? "active" : ""}`}
              >
                Students
              </button>
            </div>
          </div>
          <div className="chart-wrapper">
            {!hasData ? (
              <p className="chart-empty">Nothing to visualize yet</p>
            ) : (
              <Pie
                data={currChart === "students" ? chartDataStudents : chartDataRevenue}
                options={options}
              />
            )}
          </div>
        </section>

        <section className="stats-panel">
          <p className="stat-heading">Statistics</p>
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-label">Total courses</span>
              <span className="stat-value">{totalCourses}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Total students</span>
              <span className="stat-value">{totalStudents}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Total income</span>
              <span className="stat-value">
                ₹ {Number(totalRevenue).toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </section>
      </div>

      {/* Courses full width below (small list inside chart component) */}
      <section className="courses-grid">
        {courses.map((c, idx) => (
          <article key={idx} className="chart-course-card">
            <h4 className="course-title">{c.courseName}</h4>
          </article>
        ))}
      </section>
    </section>
  )
}

