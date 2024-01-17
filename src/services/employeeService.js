
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
