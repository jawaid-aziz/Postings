import { useAuth } from "../Context/AuthContext";

export const isAuthenticated = async () => {

    const isAuthenticated = useAuth();

    return isAuthenticated;

}