const express = require('express');
const { postJob, getPostedJobs, getJobs } = require('../controllers/job')
const authMiddlware = require('../middlewares/auth');

const router = express.Router();

router.post('/post', authMiddlware, postJob);
router.get('/posted-jobs', authMiddlware, getPostedJobs );
router.get('/all', authMiddlware, getJobs );

module.exports = router;