import { createContext, useContext, useEffect, useState } from "react";

const URL = import.meta.env.VITE_APP_URL;

const AuthContext = createContext();


export const AuthProvider = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null for loading state

  const checkAuthStatus = async () => {
    try {
      const res = await fetch(`${URL}/auth/validate`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();
      console.log("Auth Status Response:", data);

      setIsAuthenticated(data); // ✅ Update React state immediately
      localStorage.setItem("token", JSON.stringify(data));

    } catch (error) {
      console.error("Auth check failed:", error);
      setIsAuthenticated(false);
      localStorage.setItem("token", false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);