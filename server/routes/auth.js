const express = require('express');
const { handleSignUp, handleSignIn } = require('../controllers/auth');
const authMiddlware= require('../middlewares/auth');

const router = express.Router();

router.post('/sign-up', handleSignUp);
router.post('/sign-in', handleSignIn);
router.get('/validate', authMiddlware, (req, res) => {
    res.json({ authenticated: true });
});

module.exports = router;