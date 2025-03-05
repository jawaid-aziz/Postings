import { useAuth } from "../../Context/AuthProvider";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export const Header = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header className="bg-teal-50 dark:bg-teal-900 p-4 flex justify-between items-center shadow-md">
      {/* Logo */}
      <div className="font-bold text-2xl text-teal-900 dark:text-teal-100">Postings</div>

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
        </div>
      ) : (
        <Button asChild className="bg-teal-600 hover:bg-teal-700 text-white">
          <a href="/auth">Sign In</a>
        </Button>
      )}
    </header>
  );
};
