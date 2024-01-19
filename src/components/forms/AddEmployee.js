import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createEmployee } from "../../services/employeeService";
import { FormTemplate } from "./FormTemplate";

export const AddEmployee = () => {
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({});

  useEffect(() => {
    const emptyEmployee = {
      id: null,
      name: null,
      address: null,
      phoneNumber: null,
      email: null,
      admin: false,
    };
    setEmployee(emptyEmployee);
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    createEmployee(employee).then(() => {
      navigate("/employeelist");
    });
  };

  const renderBtns = () => {
    return (
      <>
        <button className="form-btn submit-btn" onClick={handleFormSubmit}>
          Add Employee
        </button>
      </>
    );
  };

  const formControls = {
    heading: "Add New Employee",
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
