import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { createEmployee } from "../../services/employeeService"
import "./EmployeeForm.css"

export const AddEmployee = () => {
    const navigate = useNavigate()

    const [employee, setEmployee] = useState({ admin: false })

    const handleInput = (event) => {
        const employeeCopy = { ...employee }
        event.target.type === "checkbox"
            ? (employeeCopy[event.target.name] = event.target.checked)
            : (employeeCopy[event.target.name] = event.target.value)
        setEmployee(employeeCopy)
    }

    const handleSave = (event) => {
        event.preventDefault()

        createEmployee(employee).then(() => {
            navigate("/viewemployees")
        })
    }

    return (
        <>
            <div className="nav">
                <button className="nav-btn left-btn">
                    <Link to="/viewemployees" className="nav-link">
                        All Employees
                    </Link>
                </button>
                <button className="nav-btn">
                    <Link to="/" className="nav-link">
                        Home
                    </Link>
                </button>
            </div>
            <h2 className="page-heading">New Employee</h2>
            <form className="employee-form">
                <div className="form-group">
                    <label htmlFor="name-input">Full Name</label>
                    <input
                        id="name-input"
                        type="text"
                        name="name"
                        autoFocus
                        autoComplete="off"
                        onChange={handleInput}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address-input">Address</label>
                    <input
                        id="address-input"
                        type="text"
                        name="address"
                        autoComplete="off"
                        onChange={handleInput}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email-input">Email</label>
                    <input
                        id="email-input"
                        type="text"
                        name="email"
                        autoComplete="off"
                        onChange={handleInput}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="phone-input">
                        Phone Number
                    </label>
                    <input
                        id="phone-input"
                        type="text"
                        name="phoneNumber"
                        autoComplete="off"
                        onChange={handleInput}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="admin-input">Admin</label>
                    <input
                        id="admin-input"
                        type="checkbox"
                        name="admin"
                        checked={employee.admin ? employee.admin : false}
                        onChange={handleInput}
                    />
                </div>
                <button className="submit-btn" onClick={handleSave}>
                    Add Employee
                </button>
            </form>
        </>
    )
}
