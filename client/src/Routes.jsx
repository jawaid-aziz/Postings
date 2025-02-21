import { SignUp } from "./Pages/Auth/SignUp";
import { SignIn } from "./Pages/Auth/SignIn";
import { Home } from "./Pages/Landing/Home";
import { PostJobs } from "./Pages/Dashboard/PostJobs";
import { GetJobs } from "./Pages/Dashboard/GetJobs";
import { ProtectedRoute } from "./Utils/ProtectedRoute";
import { AuthRedirect } from "./Utils/AuthRedirect";

export const AllRoutes =
[
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/sign-up",
        element: <AuthRedirect><SignUp /></AuthRedirect>
    },
    {
        path: "/sign-in",
        element: <AuthRedirect><SignIn /></AuthRedirect>
    },
    {
        path: "/employer",
        element: <ProtectedRoute><PostJobs /></ProtectedRoute>
    },
    {
        path: "/employee",
        element: <ProtectedRoute><GetJobs /></ProtectedRoute>
    }
]