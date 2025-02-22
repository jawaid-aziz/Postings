import React from "react";

export const Home = () => {
  return (
    <div className="font-sans min-h-screen flex flex-col">
      {/* Header (Navbar) */}
      <header className="bg-gray-100 p-4 flex justify-between items-center shadow-md">
        <div className="font-bold text-2xl text-gray-800">Postings</div>
        <div>
          <a href="/sign-in" className="px-5 py-2 bg-blue-600 text-white rounded-md mx-2 hover:bg-blue-700">
            Sign In
          </a>
          <a href="/sign-up" className="px-5 py-2 bg-green-600 text-white rounded-md mx-2 hover:bg-green-700">
            Sign Up
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center p-10 bg-gray-50">
        <h1 className="text-5xl font-bold text-gray-800 leading-tight mb-6">
          Find Your Dream Job or Hire Top Talent
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Connect with the best opportunities and candidates effortlessly.
        </p>
        <div>
          <button className="px-8 py-4 mx-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition">
            Hire
          </button>
          <button className="px-8 py-4 mx-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition">
            Apply
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; {new Date().getFullYear()} Postings. All rights reserved.</p>
      </footer>
    </div>
  );
};
