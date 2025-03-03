import { useAuth } from "../../Context/AuthProvider";

export const Header = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header className="bg-gray-100 p-4 flex justify-between items-center shadow-md">
      <div className="font-bold text-2xl text-gray-800">Postings</div>
      {isAuthenticated ? (
        <div className="flex items-center space-x-4">
          <select
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
            onChange={(e) =>
              e.target.value && (window.location.href = e.target.value)
            }
          >
            <option value="" selected disabled>
              Hire
            </option>
            <option value="/employer/post-job">Post a Job</option>
            <option value="/employer/posted-jobs">View Applications</option>
          </select>

          <select
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 cursor-pointer"
            onChange={(e) =>
              e.target.value && (window.location.href = e.target.value)
            }
          >
            <option value="" selected disabled>
              Apply
            </option>
            <option value="/employee">Explore Jobs</option>
          </select>
        </div>
      ) : (
        <div>
          <a
            href="/auth"
            className="px-5 py-2 bg-green-600 text-white rounded-md mx-2 hover:bg-green-700"
          >
            Sign In
          </a>
        </div>
      )}
    </header>
  );
};
