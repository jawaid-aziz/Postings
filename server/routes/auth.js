const express = require('express');
const { handleSignUp } = require('../controllers/auth');

const router = express.Router();

router.post('/sign-up', handleSignUp);

module.exports = router;