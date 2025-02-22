import { Home } from "./Pages/Landing/Home";
import { PostJobs } from "./Pages/Dashboard/PostJobs";
import { GetJobs } from "./Pages/Dashboard/GetJobs";
import { Authorization } from "./Pages/Auth/Authorization";
import { isAuthenticated } from "./Utils/isAuthenticated";

export const AllRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/employer",
    element: isAuthenticated ? <PostJobs /> : <Authorization />,
  },
  {
    path: "/employee",
    element: isAuthenticated ? <GetJobs /> : <Authorization />,
  },
  {
    path: "/auth",
    element: isAuthenticated ? <Home /> : <Authorization />,
  },
];
