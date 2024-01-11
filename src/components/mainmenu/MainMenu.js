import { useNavigate, Link } from "react-router-dom"



export const MainMenu = ({ currentuser }) => {
     const navigate = useNavigate()

    return (
        <div className="button-container">
            <button classname="btn-primary">
                <Link to="neworder">New Order</Link> 
            </button> 
            <button classname="btn-primary">
                <Link to="vieworders">View Orders</Link>
            </button>
            <button classname="btn-primary">
                {currentuser.admin === true ? <Link to="viewemployees">View Employees</Link> : ""}   
            </button>
            <button classname="btn-primary">
                {currentuser.admin === true ? <Link to="salesreport">Sales Report</Link> : ""}
            </button>
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

