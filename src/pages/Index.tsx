
import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { getSalesOrders, getInventory } from "@/services/supabase";
import { Header } from "../components/layout/Header";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { ChartSection } from "@/components/dashboard/ChartSection";
import { DataSection } from "@/components/dashboard/DataSection";

const Index = () => {
  const { data: salesOrders = [] } = useQuery({
    queryKey: ['salesOrders'],
    queryFn: getSalesOrders
  });

  const { data: inventoryItems = [] } = useQuery({
    queryKey: ['inventory'],
    queryFn: getInventory
  });

  const totalOrders = salesOrders.length;
  const pendingOrders = salesOrders.filter(order => order.order_status === "Pending").length;
  const lowStockItems = inventoryItems.filter(item => Number(item.quantity) < 50).slice(0, 5);
  const recentOrders = salesOrders.slice(0, 5);
  const outOfStockCount = inventoryItems.filter(item => Number(item.quantity) === 0).length;

  const monthlySalesData = [
    { name: 'Jan', value: 42000 },
    { name: 'Feb', value: 53000 },
    { name: 'Mar', value: 48000 },
    { name: 'Apr', value: 62000 },
    { name: 'May', value: 56000 },
    { name: 'Jun', value: 68000 }
  ];

  const productCategoryData = [
    { name: 'Electronics', value: 400 },
    { name: 'Clothing', value: 300 },
    { name: 'Furniture', value: 200 },
    { name: 'Books', value: 150 },
    { name: 'Other', value: 100 }
  ];
  
  const orderStatusData = salesOrders.length > 0 ? 
    [
      { name: 'Delivered', value: salesOrders.filter(o => o.order_status === 'Delivered').length },
      { name: 'Processing', value: salesOrders.filter(o => o.order_status === 'Processing').length },
      { name: 'Shipped', value: salesOrders.filter(o => o.order_status === 'Shipped').length },
      { name: 'Pending', value: salesOrders.filter(o => o.order_status === 'Pending').length },
      { name: 'Cancelled', value: salesOrders.filter(o => o.order_status === 'Cancelled').length }
    ] :
    [
      { name: 'Delivered', value: 35 },
      { name: 'Processing', value: 25 },
      { name: 'Shipped', value: 20 },
      { name: 'Pending', value: 15 },
      { name: 'Cancelled', value: 5 }
    ];

  const totalMonthlySales = monthlySalesData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="flex-1">
      <Header />
      
      <div className="p-4 animate-in ml-[72px] lg:ml-72 transition-all duration-500">
        <div className="mb-4">
          <h1 className="text-3xl font-semibold tracking-wide premium-text-gradient">Dashboard</h1>
          <p className="text-muted-foreground text-sm tracking-wide">
            Overview of your business metrics and key performance indicators.
          </p>
        </div>
        
        <StatsGrid
          totalOrders={totalOrders}
          pendingOrders={pendingOrders}
          monthlySales={totalMonthlySales}
          inventoryCount={inventoryItems.length}
          activeUsers={22}
          inTransitDeliveries={12}
          lowStockCount={lowStockItems.length}
          outOfStockCount={outOfStockCount}
        />
        
        <ChartSection
          monthlySalesData={monthlySalesData}
          productCategoryData={productCategoryData}
          orderStatusData={orderStatusData}
        />
        
        <DataSection
          recentOrders={recentOrders}
          lowStockItems={lowStockItems}
        />
      </div>
    </div>
  );
};

export default Index;
