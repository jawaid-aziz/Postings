import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";

const URL = import.meta.env.VITE_APP_URL;

export const PostedJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
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

    getPostedJobs();
  }, []);

  const handleDeleteJob = async (id) => {
    try {
      const response = await fetch(`${URL}/job/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Something went wrong");

      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
      alert("Job deleted successfully!");
    } catch (error) {
      console.log("Error:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-6 p-6">
      <h2 className="text-3xl font-bold text-teal-900 mb-6">Your Posted Jobs</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <Card key={job._id} className="flex flex-col h-full">
              <CardHeader>
                <CardTitle className="text-teal-800">{job.jobTitle}</CardTitle>
                <CardDescription>{job.jobDescription}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow">
                <p className="text-gray-700"><strong>Location:</strong> {job.jobLocation}</p>
                <p className="text-gray-700"><strong>Type:</strong> {job.jobType}</p>
                <p className="text-gray-700"><strong>Salary:</strong> {job.jobSalary}</p>

                {/* Forces buttons to the bottom */}
                <div className="mt-auto pt-4 flex space-x-3">
                  <Button variant="outline" onClick={() => (window.location.href = `/employer/applications/${job._id}`)}>
                    View Applications
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">Delete</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <h2 className="text-lg font-bold">Are you sure?</h2>
                      <p>This action cannot be undone. This will permanently delete the job.</p>
                      <div className="flex justify-end space-x-2">
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteJob(job._id)}>Delete</AlertDialogAction>
                      </div>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-teal-700">No jobs posted yet.</p>
        )}
      </div>
    </div>
  );
};
