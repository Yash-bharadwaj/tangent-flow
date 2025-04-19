
import { motion } from "framer-motion";

interface StatCardValueProps {
  value: string | number;
}

export function StatCardValue({ value }: StatCardValueProps) {
  return (
    <motion.div 
      className="text-2xl font-semibold text-foreground"
      animate={{ scale: [1, 1.03, 1] }}
      transition={{ duration: 1.5, repeat: 0, ease: "easeOut" }}
    >
      {value}
    </motion.div>
  );
}
