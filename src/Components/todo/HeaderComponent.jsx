import { Link } from "react-router-dom";
import { useAuth } from "./security/AuthContext";

export function HeaderComponent() {
    const authContext = useAuth();
    const isAuthenticated = authContext.isAuthenticated;

    const logout = () => {
        authContext.logout();
    };

    return (
        <header className="border-bottom border-light border-5 mb-5 p-2">
            <div className="container">
                <div className="row">
                    <nav className="navbar navbar-expand-lg">
                        <Link
                            className="navbar-brand ms-2 fs-2 fw-bold text-black"
                            to="/welcome/Username"
                        >
                            ToDos
                        </Link>
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav">
                                <li className="nav-item fs-5">
                                    {isAuthenticated && (
                                        <Link
                                            className="nav-link"
                                            to="/welcome/Username"
                                        >
                                            Home
                                        </Link>
                                    )}
                                </li>
                                <li className="nav-item fs-5">
                                    {isAuthenticated && (
                                        <Link className="nav-link" to="/todos">
                                            Todos
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </div>
                        <ul className="navbar-nav">
                            <li className="nav-item fs-5">
                                {!isAuthenticated && (
                                    <Link className="nav-link" to="/login">
                                        Login
                                    </Link>
                                )}
                            </li>
                            <li className="nav-item fs-5">
                                {isAuthenticated && (
                                    <Link
                                        className="nav-link"
                                        onClick={logout}
                                        to="/logout"
                                    >
                                        Logout
                                    </Link>
                                )}
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}
