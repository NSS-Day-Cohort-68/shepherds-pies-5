import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/userService.js"
import "./employee.css"

export const EmployeeList = () => {
    const [allEmployees, setAllEmployees] = useState([])

    useEffect(()=>{
        getAllUsers().then((employeeArray)=>{
            setAllEmployees(employeeArray)
        })
    },[])

    return (<section>
       <div className="employees">
        {allEmployees.map(employee=>{
            return <div className="employeeCard">
                <p className="employeeName">{employee.name}</p>
                <p>{employee.address}</p>
                <p>{employee.phoneNumber}</p>
                <p>{employee.email}</p>
                
            </div>
        })}
       </div>
       
       <button className="Home">
                    <Link to="/" className="nav-link">
                       <img src="https://i.pinimg.com/originals/b0/22/07/b0220700bcfee516dfd95bf09507cd80.png" />
                    </Link>
                </button>
       <button className="addEmployee"><Link to ="/add-employee">Add Employee</Link></button>
       
       </section>
    )
}