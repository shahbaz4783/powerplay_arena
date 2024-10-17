"use client";

import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

interface LoadingOverlayProps {
  initialMessage: string;
}

const messages = [
  "Hang tight! We're processing your request...",
  "Almost there! Just a few more moments...",
  "Thanks for your patience. We're working on it...",
  "Nearly done! Finalizing your transaction...",
];

export const LoadingOverlay = ({ initialMessage }: LoadingOverlayProps) => {
  const [currentMessage, setCurrentMessage] = useState(initialMessage);

  useEffect(() => {
    let messageIndex = 0;
    const intervalId = setInterval(() => {
      messageIndex = (messageIndex + 1) % messages.length;
      setCurrentMessage(messages[messageIndex]);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="fixed inset-0 bg-slate-900 bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm h-svh">
      <div className="bg-slate-800 rounded-xl p-6 shadow-xl border border-slate-700 max-w-sm w-full">
        <div className="flex flex-col items-center">
          <div className="relative w-16 h-16 mb-4">
            <div className="absolute inset-0 border-4 border-slate-600 border-t-cyan-500 rounded-full animate-spin"></div>
            <Loader2 className="w-full h-full text-cyan-500 animate-pulse" />
          </div>
          <p className="text-slate-200 text-center font-semibold">
            Your request is processing
          </p>
          <p className="text-slate-400 text-center text-sm mt-2">
            {currentMessage}
          </p>
        </div>
      </div>
    </div>
  );
};
