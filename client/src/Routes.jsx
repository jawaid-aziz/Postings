import { SignUp } from "./Pages/Auth/SignUp";
import { SignIn } from "./Pages/Auth/SignIn";
import { Home } from "./Pages/Landing/Home";
import { PostJobs } from "./Pages/Dashboard/PostJobs";
import { GetJobs } from "./Pages/Dashboard/GetJobs";
import { ProtectedRoute } from "./Utils/ProtectedRoute";

export const AllRoutes =
[
    {
        path: "/sign-up",
        element: <SignUp />
    },
    {
        path: "/sign-in",
        element: <SignIn />
    },
    {
        path: "/",
        element: <ProtectedRoute />,
        children: [
            {
                path: "/home",
                element: <Home />
            },
        ]
    },
    {
        path: "/employer",
        element: <PostJobs />
    },
    {
        path: "/employee",
        element: <GetJobs />
    },
]