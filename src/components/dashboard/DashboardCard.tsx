
import React from "react";
import { motion } from "framer-motion";

interface DashboardCardProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export function DashboardCard({ className = "", children, onClick }: DashboardCardProps) {
  return (
    <motion.div 
      className={`aesthetic-card backdrop-blur-xl 
                 border border-black/5 dark:border-white/5 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] 
                 dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] 
                 overflow-hidden ${className} transition-all duration-300 
                 hover:shadow-[0_10px_40px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_10px_40px_rgba(0,0,0,0.6)]`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

interface DashboardCardHeaderProps {
  className?: string;
  children: React.ReactNode;
}

export function DashboardCardHeader({ className = "", children }: DashboardCardHeaderProps) {
  return (
    <motion.div 
      className={`p-6 flex flex-col space-y-1.5 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

interface DashboardCardTitleProps {
  className?: string;
  children: React.ReactNode;
}

export function DashboardCardTitle({ className = "", children }: DashboardCardTitleProps) {
  return (
    <motion.h3 
      className={`text-lg font-semibold leading-none tracking-wide bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent ${className}`}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
    >
      {children}
    </motion.h3>
  );
}

interface DashboardCardDescriptionProps {
  className?: string;
  children: React.ReactNode;
}

export function DashboardCardDescription({ className = "", children }: DashboardCardDescriptionProps) {
  return (
    <motion.p 
      className={`text-sm text-muted-foreground ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      {children}
    </motion.p>
  );
}

interface DashboardCardContentProps {
  className?: string;
  children: React.ReactNode;
}

export function DashboardCardContent({ className = "", children }: DashboardCardContentProps) {
  return (
    <motion.div 
      className={`p-6 pt-0 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      {children}
    </motion.div>
  );
}

interface DashboardCardFooterProps {
  className?: string;
  children: React.ReactNode;
}

export function DashboardCardFooter({ className = "", children }: DashboardCardFooterProps) {
  return (
    <motion.div 
      className={`flex items-center p-6 pt-0 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
