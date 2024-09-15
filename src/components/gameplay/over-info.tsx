import { motion, AnimatePresence } from "framer-motion";
import {
  PiNumberSixBold,
  PiNumberFourBold,
  PiNumberZeroBold,
} from "react-icons/pi";
import { FaW } from "react-icons/fa6";

interface OverInfoProps {
  currentOverData: (number | "W")[];
}

const BallResult = ({ result }: { result: number | "W" }) => {
  let bgColor = "bg-gray-700";
  let textColor = "text-white";
  let icon = null;

  switch (result) {
    case 0:
      bgColor = "bg-slate-600";
      icon = <PiNumberZeroBold className="w-4 h-4" />;
      break;
    case 1:
    case 2:
    case 3:
      bgColor = "bg-blue-600";
      break;
    case 4:
      bgColor = "bg-green-500";
      icon = <PiNumberFourBold className="w-4 h-4" />;
      break;
    case 6:
      bgColor = "bg-yellow-400";
      icon = <PiNumberSixBold className="w-4 h-4 font-bold" />;
      break;
    case "W":
      bgColor = "bg-red-600";
      icon = <FaW className="w-4 h-4" />;
      break;
  }

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={`w-10 h-10 ${bgColor} ${textColor} rounded-full flex items-center justify-center font-bold text-lg shadow-lg`}
    >
      {icon || result}
    </motion.div>
  );
};

export function OverInfo({ currentOverData }: OverInfoProps) {
  return (
    <section className="bg-gray-800 border-gray-700 rounded-xl">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-white">Last 6 balls</h3>
        </div>
        <div className="flex gap-2">
          <AnimatePresence>
            {currentOverData.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <BallResult result={result} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
