const jwt = require('jsonwebtoken');
require("dotenv").config();

function setUser(user) {
    return jwt.sign({userId: user._id}, process.env.JWT_SECRET, { expiresIn: '1d' });
}

function getUser(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
    setUser,
    getUser,
};