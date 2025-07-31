import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./RequirementsField.css"; // NEW

export default function RequirementsField({
  name,
  label,
  register,
  setValue,
  errors,
  getValues,
}) {
  const { editCourse, course } = useSelector((state) => state.course);
  const [requirement, setRequirement] = useState("");
  const [requirementsList, setRequirementsList] = useState([]);

  useEffect(() => {
    if (editCourse) {
      setRequirementsList(course?.instructions);
    }
    register(name, { required: true, validate: (value) => value.length > 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setValue(name, requirementsList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requirementsList]);

  const handleAddRequirement = () => {
    if (requirement) {
      setRequirementsList([...requirementsList, requirement]);
      setRequirement("");
    }
  };

  const handleRemoveRequirement = (index) => {
    const updatedRequirements = [...requirementsList];
    updatedRequirements.splice(index, 1);
    setRequirementsList(updatedRequirements);
  };

  return (
    <div className="req-field-container">
      <label className="req-field-label" htmlFor={name}>
        {label} <sup className="req-field-required">*</sup>
      </label>

      <div className="req-input-group">
        <input
          type="text"
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          className="req-input"
        />
        <button type="button" onClick={handleAddRequirement} className="req-add-btn">
          Add
        </button>
      </div>

      {requirementsList.length > 0 && (
        <ul className="req-list">
          {requirementsList.map((requirement, index) => (
            <li key={index} className="req-list-item">
              <span>{requirement}</span>
              <button
                type="button"
                className="req-clear-btn"
                onClick={() => handleRemoveRequirement(index)}
              >
                clear
              </button>
            </li>
          ))}
        </ul>
      )}

      {errors[name] && (
        <span className="req-error">
          {label} is required
        </span>
      )}
    </div>
  );
}
