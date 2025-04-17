import { useQuery } from "@tanstack/react-query";
import { getSalesOrders, getInventory } from "@/services/supabase";
import { Header } from "../components/layout/Header";
import { motion } from "framer-motion";
import { StatsGrid } from "../components/dashboard/StatsGrid";
import { ChartsSection } from "../components/dashboard/ChartsSection";
import { TablesSection } from "../components/dashboard/TablesSection";

const Index = () => {
  // Fetch sales orders from backend
  const { data: salesOrders = [] } = useQuery({
    queryKey: ['salesOrders'],
    queryFn: getSalesOrders
  });

  // Fetch inventory from backend
  const { data: inventoryItems = [] } = useQuery({
    queryKey: ['inventory'],
    queryFn: getInventory
  });

  // Calculate dashboard statistics from real data
  const totalOrders = salesOrders.length;
  const pendingOrders = salesOrders.filter(order => order.order_status === "Pending").length;
  const lowStockItems = inventoryItems.filter(item => Number(item.quantity) < 50).slice(0, 5);
  const recentOrders = salesOrders.slice(0, 5);

  // Mock chart data (we'll keep this for visualization)
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

  return (
    <div className="flex-1">
      <Header />
      
      <motion.div 
        className="p-6 animate-in ml-[72px] lg:ml-72 transition-all duration-500"
        initial="hidden"
        animate="visible"
      >
        <motion.div className="mb-8">
          <h1 className="text-3xl font-semibold mb-2 tracking-wide premium-text-gradient">Dashboard</h1>
          <p className="text-muted-foreground text-lg tracking-wide">
            Overview of your business metrics and key performance indicators.
          </p>
        </motion.div>
        
        <StatsGrid
          totalOrders={totalOrders}
          pendingOrders={pendingOrders}
          monthlySales={monthlySalesData.reduce((acc, curr) => acc + curr.value, 0)}
          inventoryItems={inventoryItems}
          lowStockItems={lowStockItems}
          recentOrders={recentOrders}
        />
        
        <ChartsSection
          monthlySalesData={monthlySalesData}
          productCategoryData={productCategoryData}
          orderStatusData={orderStatusData}
        />
        
        <TablesSection
          recentOrders={recentOrders}
          lowStockItems={lowStockItems}
        />
      </motion.div>
    </div>
  );
};

export default Index;
