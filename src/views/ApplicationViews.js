import { Routes, Route } from "react-router-dom"
import { MainMenu } from "../components/mainmenu/MainMenu"
import { useState, useEffect } from "react"


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
                <Route index element={<MainMenu currentUser={currentUser}/>} />
                {/* INSERT ADDITIONAL ROUTES HERE */}
            </Route>
        </Routes>
    )
}
