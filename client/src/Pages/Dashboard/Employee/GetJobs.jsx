import { useState, useEffect } from "react";

const URL = import.meta.env.VITE_APP_URL;

export const GetJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const getJobs = async () => {
    try {
      const response = await fetch(`${URL}/job/all`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Something went wrong");

      setJobs(data.jobs);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Explore Job Opportunities
        </h1>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array(6)
              .fill()
              .map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse bg-white p-4 rounded-lg shadow-md"
                >
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                </div>
              ))}
          </div>
        ) : jobs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold text-blue-600 mb-2">
                  {job.jobTitle}
                </h3>
                <p className="text-gray-700">{job.jobDescription}</p>
                <div className="mt-3 text-sm text-gray-600">
                  <p>
                    <strong>📍 Location:</strong> {job.jobLocation}
                  </p>
                  <p>
                    <strong>💼 Type:</strong> {job.jobType}
                  </p>
                  <p>
                    <strong>💰 Salary:</strong> {job.jobSalary}
                  </p>
                </div>
                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700"
                  onClick={() => window.location.href = `/employee/apply/${job._id}`}
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg mt-6">
            No jobs posted yet.
          </p>
        )}
      </div>
    </div>
  );
};
