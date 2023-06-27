import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./security/AuthContext";

export function LoginComponent() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const navigate = useNavigate();
    const authContext = useAuth();

    const handleUserNameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async () => {
        if (await authContext.login(username, password)) {
            navigate(`/welcome/${username}`);
        } else {
            setShowErrorMessage(true);
        }
    };

    return (
        <div className="Login">
            {showErrorMessage && (
                <div className="errorMessage">
                    Authenticated Failed, Please check your credentials.
                </div>
            )}
            <div className="LoginForm">
                <div>
                    <label htmlFor="">User Name</label>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={handleUserNameChange}
                    />
                </div>
                <div>
                    <label htmlFor="">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <div>
                    <button type="button" name="login" onClick={handleSubmit}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}
