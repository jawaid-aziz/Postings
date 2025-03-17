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
        console.log(data.jobs);
        setJobs(data.jobs);
      } catch (error) {
        toast.error(error.message, { duration: 5000 });
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const limitText = (text, wordLimit) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-teal-900 mb-6 text-center">
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
                  <CardContent className="flex flex-col flex-grow">
                    <Skeleton className="h-4 w-full bg-gray-300 rounded mb-2" />
                    <Skeleton className="h-4 w-2/3 bg-gray-300 rounded" />
                  </CardContent>
                </Card>
              ))}
          </div>
        ) : jobs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <Card key={job._id} className="flex flex-col h-full shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-teal-800">{job.jobTitle}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow">
                  <p className="text-gray-700 whitespace-pre-wrap">{limitText(job.jobDescription, 20)}</p>
                  <div className="mt-3 text-sm text-gray-600 mb-4">
                    <p><strong>📍 Location:</strong> {job.jobLocation}</p>
                    <p><strong>💼 Type:</strong> {job.jobType}</p>
                    <p><strong>💰 Salary:</strong> {job.jobSalary}</p>
                  </div>
                  
                  {/* Forces the Apply button to stay at the bottom */}
                  <Button 
                    className="mt-auto w-full" 
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
