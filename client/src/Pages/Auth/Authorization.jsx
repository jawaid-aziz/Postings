import { useState } from "react";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";

export const Authorization = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {isSignIn ? "Sign In" : "Create an Account"}
          </h2>
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            onClick={() => setIsSignIn(!isSignIn)}
          >
            {isSignIn ? "Switch to Sign Up" : "Switch to Sign In"}
          </button>
        </div>

        {isSignIn ? <SignIn /> : <SignUp />}
      </div>
    </div>
  );
};
