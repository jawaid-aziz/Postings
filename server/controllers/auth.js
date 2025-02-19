const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { setUser } = require('../utils/token');

async function handleSignUp(req, res) {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await User.create({ firstName, lastName, email, password: hashedPassword });

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Server error" });
    }
}

async function handleSignIn(req, res) {
    try{
        const { email, password } = req.body;

        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message: "User does not exist"});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message: "Enter correct password"});

        const token = setUser(user);
        res.cookie("token", token, {httpOnly: true});

        res.status(200).json({message: "User signed in successfully"});

    }catch(error){
        console.error("Signin Error:", error);
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = {
    handleSignUp,
    handleSignIn,
}