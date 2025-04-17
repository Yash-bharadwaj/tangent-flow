
import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, TooltipProps } from "recharts";
import { DashboardCard, DashboardCardContent, DashboardCardHeader, DashboardCardTitle } from "./DashboardCard";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";

interface SalesChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
  title: string;
  className?: string;
  type?: "bar" | "line";
}

export const SalesChart = ({ data, title, className = "", type = "bar" }: SalesChartProps) => {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [activeBarIndex, setActiveBarIndex] = useState<number | null>(null);
  const [timeRange, setTimeRange] = useState("6m"); // 1m, 3m, 6m, 1y
  
  // Custom tooltip component with animations
  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <motion.div 
          className="bg-white dark:bg-black/80 backdrop-blur-lg border border-black/5 dark:border-white/10 rounded-lg p-3 shadow-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <p className="font-medium">{`${label}`}</p>
          <p className="text-primary text-lg font-semibold">
            ${payload[0].value?.toLocaleString()}
          </p>
        </motion.div>
      );
    }
    return null;
  };
  
  // Time range filter buttons
  const timeRangeFilters = [
    { value: "1m", label: "1M" },
    { value: "3m", label: "3M" },
    { value: "6m", label: "6M" },
    { value: "1y", label: "1Y" },
  ];

  return (
    <DashboardCard className={`premium-card ${className}`}>
      <DashboardCardHeader>
        <div className="flex justify-between items-center">
          <DashboardCardTitle className="premium-text-gradient">{title}</DashboardCardTitle>
          <motion.button
            className="rounded-lg p-2 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            onClick={() => setIsFiltersVisible(!isFiltersVisible)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center gap-1">
              <Filter className="h-4 w-4" />
              {isFiltersVisible ? (
                <ChevronUp className="h-3 w-3" />
              ) : (
                <ChevronDown className="h-3 w-3" />
              )}
            </div>
          </motion.button>
        </div>
        
        <AnimateFilters isVisible={isFiltersVisible}>
          <div className="mt-4 flex flex-wrap gap-2">
            {timeRangeFilters.map((filter) => (
              <motion.button
                key={filter.value}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  timeRange === filter.value 
                    ? "bg-primary text-white" 
                    : "bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20"
                }`}
                onClick={() => setTimeRange(filter.value)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter.label}
              </motion.button>
            ))}
          </div>
        </AnimateFilters>
      </DashboardCardHeader>
      <DashboardCardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          {type === "bar" ? (
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              onMouseMove={(e) => {
                if (e.activeTooltipIndex !== undefined) {
                  setActiveBarIndex(e.activeTooltipIndex);
                }
              }}
              onMouseLeave={() => setActiveBarIndex(null)}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" strokeOpacity={0.4} />
              <XAxis 
                dataKey="name" 
                axisLine={{ stroke: "var(--border)", strokeWidth: 1 }} 
                tick={{ fill: "var(--muted-foreground)" }}
              />
              <YAxis 
                axisLine={{ stroke: "var(--border)", strokeWidth: 1 }} 
                tick={{ fill: "var(--muted-foreground)" }}
                tickFormatter={(value) => `$${value/1000}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="value" 
                fill="url(#colorGradient)" 
                radius={[4, 4, 0, 0]} 
                animationDuration={1500}
                animationEasing="ease-in-out"
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity={1} />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.4} />
                </linearGradient>
              </defs>
            </BarChart>
          ) : (
            <LineChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" strokeOpacity={0.4} />
              <XAxis 
                dataKey="name" 
                axisLine={{ stroke: "var(--border)", strokeWidth: 1 }} 
                tick={{ fill: "var(--muted-foreground)" }}
              />
              <YAxis 
                axisLine={{ stroke: "var(--border)", strokeWidth: 1 }} 
                tick={{ fill: "var(--muted-foreground)" }}
                tickFormatter={(value) => `$${value/1000}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity={1} />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="url(#lineGradient)" 
                strokeWidth={3} 
                dot={{ stroke: "var(--primary)", strokeWidth: 2, r: 4, fill: "var(--background)" }}
                activeDot={{ stroke: "var(--primary)", strokeWidth: 2, r: 6, fill: "var(--background)" }}
                animationDuration={1500}
                animationEasing="ease-in-out"
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </DashboardCardContent>
    </DashboardCard>
  );
};

// Animated filters component
const AnimateFilters = ({ 
  isVisible, 
  children 
}: { 
  isVisible: boolean; 
  children: React.ReactNode 
}) => {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ 
        height: isVisible ? "auto" : 0,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.3 }}
      style={{ overflow: "hidden" }}
    >
      {children}
    </motion.div>
  );
};
