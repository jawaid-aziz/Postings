import { useState } from "react";
import { useParams } from "react-router-dom";

const URL = import.meta.env.VITE_APP_URL;

export const ApplyForm = () => {

    const { id } = useParams();

    const [resume, setResume] = useState(null);

    const handleFileChange = (event) => {
        setResume(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (!resume) {
            alert("Please upload your resume.");
            return;
        }

        console.log("Form ID: ", id);

        const formData = new FormData();
        formData.append("resume", resume);


        fetch(`${URL}/job/apply/${id}`, {
            method: "POST",
            credentials: "include",
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            console.log("Success:", data);
        })
        .catch(error => {
            console.error("Error:", error);
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4 p-4 border rounded-lg shadow-lg w-80 mx-auto bg-white">
            <label className="flex flex-col items-center w-full px-4 py-6 bg-gray-100 text-blue-600 rounded-lg cursor-pointer hover:bg-gray-200">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V12m0 0V8m0 4h10M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                <span className="mt-2 text-sm">Upload Resume (PDF - upto 5MB )</span>
                <input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
            </label>
            {resume && <p className="text-sm text-gray-600">Selected file: {resume.name}</p>}
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Apply</button>
        </form>
    );
};
