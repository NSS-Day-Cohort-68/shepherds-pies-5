export const getUserByEmail = (email) => {
    return fetch(`http://localhost:8088/employees?email=${email}`).then(
        (employeeObj) => employeeObj.json()
    )
}

export const getAllUsers = () => {
    return fetch(`http://localhost:8088/employees`).then((res)=>
    res.json()
    )
}