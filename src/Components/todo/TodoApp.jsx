import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { LogoutComponent } from "./LogoutComponent";
import { FooterComponent } from "./FooterComponent";
import { HeaderComponent } from "./HeaderComponent";
import { ListTodosComponent } from "./ListTodosComponent";
import { ErrorComponent } from "./ErrorComponent";
import { WelcomeComponent } from "./WelcomeComponent";
import { LoginComponent } from "./LoginComponent";
import ToDoComponent from "./ToDoComponent";
import AuthProvider, { useAuth } from "./security/AuthContext";

import "./TodoApp.css";


function AuthenticatedRoute({ children }) {
    const authConext = useAuth();
    if (authConext.isAuthenticated) return children;

    return <Navigate to="/" />;
}

function TodoApp() {
    return (
        <div className="TodoApp">
            <AuthProvider>
                <Router>
                    <HeaderComponent />
                    <Routes>
                        <Route path="/" element={<LoginComponent />} />
                        <Route path="/login" element={<LoginComponent />} />
                        <Route
                            path="/welcome/:username"
                            element={
                                <AuthenticatedRoute>
                                    <WelcomeComponent />
                                </AuthenticatedRoute>
                            }
                        />
                        <Route
                            path="/todos"
                            element={
                                <AuthenticatedRoute>
                                    <ListTodosComponent />
                                </AuthenticatedRoute>
                            }
                        />
                        <Route
                            path="/todo/:id"
                            element={
                                <AuthenticatedRoute>
                                    <ToDoComponent />
                                </AuthenticatedRoute>
                            }
                        />
                        <Route
                            path="/logout"
                            element={
                                <AuthenticatedRoute>
                                    <LogoutComponent />
                                </AuthenticatedRoute>
                            }
                        />
                        <Route path="*" element={<ErrorComponent />} />
                    </Routes>
                    <FooterComponent />
                </Router>
            </AuthProvider>
        </div>
    );
}

export default TodoApp;
