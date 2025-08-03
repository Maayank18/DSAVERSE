// import { useState } from "react"
// import { Chart, registerables } from "chart.js"
// import { Pie } from "react-chartjs-2"
// import "./InstructorChart.css"

// Chart.register(...registerables)

// export default function InstructorChart({ courses }) {
//   const [currChart, setCurrChart] = useState("students")

//   const generateRandomColors = (numColors) => {
//     const colors = []
//     for (let i = 0; i < numColors; i++) {
//       const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
//         Math.random() * 256
//       )}, ${Math.floor(Math.random() * 256)})`
//       colors.push(color)
//     }
//     return colors
//   }

//   const chartDataStudents = {
//     labels: courses.map((course) => course.courseName),
//     datasets: [
//       {
//         data: courses.map((course) => course.totalStudentsEnrolled),
//         backgroundColor: generateRandomColors(courses.length),
//       },
//     ],
//   }

//   const chartIncomeData = {
//     labels: courses.map((course) => course.courseName),
//     datasets: [
//       {
//         data: courses.map((course) => course.totalAmountGenerated),
//         backgroundColor: generateRandomColors(courses.length),
//       },
//     ],
//   }

//   const options = {
//     maintainAspectRatio: false,
//   }

//   return (
//     <div className="instructor-chart-container">
//       <p className="chart-title">Visualize</p>
//       <div className="chart-toggle-btns">
//         <button
//           onClick={() => setCurrChart("students")}
//           className={`chart-btn ${
//             currChart === "students" ? "active" : ""
//           }`}
//         >
//           Students
//         </button>
//         <button
//           onClick={() => setCurrChart("income")}
//           className={`chart-btn ${
//             currChart === "income" ? "active" : ""
//           }`}
//         >
//           Income
//         </button>
//       </div>
//       <div className="chart-wrapper">
//         <Pie
//           data={currChart === "students" ? chartDataStudents : chartIncomeData}
//           options={options}
//         />
//       </div>
//     </div>
//   )
// }



import { useState } from "react"
import { Chart, registerables } from "chart.js"
import { Pie } from "react-chartjs-2"
import "./InstructorChart.css"

Chart.register(...registerables)

export default function InstructorChart({ courses }) {
  const [currChart, setCurrChart] = useState("students")

  const generateRandomColors = (numColors) => {
    const colors = []
    for (let i = 0; i < numColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`
      colors.push(color)
    }
    return colors
  }

  // ✅ Use nullish coalescing (?? 0) to avoid undefined errors
  const chartDataStudents = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalStudentsEnrolled ?? 0),
        backgroundColor: generateRandomColors(courses.length),
      },
    ],
  }

  const chartIncomeData = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalAmountGenerated ?? 0),
        backgroundColor: generateRandomColors(courses.length),
      },
    ],
  }

  const options = {
    maintainAspectRatio: false,
  }

  return (
    <div className="instructor-chart-container">
      <p className="chart-title">Visualize</p>
      <div className="chart-toggle-btns">
        <button
          onClick={() => setCurrChart("students")}
          className={`chart-btn ${currChart === "students" ? "active" : ""}`}
        >
          Students
        </button>
        <button
          onClick={() => setCurrChart("income")}
          className={`chart-btn ${currChart === "income" ? "active" : ""}`}
        >
          Income
        </button>
      </div>
      <div className="chart-wrapper">
        {/* ✅ Only render Pie if data is valid */}
        {courses.length > 0 ? (
          <Pie
            data={currChart === "students" ? chartDataStudents : chartIncomeData}
            options={options}
          />
        ) : (
          <p className="chart-empty">No data available to show</p>
        )}
      </div>
    </div>
  )
}
