import { useAuth } from "../../Context/AuthProvider";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

const URL = import.meta.env.VITE_APP_URL;

export const Header = () => {
  const { isAuthenticated, checkAuthStatus } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try{
      const response = await fetch(`${URL}/auth/sign-out`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();
      console.log("Logout Response:", data);
      navigate("/");
    }
    catch (error) {
      console.error("Logout Error:", error);
    }
    finally{
      checkAuthStatus();
    }
  }

  return (
    <header className="bg-teal-50 dark:bg-teal-900 p-4 flex justify-between items-center shadow-md">
      {/* Logo */}
      <div className="font-bold text-2xl text-teal-900 dark:text-teal-100 cursor-pointer"
      onClick={() => navigate(`/`)}
      >Postings</div>

      {isAuthenticated ? (
        <div className="flex items-center space-x-4">
          {/* Hire Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="default" className="bg-teal-600 hover:bg-teal-700 text-white">
                Hire
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white dark:bg-teal-800">
              <DropdownMenuItem onClick={() => (window.location.href = "/employer/post-job")}>
                Post a Job
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => (window.location.href = "/employer/posted-jobs")}>
                View Applications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Apply Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="default" className="bg-teal-600 hover:bg-teal-700 text-white">
                Apply
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white dark:bg-teal-800">
              <DropdownMenuItem onClick={() => (window.location.href = "/employee")}>
                Explore Jobs
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button asChild className="bg-teal-600 hover:bg-teal-700 text-white cursor-pointer"
            onClick={handleLogOut}
          >
          <a>Log out</a>
        </Button>
        </div>
      ) : (
        <Button asChild className="bg-teal-600 hover:bg-teal-700 text-white">
          <a href="/auth">Sign In</a>
        </Button>
      )}
    </header>
  );
};
