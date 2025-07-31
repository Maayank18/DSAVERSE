import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";

import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import PublishCourse from "./PublishCourse";

import "./RenderSteps.css"; // <-- New CSS file

export default function RenderSteps() {
  const { step } = useSelector((state) => state.course);

  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ];

  return (
    <>
      <div className="step-header">
        {steps.map((item) => (
          <>
            <div className="step-indicator" key={item.id}>
              <button
                className={`step-circle ${
                  step === item.id
                    ? "step-active"
                    : "step-inactive"
                } ${step > item.id ? "step-completed" : ""}`}
              >
                {step > item.id ? (
                  <FaCheck className="check-icon" />
                ) : (
                  item.id
                )}
              </button>
            </div>
            {item.id !== steps.length && (
              <div
                className={`step-line ${
                  step > item.id ? "line-active" : "line-inactive"
                }`}
              ></div>
            )}
          </>
        ))}
      </div>

      <div className="step-labels">
        {steps.map((item) => (
          <div className="step-label-wrapper" key={item.id}>
            <p
              className={`step-label ${
                step >= item.id ? "label-active" : "label-inactive"
              }`}
            >
              {item.title}
            </p>
          </div>
        ))}
      </div>

      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse />}
    </>
  );
}
