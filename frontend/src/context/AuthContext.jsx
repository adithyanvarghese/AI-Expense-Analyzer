import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem("access")
    );

    const login = (tokens, username) => {

        localStorage.setItem("access", tokens.access);

        localStorage.setItem("refresh", tokens.refresh);

        localStorage.setItem("username", username);

        setIsAuthenticated(true);

    };

    const logout = () => {

        localStorage.clear();

        setIsAuthenticated(false);
    };

    return (

        <AuthContext.Provider
            value={{
                isAuthenticated,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>

    );
};