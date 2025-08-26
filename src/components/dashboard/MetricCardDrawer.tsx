
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

interface MetricCardDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const MetricCardDrawer = ({
  isOpen,
  onClose,
  title,
  children,
  className = "",
}: MetricCardDrawerProps) => {
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-[9998]"
            onClick={onClose}
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ 
              x: 0,
              transition: { 
                type: "spring", 
                stiffness: 300, 
                damping: 30,
                mass: 1
              } 
            }}
            exit={{ 
              x: "100%",
              transition: { 
                type: "spring", 
                stiffness: 400, 
                damping: 40
              }
            }}
            className={`fixed right-0 top-0 z-[9999] h-full w-[450px] overflow-y-auto 
                      backdrop-blur-xl bg-white/80 dark:bg-black/60 
                      border-l border-black/5 dark:border-white/10 shadow-2xl ${className}`}
          >
            <div className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-black/5 dark:border-white/10 bg-white/50 dark:bg-black/50 backdrop-blur-xl px-6">
              <motion.h2 
                className="text-lg font-semibold tracking-wide"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {title}
              </motion.h2>
              <motion.button
                className="rounded-full p-2 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="h-5 w-5" />
              </motion.button>
            </div>
            
            <motion.div 
              className="p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { delay: 0.1 } 
              }}
            >
              {children}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};
