// create a context -> put some state in context -> share the created context with other components

import { createContext, useContext, useState } from "react";
import { executeJWTAuthService } from "../api/AuthenticationAPIService";
import { apiClient } from "../api/APIClient";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [username, setUsername] = useState(null);
    const [token, setToken] = useState(null);

    const login = async (username, password) => {
        try {
            const res = await executeJWTAuthService(username, password);
            const jwtToken = "Bearer " + res.data.token;

            if (res.status === 200) {
                setUsername(username);
                setAuthenticated(true);
                setToken(jwtToken);

                apiClient.interceptors.request.use((config) => {
                    config.headers.Authorization = jwtToken;
                    return config;
                });

                return true;
            } else {
                logout();
                return false;
            }
        } catch (error) {
            logout();
            return false;
        }
    };

    // const login = async (username, password) => {
    //     const basicAuthToken =
    //         "Basic " + window.btoa(username + ":" + password);

    //     try {
    //         const res = await executeBasicAuthService(basicAuthToken);

    //         if (res.status === 200) {
    //             setUsername(username);
    //             setAuthenticated(true);
    //             setToken(basicAuthToken);

    //             apiClient.interceptors.request.use((config) => {
    //                 config.headers.Authorization = basicAuthToken;
    //                 return config;
    //             });

    //             return true;
    //         } else {
    //             logout();
    //             return false;
    //         }
    //     } catch (error) {
    //         logout();
    //         return false;
    //     }
    // };

    const logout = () => {
        setAuthenticated(false);
        setToken(null);
        setUsername(null);
    };

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, login, logout, username, token }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
