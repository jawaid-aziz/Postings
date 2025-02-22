import { useAuth } from "../Context/AuthContext";

export const isAuthenticated = () => {
    return useAuth();
};
