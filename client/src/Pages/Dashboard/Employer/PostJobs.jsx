import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const URL = import.meta.env.VITE_APP_URL;

export const PostJobs = () => {
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
        body: JSON.stringify(formData),
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

  return (
    <div className="max-w-lg mx-auto mt-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-teal-900">Post a Job</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePostJob} className="space-y-4">
            <div>
              <Label>Job Title</Label>
              <Input
                type="text"
                name="jobTitle"
                placeholder="Enter job title"
                value={formData.jobTitle}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>Job Description</Label>
              <Textarea
                name="jobDescription"
                placeholder="Enter job description"
                value={formData.jobDescription}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="jobLocation"
                placeholder="Enter location"
                value={formData.jobLocation}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>Job Type</Label>
              <Select onValueChange={(value) => setFormData({ ...formData, jobType: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Salary</Label>
              <Input
                type="number"
                name="jobSalary"
                placeholder="Enter salary"
                value={formData.jobSalary}
                onChange={handleChange}
                required
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Posting..." : "Post Job"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
