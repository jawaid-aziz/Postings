import { SignUp } from "./Pages/Auth/SignUp";
import { SignIn } from "./Pages/Auth/SignIn";
export const AllRoutes =
[
    {
        path: "/sign-up",
        element: <SignUp />
    },
    {
        path: "/sign-in",
        element: <SignIn />
    }
]