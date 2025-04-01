
import React from "react";
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
    <DashboardCard className={`aesthetic-card group ${className}`}>
      <DashboardCardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <DashboardCardTitle className="text-base font-medium tracking-wide">
            {title}
          </DashboardCardTitle>
          <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary 
                        group-hover:scale-110 transition-all duration-300">
            {icon}
          </div>
        </div>
      </DashboardCardHeader>
      <DashboardCardContent>
        <div className="flex flex-col">
          <div className="text-2xl font-semibold premium-text-gradient">{value}</div>
          {change && (
            <div className="flex items-center mt-2">
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
                  <ArrowUp className="mr-1 h-3 w-3" />
                ) : change.trend === "down" ? (
                  <ArrowDown className="mr-1 h-3 w-3" />
                ) : null}
                {Math.abs(change.value)}%
              </span>
              <span className="text-xs text-muted-foreground ml-1">vs last period</span>
            </div>
          )}
        </div>
      </DashboardCardContent>
    </DashboardCard>
  );
}
