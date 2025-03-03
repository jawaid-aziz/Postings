import React from "react";
import { useAuth } from "../../Context/AuthProvider";
export const Home = () => {
  const { isAuthenticated } = useAuth();
  return (
    <main className="flex-1 flex flex-col items-center justify-center text-center p-10 bg-gray-50">
      <h1 className="text-5xl font-bold text-gray-800 leading-tight mb-6">
        Find Your Dream Job or Hire Top Talent
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Connect with the best opportunities and candidates effortlessly.
      </p>
      <div>
        <button className="px-8 py-4 mx-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition">
          <a href="/employer">Hire</a>
        </button>
        <button className="px-8 py-4 mx-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition">
          <a href="/employee">Apply</a>
        </button>
      </div>
    </main>
  );
};
