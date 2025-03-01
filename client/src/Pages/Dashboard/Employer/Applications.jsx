import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
                console.log(data.applications);
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

            // const blob = await response.blob();
            // const url = window.URL.createObjectURL(blob);
            // const a = document.createElement("a");
            // a.href = url;
            // a.download = resume;
            // a.click();
        } catch (error) {
            console.error("Error downloading resume:", error);
        }
    }

    return (
        <div className="max-w-4xl mx-auto mt-6 p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Job Applications</h2>
            
            {loading ? (
                <p className="text-gray-600">Loading...</p>
            ) : applications.length === 0 ? (
                <p className="text-gray-600">No applications found.</p>
            ) : (
                <ul className="space-y-4">
                    {applications.map((app) => (
                        <li key={app._id} className="p-4 border rounded-lg shadow-sm flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold text-gray-800">Submitted At: {app.submittedAt}</h3>
                            </div>
                            <a 
                                onClick={handleDownloadResume(app.resume)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                View Resume
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
