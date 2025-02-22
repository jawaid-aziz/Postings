import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const URL = import.meta.env.VITE_APP_URL;

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Default to false
  
  // Validate authentication when the app loads
  const checkAuthStatus = async () => {
    try {
      const res = await fetch(`${URL}/auth/validate`, {
        method: "GET",
        credentials: "include", // To include cookies
      });

      const data = await res.json();
      console.log("Auth Status Response:", data);
      setIsAuthenticated(data.authenticated || false); // Ensure it's always a boolean
    } catch (error) {
      console.error("Auth check failed:", error);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={isAuthenticated}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to get authentication state
export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
