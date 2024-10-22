import React, { useEffect, useState } from "react";
import { cn } from "@/src/lib/utils";

const FormFeedback = ({
  error,
  success,
}: {
  error?: string;
  success?: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (error || success) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error, success]);

  if (!error && !success) return null;

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0",
      )}
    >
      <div
        className={cn(
          "m-4 px-4 py-2 rounded-xl shadow-lg backdrop-blur-md bg-opacity-90 border border-gray-200 dark:border-gray-700",
          {
            "bg-green-100 dark:bg-green-900": success,
            "bg-red-100 dark:bg-red-900": error,
          },
        )}
      >
        <p
          className={cn("text-center font-medium", {
            "text-green-800 dark:text-green-200": success,
            "text-red-800 dark:text-red-200": error,
          })}
        >
          {error || success}
        </p>
      </div>
    </div>
  );
};

export default FormFeedback;
