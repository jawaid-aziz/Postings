import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import toast from "react-hot-toast";

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

      toast.success("Job posted successfully", { duration: 5000 });
      setFormData({
        jobTitle: "",
        jobDescription: "",
        jobLocation: "",
        jobType: "",
        jobSalary: "",
      });
    } catch (err) {
      console.log(err.message);
      toast.error(err.message, { duration: 5000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-6">
      <Card className="w-full p-6">
        <CardHeader>
          <CardTitle className="text-teal-900 text-2xl">Post a Job</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePostJob} className="space-y-4">
            {/* Job Title & Location in one row */}
            <div className="grid grid-cols-2 gap-4">
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
            </div>

            {/* Job Description in full row */}
            <div>
              <Label>Job Description</Label>
              <Textarea
                name="jobDescription"
                placeholder="Enter job description"
                value={formData.jobDescription}
                onChange={handleChange}
                required
                className="h-32"
              />
            </div>

            {/* Job Type & Salary in one row */}
            <div className="grid grid-cols-2 gap-4">
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
                <Label>Salary/month</Label>
                <Input
                  type="text"
                  name="jobSalary"
                  placeholder="Enter salary"
                  value={formData.jobSalary}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full text-lg">
              {loading ? "Posting..." : "Post Job"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
