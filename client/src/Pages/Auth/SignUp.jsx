import { useState } from "react";

export const SignUp = () => {

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");

const handleSignUp = () => {
    

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