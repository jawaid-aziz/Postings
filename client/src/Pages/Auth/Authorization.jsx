import { useState } from "react";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Authorization = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md p-6">
        <CardHeader className="flex flex-col items-center">
          <CardTitle className="text-center text-2xl font-bold">
            {isSignIn ? "Sign In" : "Create an Account"}
          </CardTitle>
          <Button
            variant="outline"
            className="mt-3 w-full"
            onClick={() => setIsSignIn(!isSignIn)}
          >
            {isSignIn ? "Switch to Sign Up" : "Switch to Sign In"}
          </Button>
        </CardHeader>

        <CardContent>{isSignIn ? <SignIn /> : <SignUp />}</CardContent>
      </Card>
    </div>
  );
};
