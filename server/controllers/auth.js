const User = require('../models/user');

async function handleSignUp(req, res) {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        // Create new user
        const newUser = await User.create({ firstName, lastName, email, password });

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = {
    handleSignUp,
}