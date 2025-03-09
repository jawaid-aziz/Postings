import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const URL = import.meta.env.VITE_APP_URL;

export const Applications = () => {
  const { id } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch(`${URL}/job/allApplications/${id}`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setApplications(data.applications);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [id]);

  const handleDownloadResume = (resume) => async () => {
    try {
      const response = await fetch(`${URL}/job/download/${resume}`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Error downloading resume");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);

      // Implement file download logic here
    } catch (error) {
      console.error("Error downloading resume:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-6 p-6">
      <h2 className="text-3xl font-bold text-teal-900 mb-6">Job Applications</h2>

      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-12 w-full rounded-lg" />
          <Skeleton className="h-12 w-full rounded-lg" />
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
      ) : applications.length === 0 ? (
        <p className="text-teal-700">No applications found.</p>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <Card key={app._id}>
              <CardHeader>
                <CardTitle className="text-teal-800">{app.submittedBy}</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-between items-center">
                <Button onClick={handleDownloadResume(app.resume)} variant="outline">
                  View Resume
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
