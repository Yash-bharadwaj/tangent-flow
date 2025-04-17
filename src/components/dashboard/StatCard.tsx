
import React, { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { 
  DashboardCard, 
  DashboardCardContent, 
  DashboardCardHeader, 
  DashboardCardTitle 
} from "./DashboardCard";
import { ArrowDown, ArrowUp, ChevronRight } from "lucide-react";
import { MetricCardDrawer } from "./MetricCardDrawer";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: number;
    trend: "up" | "down" | "neutral";
  };
  className?: string;
  drawerContent?: React.ReactNode;
}

export function StatCard({ 
  title, 
  value, 
  icon, 
  change, 
  className = "",
  drawerContent 
}: StatCardProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  // Motion values for 3D effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Transform mouse movement to rotation values
  const rotateX = useTransform(y, [-100, 100], [2, -2]);
  const rotateY = useTransform(x, [-100, 100], [-2, 2]);

  // Handle mouse move for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  // Reset position when mouse leaves
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <>
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1000,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
        className={className}
      >
        <DashboardCard 
          className={`group cursor-pointer ${className}`}
          onClick={() => drawerContent && setIsDrawerOpen(true)}
        >
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
                className="text-2xl font-semibold text-primary"
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
              
              {drawerContent && (
                <motion.div 
                  className="flex items-center justify-end mt-3 text-xs text-primary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1, x: 2 }}
                >
                  <span>View details</span>
                  <ChevronRight className="h-3 w-3 ml-1" />
                </motion.div>
              )}
            </div>
          </DashboardCardContent>
        </DashboardCard>
      </motion.div>
      
      {drawerContent && (
        <MetricCardDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          title={title}
        >
          {drawerContent}
        </MetricCardDrawer>
      )}
    </>
  );
}
