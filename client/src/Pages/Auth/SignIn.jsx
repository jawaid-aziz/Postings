export const SignIn = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = () => {}

    return(
        <>
            <h1>Sign In</h1>
            <form onSubmit={handleSignIn}>
                <label htmlFor="email">
                    Email
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </label>
                <label htmlFor="password">
                    Password
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </label>
                <button type="submit">
                    Sign In
                </button>
            </form>
        </>
    )
}