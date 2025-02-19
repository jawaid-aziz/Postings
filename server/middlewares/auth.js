const jwt = require('jsonwebtoken');
require("dotenv").config();

function authMiddlware(req, res, next) {
    const token = req.cookies?.token; // 🔹 Extract token from cookie

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.userId;
        next();
    } catch (error) {
        res.status(403).json({ message: "Unauthorized: Invalid token" });
    }
}

module.exports = authMiddlware;