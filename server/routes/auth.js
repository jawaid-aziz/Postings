const express = require('express');
const { handleSignUp, handleSignIn } = require('../controllers/auth');
const authMiddleware= require('../middlewares/auth');

const router = express.Router();

router.post('/sign-up', handleSignUp);
router.post('/sign-in', handleSignIn);
router.get('/validate', authMiddleware, (req, res) => {
    res.json(true);
});

module.exports = router;