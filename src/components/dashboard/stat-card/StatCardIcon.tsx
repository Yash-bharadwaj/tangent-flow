
import { motion } from "framer-motion";

interface StatCardIconProps {
  icon: React.ReactNode;
}

export function StatCardIcon({ icon }: StatCardIconProps) {
  return (
    <motion.div 
      className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary 
                group-hover:scale-110 transition-all duration-300"
      whileHover={{ rotate: 10 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
    </motion.div>
  );
}
