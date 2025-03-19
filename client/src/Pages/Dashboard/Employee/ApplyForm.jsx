import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";

const URL = import.meta.env.VITE_APP_URL;

export const ApplyForm = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const [resume, setResume] = useState(null);

  const fetchJob = async () => {
    try {
      const response = await fetch(`${URL}/job/${id}`, { method: "GET",credentials: "include" });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Something went wrong");
      setJob(data.job);
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message, { duration: 5000 });
    }
  };

  useEffect(() => {
    fetchJob();
  }, [id]);

  const handleFileChange = (event) => {
    if (event.target.files.length) {
      setResume(event.target.files[0]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!resume) {
      toast.error("Please upload your resume.");
      return;
    }

    if (resume.size > 5 * 1024 * 1024) {
      toast.error("File size should not exceed 5MB.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);

    try {
      const response = await fetch(`${URL}/job/apply/${id}`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Something went wrong");

      toast.success("Application submitted successfully", { duration: 5000 });
      setResume(null);
    } catch (error) {
      toast.error(error.message, { duration: 5000 });
    }
  };

  return (
    <div className="flex p-6 gap-6">
      {/* Job Details Card */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-teal-900">{job?.jobTitle || "Loading..."}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-gray-700"><strong>📍 Location:</strong> {job?.jobLocation || "N/A"}</p>
          <p className="text-gray-700"><strong>💼 Type:</strong> {job?.jobType || "N/A"}</p>
          <p className="text-gray-700"><strong>💰 Salary:</strong> {job?.jobSalary || "N/A"}</p>
          <p className="text-gray-700 whitespace-pre-wrap"><strong className="block">About the Job:</strong>{job?.jobDescription || "N/A"}</p>
        </CardContent>
      </Card>
  
      {/* Resume Upload & Apply Card */}
      <Card className="w-1/2 border-none">
        <CardHeader>
          <CardTitle className="text-teal-900">Apply for Job</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Upload Resume (PDF - up to 5MB)</Label>
              <Input type="file" accept=".pdf" onChange={handleFileChange} />
              {resume && <p className="text-sm text-gray-600 mt-1">Selected file: {resume.name}</p>}
            </div>
            <Button type="submit" className="w-full">
              Apply
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
  
};
