
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface StatCardDetailsProps {
  hasDrawerContent?: boolean;
}

export function StatCardDetails({ hasDrawerContent }: StatCardDetailsProps) {
  if (!hasDrawerContent) return null;

  return (
    <motion.div 
      className="flex items-center justify-end mt-3 text-xs text-primary"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.8 }}
      whileHover={{ opacity: 1, x: 2 }}
    >
      <span>View details</span>
      <ChevronRight className="h-3 w-3 ml-1" />
    </motion.div>
  );
}
