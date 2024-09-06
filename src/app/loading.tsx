import { Loader2 } from "lucide-react";
import { TIPS_AND_QUOTES } from "@/src/lib/constants";

export default function LoadingPage() {
  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * TIPS_AND_QUOTES.length);
    return TIPS_AND_QUOTES[randomIndex];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-blue-900 flex flex-col items-center justify-center p-4">
      <div className="relative w-24 h-24 mb-4">
        <div className="absolute inset-0 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
        <Loader2 className="w-full h-full text-blue-500 animate-pulse" />
      </div>
      <h1 className="text-3xl font-bold text-white mb-2">Loading...</h1>
      <p className="text-blue-300 text-center max-w-md">{getRandomQuote()}</p>
    </div>
  );
}
