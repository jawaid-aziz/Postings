const Job = require('../models/job');

async function postJob(req, res) {
  try {
    const { jobTitle, jobDescription, jobLocation, jobType, jobSalary } = req.body;
    const userId = req.user?.id; // Get user ID from authenticated request

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    }

    // Create a new job
    const newJob = new Job({
      jobTitle,
      jobDescription,
      jobLocation,
      jobType,
      jobSalary,
      createdBy: userId,
    });

    // Save job to database
    await newJob.save();

    res.status(201).json({ message: "Job posted successfully", job: newJob });
  } catch (error) {
    console.error("Job Post Error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
}

module.exports = { postJob };
