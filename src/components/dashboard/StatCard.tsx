
import React from "react";
import { motion } from "framer-motion";
import { 
  DashboardCard, 
  DashboardCardContent, 
  DashboardCardHeader, 
  DashboardCardTitle 
} from "./DashboardCard";
import { ArrowDown, ArrowUp } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: number;
    trend: "up" | "down" | "neutral";
  };
  className?: string;
}

export function StatCard({ title, value, icon, change, className = "" }: StatCardProps) {
  return (
    <DashboardCard className={`group ${className}`}>
      <DashboardCardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <DashboardCardTitle className="text-base font-medium tracking-wide">
            {title}
          </DashboardCardTitle>
          <motion.div 
            className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary 
                     group-hover:scale-110 transition-all duration-300"
            whileHover={{ rotate: 10 }}
            whileTap={{ scale: 0.95 }}
          >
            {icon}
          </motion.div>
        </div>
      </DashboardCardHeader>
      <DashboardCardContent>
        <div className="flex flex-col">
          <motion.div 
            className="text-2xl font-semibold bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 1.5, repeat: 0, ease: "easeOut" }}
          >
            {value}
          </motion.div>
          {change && (
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
          )}
        </div>
      </DashboardCardContent>
    </DashboardCard>
  );
}
