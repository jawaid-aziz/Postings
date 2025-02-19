import { useState } from "react";
const URL = import.meta.env.VITE_APP_URL;

export const SignUp = () => {

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");

const handleSignUp = async (e) => {
    
    e.preventDefault();

    try{
        const response = await fetch(`${URL}/auth/sign-up`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
             }),
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

        const data = await response.json();
        console.log(data);

        setFirstName(""), setLastName(""), setEmail(""), setPassword("");
    }
    catch (error) {
        console.error("Signup Error:", error);
    }
}

    return (
        <div className="flex items-center justify-center bg-gray-100">
            <h1>Sign Up</h1>
            <form onSubmit={handleSignUp}>
                <label htmlFor="firstName">
                    First Name
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </label>
                <label htmlFor="lastName">
                    Last Name
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </label>
                <label htmlFor="email">
                    Email
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label htmlFor="password">
                    Password
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>

                <button type="submit">
                    Sign Up
                </button>
            </form>
        </div>
    )
}