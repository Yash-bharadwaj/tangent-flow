
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { DashboardCard, DashboardCardContent, DashboardCardHeader, DashboardCardTitle } from "./DashboardCard";

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
  return (
    <DashboardCard className={`premium-card ${className}`}>
      <DashboardCardHeader>
        <DashboardCardTitle className="premium-text-gradient">{title}</DashboardCardTitle>
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
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]} />
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
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          )}
        </ResponsiveContainer>
      </DashboardCardContent>
    </DashboardCard>
  );
};
