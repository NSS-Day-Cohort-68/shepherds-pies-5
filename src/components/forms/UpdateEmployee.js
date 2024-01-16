import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  deleteEmployee,
  getEmployeeById,
  updateEmployee,
} from "../../services/employeeService";
import { FormTemplate } from "./FormTemplate";

export const UpdateEmployee = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({});

  useEffect(() => {
    getEmployeeById(employeeId).then((employeeObj) => {
      setEmployee(employeeObj);
    });
  }, [employeeId]);

  const renderBtns = () => {
    return (
      <>
        <button
          className="form-btn delete-btn"
          value="remove"
          onClick={handleFormSubmit}
        >
          Remove Employee
        </button>
        <button
          className="form-btn submit-btn"
          value="save"
          onClick={handleFormSubmit}
        >
          Save Changes
        </button>
      </>
    );
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (event.target.value === "remove") {
      deleteEmployee(employee.id).then(() => {
        navigate("/viewemployees");
      });
    } else if (event.target.value === "save") {
      updateEmployee(employee).then(() => {
        navigate("/viewemployees");
      });
    }
  };

  const formControls = {
    heading: "Update or Remove Employee",
    buttons: renderBtns(),
  };

  return (
    <FormTemplate
      employee={employee}
      setEmployee={setEmployee}
      formControls={formControls}
    />
  );
};
