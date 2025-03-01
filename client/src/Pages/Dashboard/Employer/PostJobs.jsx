import { useEffect, useState } from "react";
const URL = import.meta.env.VITE_APP_URL;

export const PostJobs = () => {
  const [jobs, setJobs] = useState([]);

  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
    jobLocation: "",
    jobType: "",
    jobSalary: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getPostedJobs = async () => {
    try {
      const response = await fetch(`${URL}/job/posted-jobs`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Something went wrong");

      setJobs(data.jobs);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getPostedJobs();
  }, []);

  const handlePostJob = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${URL}/job/post`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Something went wrong");

      alert("Job posted successfully!");
      setFormData({
        jobTitle: "",
        jobDescription: "",
        jobLocation: "",
        jobType: "",
        jobSalary: "",
      });
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      const response = await fetch(`${URL}/job/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error(data.error || "Something went wrong");

      const data = await response.json();

      alert("Job deleted successfully!");
    } catch (error) {
      console.log("Error:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1>Employer Portal</h1>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Post a Job</h2>

        <form onSubmit={handlePostJob} className="space-y-4">
          <input
            type="text"
            name="jobTitle"
            placeholder="Job Title"
            value={formData.jobTitle}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
          <textarea
            name="jobDescription"
            placeholder="Job Description"
            value={formData.jobDescription}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
          <input
            type="text"
            name="jobLocation"
            placeholder="Location"
            value={formData.jobLocation}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select Job Type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Remote">Remote</option>
            <option value="Contract">Contract</option>
          </select>
          <input
            type="number"
            name="jobSalary"
            placeholder="Salary"
            value={formData.jobSalary}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md"
          >
            {loading ? "Posting..." : "Post Job"}
          </button>
        </form>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Your Posted Jobs</h2>

        <div className="space-y-4">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div
                key={job._id}
                className="p-4 border rounded-md shadow relative"
              >
                <h3 className="text-xl font-semibold">{job.jobTitle}</h3>
                <p className="text-gray-600">{job.jobDescription}</p>
                <p className="text-sm">
                  <strong>Location:</strong> {job.jobLocation}
                </p>
                <p className="text-sm">
                  <strong>Type:</strong> {job.jobType}
                </p>
                <p className="text-sm">
                  <strong>Salary:</strong> {job.jobSalary}
                </p>

                {/* Buttons Container */}
                <div className="mt-3 flex space-x-2">
                  {/* View Applications Button */}
                  <button
                    onClick={() => window.location.href = `/employer/applications/${job._id}`}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
                  >
                    View Applications
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteJob(job._id)}
                    className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No jobs posted yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};
