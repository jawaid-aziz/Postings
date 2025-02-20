const jwt = require('jsonwebtoken');
const getUser = require('../utils/token');
require("dotenv").config();

function authMiddlware(req, res, next) {
    const token = req.cookies?.token; // 🔹 Extract token from cookie

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ Decode token
        req.user = decoded; // ✅ Attach user ID from token
        next();
    } catch (error) {
        res.status(403).json({ message: "Unauthorized: Invalid token" });
    }
}

module.exports = authMiddlware;