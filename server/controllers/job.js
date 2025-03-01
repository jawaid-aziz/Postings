const path = require("path");
const fileURLToPath = require("url");
const { Job } = require('../models/job');
const JobApplication = require('../models/JobApplication');

const dirname = path.resolve();

// Employer

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

async function getAllApplications(req, res) {
  try {
    const applications = await JobApplication.find({ jobId: req.params.id });
    res.status(200).json({ applications });
  } catch (error) {
    console.log("Get All Applications Error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
}

async function downloadResume(req, res) {
  try {
    console.log("Req params:", req.params);
    console.log("Req body:", req.body);

    const { resume } = req.params; // Get the filename from URL params

    console.log("dirname:", dirname);

    const filePath = path.join(dirname, "uploads", resume); // Resume path
    console.log("filepath:", filePath);

    res.sendFile(filePath, (err) => {
      if (err) {
        console.error("Error downloading file:", err);
        res.status(500).json({ message: "Error downloading file" });
      }
    });
  } catch (error) {
    console.error("Download error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

async function deleteJob(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Job ID is required" });
    }

    const deletedJob = await Job.findByIdAndDelete(id); // Delete job from DB

    if (!deletedJob) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json({ message: "Job deleted successfully" });

  } catch (error) {
    console.error("Delete Job Error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
}

// Employee

async function getJobs(req, res) {
  try {
    const jobs = await Job.find();

    res.status(200).json({ jobs });
  } catch (error) {
    console.error("Get Jobs Error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
}

async function applyJob(req, res) {
  try {
    const id = req.params.id;
    // Ensure a file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: "Resume file is required" });
    }

    // Save application to database
    const newApplication = new JobApplication({
      jobId: id,
      resume: req.file.filename // Save file path
    });

    await newApplication.save();

    res.json({
      message: "Job application submitted successfully",
      application: newApplication
    });
  } catch (error) {
    console.error("Job Application Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  postJob,
  getPostedJobs,
  getJobs,
  deleteJob,
  applyJob,
  getAllApplications,
  downloadResume,
};
