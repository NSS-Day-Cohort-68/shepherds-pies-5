import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getUserByEmail } from "../../services/userService"

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
        <main className="auth-container">
            <section>
                <form className="auth-form" onSubmit={handleLogin}>
                    <h1 className="header">Nonna's</h1>
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
            </section>
        </main>
    )
}
