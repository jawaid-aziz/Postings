import { Home } from "./Pages/Landing/Home";
import { PostJobs } from "./Pages/Dashboard/PostJobs";
import { GetJobs } from "./Pages/Dashboard/GetJobs";
import { Authorization } from "./Pages/Auth/Authorization";
import useAuth from "./Context/AuthContext";

// Wrapper component to handle authentication
const ProtectedRoute = ({ element: Element, redirectTo: RedirectTo }) => {
    const isAuthenticated = useAuth(); // Use the useAuth hook here
  
    if (!isAuthenticated) {
      return <RedirectTo />; // Redirect to the authorization page if not authenticated
    }
  
    return <Element />; // Render the protected component if authenticated
  };

export const AllRoutes = 
[

  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/employer",
    element: <ProtectedRoute element={PostJobs} redirectTo={Authorization} />,
  },
  {
    path: "/employee",
    element: <ProtectedRoute element={GetJobs} redirectTo={Authorization} />,
  },
  {
    path: "/auth",
    element: <ProtectedRoute element={Home} redirectTo={Authorization} />,
  },
];
