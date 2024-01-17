
export const getAllEmployees = () => {
    return fetch(`http://localhost:8088/employees`).then((res) => res.json())
}


export const createEmployee = async (newEmployeeObj) => {
    const postOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEmployeeObj),
    }

    return await fetch("http://localhost:8088/employees", postOptions)
}

export const getEmployeeById = async (employeeId) => {
    const response = await fetch(
        `http://localhost:8088/employees/${employeeId}`
    )
    return await response.json()
}

export const updateEmployee = async (updatedEmployeeObj) => {
    const putOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEmployeeObj),
    }

    return await fetch(
        `http://localhost:8088/employees/${updatedEmployeeObj.id}`,
        putOptions
    )
}

export const deleteEmployee = async (employeeId) => {
    const deleteOptions = { method: "DELETE" }

    return await fetch(
        `http://localhost:8088/employees/${employeeId}`,
        deleteOptions
    )
}
