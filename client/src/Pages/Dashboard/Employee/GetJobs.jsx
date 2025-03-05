import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";

const URL = import.meta.env.VITE_APP_URL;

export const GetJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${URL}/job/all`, {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to fetch jobs.");

        setJobs(data.jobs);
      } catch (error) {
        toast.error(error.message);
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
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
                <Card key={index} className="animate-pulse">
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4 bg-gray-300 rounded" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full bg-gray-300 rounded mb-2" />
                    <Skeleton className="h-4 w-2/3 bg-gray-300 rounded" />
                  </CardContent>
                </Card>
              ))}
          </div>
        ) : jobs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <Card key={job._id} className="shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-blue-600">{job.jobTitle}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{job.jobDescription}</p>
                  <div className="mt-3 text-sm text-gray-600">
                    <p><strong>📍 Location:</strong> {job.jobLocation}</p>
                    <p><strong>💼 Type:</strong> {job.jobType}</p>
                    <p><strong>💰 Salary:</strong> {job.jobSalary}</p>
                  </div>
                  <Button
                    className="mt-4 w-full"
                    onClick={() => navigate(`/employee/apply/${job._id}`)}
                  >
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg mt-6">No jobs posted yet.</p>
        )}
      </div>
    </div>
  );
};
