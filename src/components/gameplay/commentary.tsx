import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/src/components/ui/card";

interface CommentaryProps {
  commentary: string[];
}

export function Commentary({ commentary }: CommentaryProps) {
  return (
    <Card className="bg-gradient-to-r from-gray-800 to-gray-900 border-gray-700 mt-4">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2">Commentary</h3>
        <ul className="space-y-1 max-h-32 overflow-y-auto">
          <AnimatePresence>
            {commentary.map((text, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="text-sm bg-gray-700 p-2 rounded"
              >
                {text}
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </CardContent>
    </Card>
  );
}