
import React from 'react';
import { SalesChart } from "./SalesChart";
import { PieChartComponent } from "./PieChartComponent";

interface ChartData {
  name: string;
  value: number;
}

interface ChartSectionProps {
  monthlySalesData: ChartData[];
  productCategoryData: ChartData[];
  orderStatusData: ChartData[];
}

export function ChartSection({
  monthlySalesData,
  productCategoryData,
  orderStatusData
}: ChartSectionProps) {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <SalesChart data={monthlySalesData} title="Monthly Sales Performance" type="bar" />
        <SalesChart data={monthlySalesData} title="Sales Trend" type="line" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <PieChartComponent data={productCategoryData} title="Sales by Product Category" />
        <PieChartComponent data={orderStatusData} title="Orders by Status" />
      </div>
    </>
  );
}
