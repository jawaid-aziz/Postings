import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const URL = import.meta.env.VITE_APP_URL;

export const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        fetch(`${URL}/auth/validate`, {
            method: "GET",
            credentials: "include", // 🔹 Required for cookies
        })
            .then((res) => res.json())
            .then((data) => setIsAuthenticated(data.authenticated))
            .catch(() => setIsAuthenticated(false));
    }, []);

    if (isAuthenticated === null) return <p>Loading...</p>;
    return isAuthenticated ? children : <Navigate to="/sign-in" />;
};
