import { Button } from "@/src/components/ui/button";
import { Search } from "lucide-react";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-black bg-opacity-50 p-8 rounded-lg text-center">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-25"></div>
          <div className="relative bg-blue-600 rounded-full w-full h-full flex items-center justify-center">
            <Search className="w-16 h-16 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">404</h1>
        <p className="text-2xl font-semibold text-blue-300 mb-4">
          Page Not Found
        </p>
        <p className="text-gray-300 mb-6">
          Oops! The page you're looking for has been caught out. Let's get you
          back in the game!
        </p>
        <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
          <Link href="/miniapp">Return to Home Base</Link>
        </Button>
      </div>
    </div>
  );
}
