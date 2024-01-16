import { Routes, Route } from "react-router-dom"
import { MainMenu } from "../components/mainmenu/MainMenu"
import { useState, useEffect } from "react"
import { AddEmployee } from "../components/forms/AddEmployee"
import { EmployeeList } from "../components/employees/EmployeeList.js"
import { UpdateEmployee } from "../components/forms/UpdateEmployee"

export const ApplicationViews = () => {
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        const localNonnaUser = localStorage.getItem("nonna_user")
        const NonnaUserObject = JSON.parse(localNonnaUser)
        setCurrentUser(NonnaUserObject)
    }, [])

    return (
        <Routes>
            <Route path="/">
                <Route index element={<MainMenu currentUser={currentUser} />} />
                {/* INSERT ADDITIONAL ROUTES HERE */}
                <Route path="EmployeeList" element={<EmployeeList />} />
                <Route path="add-employee" element={<AddEmployee />} />
                <Route
                    path="update-employee/:employeeId"
                    element={<UpdateEmployee />}
                />
            </Route>
        </Routes>
    )
}
