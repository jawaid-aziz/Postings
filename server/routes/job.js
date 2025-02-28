const express = require('express');
const { postJob, getPostedJobs, getJobs, deleteJob, applyJob } = require('../controllers/job');
const authMiddlware = require('../middlewares/auth');
const uploadMiddleware = require('../middlewares/upload');

const router = express.Router();

// Employer
router.post('/post', authMiddlware, postJob);
router.get('/posted-jobs', authMiddlware, getPostedJobs );
router.delete('/delete/:id', authMiddlware, deleteJob );

// Employee
router.get('/all', authMiddlware, getJobs );
router.post('/apply/:id', authMiddlware, uploadMiddleware, applyJob );

module.exports = router;