
import React from 'react';
import { motion } from 'framer-motion';
import { SalesChart } from './SalesChart';
import { PieChartComponent } from './PieChartComponent';

interface ChartsSectionProps {
  monthlySalesData: Array<{
    name: string;
    value: number;
  }>;
  productCategoryData: Array<{
    name: string;
    value: number;
  }>;
  orderStatusData: Array<{
    name: string;
    value: number;
  }>;
}

export function ChartsSection({
  monthlySalesData,
  productCategoryData,
  orderStatusData
}: ChartsSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  return (
    <>
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
        variants={containerVariants}
      >
        <motion.div variants={childVariants}>
          <SalesChart data={monthlySalesData} title="Monthly Sales Performance" type="bar" />
        </motion.div>
        <motion.div variants={childVariants}>
          <SalesChart data={monthlySalesData} title="Sales Trend" type="line" />
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
        variants={containerVariants}
      >
        <motion.div variants={childVariants}>
          <PieChartComponent data={productCategoryData} title="Sales by Product Category" />
        </motion.div>
        <motion.div variants={childVariants}>
          <PieChartComponent data={orderStatusData} title="Orders by Status" />
        </motion.div>
      </motion.div>
    </>
  );
}
