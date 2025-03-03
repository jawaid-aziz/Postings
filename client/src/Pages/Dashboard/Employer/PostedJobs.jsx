import { useEffect, useState } from "react";
const URL = import.meta.env.VITE_APP_URL;

export const PostedJobs = () => {
  const [jobs, setJobs] = useState([]);

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
                  onClick={() =>
                    (window.location.href = `/employer/applications/${job._id}`)
                  }
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
  );
};
