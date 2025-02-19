import { SignUp } from "./Pages/Auth/SignUp";
import { SignIn } from "./Pages/Auth/SignIn";
import { Home } from "./Pages/Landing/Home";
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
        path: "/home",
        element: <ProtectedRoute>   <Home />    </ProtectedRoute>
    }
]