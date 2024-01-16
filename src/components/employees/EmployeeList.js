import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/userService.js";

export const EmployeeList = () => {
    const [allEmployees, setAllEmployees] = useState([])

    useEffect(()=>{
        getAllUsers().then((employeeArray)=>{
            setAllEmployees(employeeArray)
        })
    },[])

    return (
        <>
        <div className="employees">
            {allEmployees.map(employeeObj=>{
                return <User user={employeeObj} key={employeeObj.id} />
            })}
        </div>
        <a href="addEmployeeForm"><button>Add Employee</button></a>
        </>
    )
}