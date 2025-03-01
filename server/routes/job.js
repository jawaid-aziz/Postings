const express = require('express');
const { postJob, getPostedJobs, getJobs, deleteJob, applyJob, getAllApplications, downloadResume } = require('../controllers/job');
const authMiddleware = require('../middlewares/auth');
const uploadMiddleware = require('../middlewares/upload');

const router = express.Router();

// Employer
router.post('/post', authMiddleware, postJob);
router.get('/posted-jobs', authMiddleware, getPostedJobs );
router.delete('/delete/:id', authMiddleware, deleteJob );
router.get('/allApplications/:id', authMiddleware, getAllApplications );
router.get("/download/:resume", authMiddleware, downloadResume)

// Employee
router.get('/all', authMiddleware, getJobs );
router.post('/apply/:id', authMiddleware, uploadMiddleware, applyJob );

module.exports = router;