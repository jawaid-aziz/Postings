import { Button } from "@/components/ui/button";

export const Home = () => {

  return (
    <main className="flex-1 flex flex-col items-center justify-center text-center p-10 bg-teal-50">
      <h1 className="text-5xl font-bold text-teal-900 leading-tight mb-6">
        Find Your Dream Job or Hire Top Talent
      </h1>
      <p className="text-lg text-teal-700 mb-8">
        Connect with the best opportunities and candidates effortlessly.
      </p>
      <div className="flex space-x-4">
        <Button asChild className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4">
          <a href="/employer/post-job">Hire</a>
        </Button>
        <Button asChild className="bg-teal-700 hover:bg-teal-800 text-white px-8 py-4">
          <a href="/employee">Apply</a>
        </Button>
      </div>
    </main>
  );
};
