const { Job } = require('../models/job');

async function postJob(req, res) {
  try {
    const { jobTitle, jobDescription, jobLocation, jobType, jobSalary } = req.body;

    const newJob = await Job.create({
      jobTitle,
      jobDescription,
      jobLocation,
      jobType,
      jobSalary,
      createdBy: req.user.userId,
    });

    res.status(201).json({ message: "Job posted successfully", job: newJob });
  } catch (error) {
    console.error("Job Post Error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
}

async function getPostedJobs(req, res) {
  try {
    const jobs = await Job.find({ createdBy: req.user.userId });

    res.status(200).json({ jobs });
  } catch (error) {
    console.error("Get Jobs Error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
}

async function getJobs(req, res) {
    try {
        const jobs = await Job.find();
    
        res.status(200).json({ jobs });
    } catch (error) {
        console.error("Get Jobs Error:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
}

module.exports = { 
    postJob,
    getPostedJobs,
    getJobs,
};
