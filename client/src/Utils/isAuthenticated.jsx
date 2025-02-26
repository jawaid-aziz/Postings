// import { useEffect } from "react";

// const URL = import.meta.env.VITE_APP_URL;

// export const isAuthenticated = () => {
    
//     const checkAuthStatus = async () => {
//         try {
//           const res = await fetch(`${URL}/auth/validate`, {
//             method: "GET",
//             credentials: "include", // To include cookies
//           });
    
//           const data = await res.json();
//           console.log("Auth Status Response:", data);
//           localStorage.setItem("token", data.authenticated);
//         } catch (error) {
//           console.error("Auth check failed:", error);
//           localStorage.setItem("token", false);
//         }
//       };
    
//       useEffect(() => {
//         checkAuthStatus();
//       }, []);

// };
