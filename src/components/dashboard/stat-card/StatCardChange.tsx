
import { motion } from "framer-motion";
import { ArrowDown, ArrowUp } from "lucide-react";

interface StatCardChangeProps {
  change?: {
    value: number;
    trend: "up" | "down" | "neutral";
  };
}

export function StatCardChange({ change }: StatCardChangeProps) {
  if (!change) return null;

  return (
    <motion.div 
      className="flex items-center mt-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <span
        className={`inline-flex items-center text-xs ${
          change.trend === "up"
            ? "text-green-400"
            : change.trend === "down"
            ? "text-red-400"
            : "text-muted-foreground"
        }`}
      >
        {change.trend === "up" ? (
          <motion.div
            animate={{ y: [0, -2, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ArrowUp className="mr-1 h-3 w-3" />
          </motion.div>
        ) : change.trend === "down" ? (
          <motion.div
            animate={{ y: [0, 2, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ArrowDown className="mr-1 h-3 w-3" />
          </motion.div>
        ) : null}
        {Math.abs(change.value)}%
      </span>
      <span className="text-xs text-muted-foreground ml-1">vs last period</span>
    </motion.div>
  );
}
