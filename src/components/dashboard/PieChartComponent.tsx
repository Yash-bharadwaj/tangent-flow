
import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, Sector } from "recharts";
import { DashboardCard, DashboardCardContent, DashboardCardHeader, DashboardCardTitle } from "./DashboardCard";
import { motion } from "framer-motion";

// Vibrant gradient definitions for pie chart
const GRADIENT_COLORS = [
  { start: '#2193b0', end: '#6dd5ed' }, // Blue gradient
  { start: '#ee9ca7', end: '#ffdde1' }, // Pink gradient
  { start: '#ff9966', end: '#ff5e62' }, // Orange gradient
  { start: '#56ab2f', end: '#a8e063' }, // Green gradient
  { start: '#8E2DE2', end: '#4A00E0' }  // Purple gradient
];

interface PieChartComponentProps {
  data: Array<{
    name: string;
    value: number;
  }>;
  title: string;
  className?: string;
}

export const PieChartComponent = ({ data, title, className = "" }: PieChartComponentProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredItem, setHoveredItem] = useState<{name: string, value: number} | null>(null);

  // Custom renderer for active sectors with animation
  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 10}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          opacity={0.8}
        />
      </g>
    );
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-black/80 backdrop-blur-lg rounded-lg p-3 border border-black/5 dark:border-white/10 shadow-lg"
        >
          <p className="font-medium">{data.name}</p>
          <p className="text-primary text-lg font-semibold">{data.value}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {((data.value / data.total) * 100).toFixed(1)}% of total
          </p>
        </motion.div>
      );
    }
    return null;
  };

  // Add total to data for percentage calculation
  const total = data.reduce((acc, curr) => acc + curr.value, 0);
  const enhancedData = data.map(item => ({ ...item, total }));

  return (
    <DashboardCard className={`premium-card ${className}`}>
      <DashboardCardHeader>
        <DashboardCardTitle className="premium-text-gradient">{title}</DashboardCardTitle>
      </DashboardCardHeader>
      <DashboardCardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {/* Define gradients */}
            <defs>
              {GRADIENT_COLORS.map((color, index) => (
                <linearGradient key={`gradient-${index}`} id={`gradient-${index}`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={color.start} />
                  <stop offset="100%" stopColor={color.end} />
                </linearGradient>
              ))}
            </defs>
            
            <Pie
              data={enhancedData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              activeIndex={activeIndex !== null ? activeIndex : undefined}
              activeShape={renderActiveShape}
              onMouseEnter={(_, index) => {
                setActiveIndex(index);
                setHoveredItem(data[index]);
              }}
              onMouseLeave={() => {
                setActiveIndex(null);
                setHoveredItem(null);
              }}
              animationDuration={1000}
              animationEasing="ease-in-out"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={`url(#gradient-${index % GRADIENT_COLORS.length})`}
                  opacity={activeIndex === index ? 1 : 0.9}
                  strokeWidth={activeIndex === index ? 2 : 1}
                  stroke={activeIndex === index ? "#fff" : "none"}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              formatter={(value, entry: any) => {
                // Safely access color info - fix for the error
                const safeIndex = entry?.index !== undefined ? entry.index % GRADIENT_COLORS.length : 0;
                const gradientColor = GRADIENT_COLORS[safeIndex] || { start: "#cccccc", end: "#cccccc" };
                
                return (
                  <motion.span 
                    className={activeIndex === entry?.index ? "font-medium" : ""}
                    initial={{ color: "var(--foreground)" }}
                    animate={{ 
                      color: hoveredItem?.name === value ? 
                        gradientColor.end : "var(--foreground)" 
                    }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {value}
                  </motion.span>
                );
              }} 
            />
          </PieChart>
        </ResponsiveContainer>
      </DashboardCardContent>
    </DashboardCard>
  );
};
