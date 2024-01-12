import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getUserByEmail } from "../../services/userService"
import nonnaLogo from "../../assets/NonnasLogo.jpeg"

export const Login = () => {
    const [email, set] = useState("")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return getUserByEmail(email).then((foundEmployees) => {
            if (foundEmployees.length === 1) {
                const employee = foundEmployees[0]
                localStorage.setItem(
                    "nonna_user",
                    JSON.stringify({
                        id: employee.id,
                        admin: employee.admin,
                    })
                )

                navigate("/")
            } else {
                window.alert("Invalid employee login")
            }
        })
    }

    return (
        <>
            <header className="home-heading">
                <img
                    className="nonna-img"
                    src={nonnaLogo}
                    alt="Nonna's logo"
                ></img>
                <h1>Nonna's</h1>
            </header>
            <main className="auth-container">
                <form className="auth-form" onSubmit={handleLogin}>
                    <fieldset className="auth-fieldset">
                        <div className="email-input">
                            <input
                                type="email"
                                value={email}
                                className="auth-form-input"
                                onChange={(evt) => set(evt.target.value)}
                                placeholder="Email address"
                                required
                                autoFocus
                            />
                        </div>
                    </fieldset>
                    <fieldset className="auth-fieldset">
                        <div className="submit-btn">
                            <button type="submit" id="login-submit-btn">
                                Sign in
                            </button>
                        </div>
                    </fieldset>
                </form>
            </main>
        </>
    )
}
