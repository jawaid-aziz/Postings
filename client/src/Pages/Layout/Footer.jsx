import { Separator } from "@/components/ui/separator";

export const Footer = () => {
  return (
    <footer className="bg-teal-900 text-white py-6 text-center">
      <Separator className="mb-4 bg-teal-700" />
      <p>&copy; {new Date().getFullYear()} Postings. All rights reserved.</p>
    </footer>
  );
};
