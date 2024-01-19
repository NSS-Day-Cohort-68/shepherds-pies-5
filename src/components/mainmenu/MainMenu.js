import { useNavigate, Link } from "react-router-dom"



export const MainMenu = ({ currentUser }) => {
     const navigate = useNavigate()

    return (
        <div className="button-container">
            <button classname="btn-primary">
                <Link to="neworder">New Order</Link> 
            </button> 
            <button classname="btn-primary">
                <Link to="orders">View Orders</Link>
            </button>
            
            {currentUser.admin === true ? 
                <button classname="btn-primary"><Link to="/EmployeeList">View Employees</Link></button>
                 : ""}   
         
            {currentUser.admin === true ? 
                <button classname="btn-primary"><Link to="/sales">Sales Report</Link></button> 
                : ""}
          
            {localStorage.getItem("nonna_user") ? (
                <button classname="btn-primary">
                    <Link
                    to=""
                    onClick={() => {
                        localStorage.removeItem("nonna_user")
                        navigate("/login", { replace: true })
                    }}
                    >
                    Logout
                    </Link>
                </button>
                ) : (
                ""
                )}
        </div>
    )
}

