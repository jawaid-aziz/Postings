import { useState } from "react";
const URL = import.meta.env.VITE_APP_URL;

export const PostJobs = () => {

const [formData, setFormData] = useState({
    jobTitle: '',
    jobDescription: '',
    jobLocation: '',
    jobType: '',
    jobSalary: '',
})

const [loading, setLoading] = useState(false);

const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
}

const handlePostJob = async (e) => {
    e.preventDefault();
    setLoading(true);

    try{
        const response = await fetch(`${URL}/job/post`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ...formData
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


    }catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }  
}

return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
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
  );
}