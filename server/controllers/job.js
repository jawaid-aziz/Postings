const path = require("path");
const fs = require("fs");
const { Job } = require('../models/job');
const JobApplication = require('../models/JobApplication');
const User = require("../models/user");

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

    const { resume } = req.params; // Get the filename from URL params

    const filePath = path.join(dirname, "uploads", resume); // Resume path

    // Set headers to force download with correct filename
    res.setHeader("Content-Disposition", `attachment; filename="${resume}"`);
    res.setHeader("Content-Type", "application/pdf");

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

async function getTheJob(req, res) {
  try{
    const job = await Job.findById(req.params.id);
    res.status(200).json({ job });
  }catch(error){
    console.error("Get Job Error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
}

async function applyJob(req, res) {
  try {
    const id = req.params.id;
    console.log(req.file);
    // Ensure a file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: "Resume file is required" });
    } 

    const existUser = await JobApplication.findOne({ jobId: id, userId: req.user.userId });
    if (existUser) {
      fs.unlinkSync(path.join(dirname, "uploads", req.file.filename));
      console.log("You have already applied for this job");
      return res.status(400).json({ error: "You have already applied for this job" });
    }

    const user = await User.findById(req.user.userId);
    // Save application to database
    const newApplication = new JobApplication({
      jobId: id,
      resume: req.file.filename, // Save file path
      userId: user._id,
      submittedBy: user.firstName + " " + user.lastName
    });

    await newApplication.save();

    res.json({
      message: "Job application submitted successfully",
      application: newApplication
    });
  } catch (error) {
    console.error("Job Application Error:", error);

    // ❌ If any error occurs, delete uploaded file
    if (req.file) {
      fs.unlinkSync(path.join(dirname, "uploads", req.file.filename));
    }

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
  getTheJob,
};
