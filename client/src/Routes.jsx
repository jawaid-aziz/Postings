import { Navigate } from "react-router-dom";
import { Home } from "./Pages/Landing/Home";
import { PostJobs } from "./Pages/Dashboard/Employer/PostJobs";
import { GetJobs } from "./Pages/Dashboard/Employee/GetJobs";
import { Authorization } from "./Pages/Auth/Authorization";
import { ApplyForm } from "./Pages/Dashboard/Employee/ApplyForm";
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
    path: "employee/apply/:id",
    element: <ApplyForm />,
  },
  {
    path: "/auth",
    element: isTokenValid() ? <Navigate to="/" /> : <Authorization />,
  },
];
