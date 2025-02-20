const express = require('express');
const { postJob } = require('../controllers/job')
const authMiddlware = require('../middlewares/auth');

const router = express.Router();

router.post('/post', authMiddlware, postJob);
router.get('/posted-jobs', );
router.get('/get', );

module.exports = router;