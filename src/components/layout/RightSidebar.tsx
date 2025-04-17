
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
      {/* Toggle button - positioned to the left of the sidebar */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed ${isOpen ? "right-72" : "right-0"} top-20 z-30 flex h-10 w-10 items-center justify-center rounded-full 
                   border border-white/10 bg-background/80 shadow-xl backdrop-blur-lg transition-all duration-300 
                   hover:bg-accent/20 dark:hover:bg-white/10`}
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={isOpen ? "close" : "open"}
            initial={{ opacity: 0, rotate: isOpen ? -90 : 90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: isOpen ? 90 : -90 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.button>

      {/* Sidebar */}
      <motion.div
        className="fixed right-0 top-0 z-20 h-full w-72 overflow-y-auto 
                 backdrop-blur-xl bg-white/10 dark:bg-black/30 border-l border-black/5 dark:border-white/5 
                 pattern-waves"
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 30,
          duration: 0.5 
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
