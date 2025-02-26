import { Navigate } from "react-router-dom";
import { Home } from "./Pages/Landing/Home";
import { PostJobs } from "./Pages/Dashboard/PostJobs";
import { GetJobs } from "./Pages/Dashboard/GetJobs";
import { Authorization } from "./Pages/Auth/Authorization";
import { isTokenValid } from "./Utils/isTokenValid";

export const AllRoutes = 
[

  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/employer",
    element: isTokenValid() ? <PostJobs /> : <Navigate to="/auth"/>,
  },
  {
    path: "/employee",
    element: isTokenValid() ? <GetJobs /> : <Navigate to="/auth" />,
  },
  {
    path: "/auth",
    element: isTokenValid() ? <Navigate to="/" /> : <Authorization />,
  },
];
