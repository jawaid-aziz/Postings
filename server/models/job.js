const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: true,
        trim: true,
    },
    jobDescription: {
        type: String,
        required: true,
        trim: true,
    },
    jobLocation: {
        type: String,
        required: true,
    },
    jobType: {
        type: String,
        required: true,
    },
    jobSalary: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
},
    {
        timestamps: true, // 🔹 Adds createdAt and updatedAt automatically
    }
)

const Job = mongoose.model("job", jobSchema);

module.exports ={
    Job
}