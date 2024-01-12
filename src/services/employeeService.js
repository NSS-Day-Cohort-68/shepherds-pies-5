export const createEmployee = async (newEmployeeObj) => {
    const postOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEmployeeObj),
    }

    return await fetch("http://localhost:8088/employees", postOptions)
}
