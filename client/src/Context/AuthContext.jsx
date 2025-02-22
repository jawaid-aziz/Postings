import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const URL = import.meta.env.VITE_APP_URL;

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  
  // Validate authentication when the app loads
  const checkAuthStatus = async () => {
    try {
      const res = await fetch(`${URL}/auth/validate`, {
        method: "GET",
        credentials: "include", // To include cookies
      });

      const data = await res.json();
      setIsAuthenticated(data.authenticated);
    } catch (error) {
      setIsAuthenticated(false);
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

// Custom hook to use authentication state
export const useAuth = () => useContext(AuthContext);
