import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const URL = import.meta.env.VITE_APP_URL;

export const AuthRedirect = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        fetch(`${URL}/auth/validate`, {
            method: "GET",
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => setIsAuthenticated(data.authenticated))
            .catch(() => setIsAuthenticated(false));
    }, []);

    if (isAuthenticated === null) return <p>Loading...</p>;
    return isAuthenticated ? <Navigate to="/" /> : children;
};
