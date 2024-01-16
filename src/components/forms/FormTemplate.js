import { Link } from "react-router-dom";
import "./Forms.css";

export const FormTemplate = ({ employee, setEmployee, formControls }) => {
  const handleInputChange = (event) => {
    const employeeCopy = { ...employee };
    event.target.type === "checkbox"
      ? (employeeCopy[event.target.name] = event.target.checked)
      : (employeeCopy[event.target.name] = event.target.value);
    setEmployee(employeeCopy);
  };

  return (
    <>
      <div className="nav">
        <button className="nav-btn left-btn">
          <Link to="/employeelist" className="nav-link">
            All Employees
          </Link>
        </button>
        <button className="nav-btn">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </button>
      </div>
      <h2 className="page-heading">{formControls?.heading}</h2>
      <form className="employee-form">
        <div className="form-group">
          <label className="form-label" htmlFor="name-input">
            Full Name
          </label>
          <input
            className="form-input"
            id="name-input"
            type="text"
            name="name"
            autoComplete="off"
            value={employee.name ? employee.name : ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="address-input">
            Address
          </label>
          <input
            className="form-input"
            id="address-input"
            type="text"
            name="address"
            autoComplete="off"
            value={employee.address ? employee.address : ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="email-input">
            Email
          </label>
          <input
            className="form-input"
            id="email-input"
            type="text"
            name="email"
            autoComplete="off"
            value={employee.email ? employee.email : ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="phone-input">
            Phone Number
          </label>
          <input
            className="form-input"
            id="phone-input"
            type="text"
            name="phoneNumber"
            autoComplete="off"
            value={employee.phoneNumber ? employee.phoneNumber : ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="admin-input">
            Admin
          </label>
          <div className="form-input">
            <input
              className="form-checkbox"
              id="admin-input"
              type="checkbox"
              name="admin"
              checked={employee.admin ? employee.admin : false}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-btns">{formControls.buttons}</div>
      </form>
    </>
  );
};
