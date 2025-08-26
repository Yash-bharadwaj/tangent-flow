
import { useState } from "react";
import { 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SidebarContent } from "../sidebar/SidebarContent";

export function RightSidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="relative h-full">

      {/* Sidebar */}
      <motion.div
        className="fixed right-0 top-0 z-20 h-full w-72 overflow-y-auto 
                 backdrop-blur-xl bg-white/10 dark:bg-black/30 border-l border-black/5 dark:border-white/5 
                 pattern-waves"
        initial={{ x: "100%" }}
        animate={{ 
          x: isOpen ? 0 : "100%",
          transition: {
            type: "spring", 
            stiffness: 300, 
            damping: 30,
            mass: 1
          }
        }}
      >
        <div className="flex h-16 items-center border-b border-black/5 dark:border-white/5 px-4">
          <motion.h2 
            className="text-base font-semibold tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Tools
          </motion.h2>
        </div>
        <SidebarContent />
      </motion.div>
    </div>
  );
}
