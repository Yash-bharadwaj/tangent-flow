
import { motion } from "framer-motion";
import { DashboardCard, DashboardCardContent, DashboardCardHeader, DashboardCardTitle } from "../DashboardCard";
import { MetricCardDrawer } from "../MetricCardDrawer";
import { useState } from "react";
import { StatCardIcon } from "./StatCardIcon";
import { StatCardValue } from "./StatCardValue";
import { StatCardChange } from "./StatCardChange";
import { StatCardDetails } from "./StatCardDetails";
import { cn } from "@/lib/utils";

export interface StatCardProps {
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

  return (
    <>
      <motion.div
        style={{
          rotateX: 0,
          rotateY: 0,
          transformPerspective: 1000,
        }}
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
        className={className}
      >
        <DashboardCard 
          className={cn("group cursor-pointer", className)}
          onClick={() => drawerContent && setIsDrawerOpen(true)}
        >
          <DashboardCardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <DashboardCardTitle className="text-base font-medium tracking-wide text-foreground">
                {title}
              </DashboardCardTitle>
              <StatCardIcon icon={icon} />
            </div>
          </DashboardCardHeader>
          <DashboardCardContent>
            <div className="flex flex-col">
              <StatCardValue value={value} />
              <StatCardChange change={change} />
              <StatCardDetails hasDrawerContent={Boolean(drawerContent)} />
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

export * from "./StatCardIcon";
export * from "./StatCardValue";
export * from "./StatCardChange";
export * from "./StatCardDetails";
