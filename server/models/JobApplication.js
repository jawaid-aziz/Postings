const mongoose = require("mongoose");

const JobApplicationSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",  // Reference to the Job model
        required: true
    },
    resume: {
        type: String, // Stores file path like "uploads/resume-123.pdf"
        required: true
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
});

// Create Model
const JobApplication = mongoose.model("jobApplication", JobApplicationSchema);

module.exports = JobApplication;
