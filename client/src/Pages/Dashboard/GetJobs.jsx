import { useState, useEffect } from "react";
const URL = import.meta.env.VITE_APP_URL;

export const GetJobs = () => {
  const [jobs, setJobs] = useState([]);

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
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <div>
      <h1>Employee Portal</h1>

      <div>
        <h2>All Jobs</h2>
        <div className="space-y-4">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div key={job._id} className="p-4 border rounded-md shadow">
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
              </div>
            ))
          ) : (
            <p>No jobs posted yet.</p>
          )}
        </div>
      </div>

        {jobs.map((job) => ( <div key={job._id} className="p-4 border rounded-md shadow">
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
        </div> ) ) }

    </div>
  );
};
