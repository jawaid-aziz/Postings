const URL = import.meta.env.VITE_APP_URL;
import { useState } from "react";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${URL}/auth/sign-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData.message);
        return;
      }

      const data = await response.json();
      console.log("Login Success:", data);
      setEmail(""), setPassword("");
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <>
      <h1>Sign In</h1>
      <form onSubmit={handleSignIn}>
        <label htmlFor="email">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Sign In</button>
      </form>
    </>
  );
};
