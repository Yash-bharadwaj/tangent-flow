import React from 'react';
import { 
  BarChart3, 
  Box, 
  DollarSign, 
  Package, 
  ShoppingCart, 
  Truck, 
  Users 
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getSalesOrders, getInventory } from "@/services/supabase";
import { DataTable } from "../components/ui/DataTable";
import { StatCard } from "../components/dashboard/StatCard";
import { 
  DashboardCard, 
  DashboardCardContent, 
  DashboardCardHeader, 
  DashboardCardTitle 
} from "../components/dashboard/DashboardCard";
import { SalesChart } from "../components/dashboard/SalesChart";
import { PieChartComponent } from "../components/dashboard/PieChartComponent";
import { BatchProcessingTable } from "../components/dashboard/BatchProcessingTable";
import { motion } from "framer-motion";

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
  
  const orderStatusData = [
    { name: 'Delivered', value: 10 },
    { name: 'Processing', value: 25 },
    { name: 'Shipped', value: 20 },
    { name: 'Pending', value: 0 },
    { name: 'Cancelled', value: 0 }
  ];

  const totalOrdersDrawer = (
    <div className="space-y-6">
      <p className="text-muted-foreground">
        Overview of all orders in the system. Current total: <strong>{totalOrders}</strong>
      </p>
      
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Order Status Breakdown</h4>
        <div className="grid grid-cols-2 gap-4">
          {orderStatusData.map((status) => (
            <motion.div 
              key={status.name}
              whileHover={{ scale: 1.02 }}
              className="p-4 bg-white/20 dark:bg-black/20 rounded-lg border border-black/5 dark:border-white/10"
            >
              <div className="text-sm font-medium">{status.name}</div>
              <div className="text-2xl font-bold">{status.value}</div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <DataTable
        data={recentOrders.slice(0, 3)}
        columns={[
          { header: "SO No.", accessor: "order_number" },
          { header: "Customer", accessor: "customer_name" },
          { header: "Status", accessor: "order_status" },
        ]}
        searchable={false}
      />
    </div>
  );
  
  const pendingOrdersDrawer = (
    <div className="space-y-6">
      <p className="text-muted-foreground">
        All orders currently pending action. Total pending: <strong>{pendingOrders}</strong>
      </p>
      
      <DataTable
        data={salesOrders.filter(order => order.order_status === "Pending")}
        columns={[
          { header: "SO No.", accessor: "order_number" },
          { header: "Customer", accessor: "customer_name" },
          { header: "Date", accessor: "expected_payment_date" },
        ]}
        searchable={false}
      />
    </div>
  );
  
  const monthlySalesDrawer = (
    <div className="space-y-6">
      <p className="text-muted-foreground">
        Monthly sales performance overview. Total: <strong>${monthlySalesData.reduce((acc, curr) => acc + curr.value, 0).toLocaleString()}</strong>
      </p>
      
      <SalesChart data={monthlySalesData} title="Monthly Sales Detail" type="line" />
      
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Monthly Breakdown</h4>
        <div className="space-y-2">
          {monthlySalesData.map((month) => (
            <div key={month.name} className="flex justify-between items-center">
              <span>{month.name}</span>
              <span className="font-medium">${month.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
  const inventoryDrawer = (
    <div className="space-y-6">
      <p className="text-muted-foreground">
        All inventory items currently in stock. Total items: <strong>{inventoryItems.length}</strong>
      </p>
      
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Inventory Status</h4>
        <div className="grid grid-cols-2 gap-4">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="p-4 bg-white/20 dark:bg-black/20 rounded-lg border border-black/5 dark:border-white/10"
          >
            <div className="text-sm font-medium">Raw Material</div>
            <div className="text-2xl font-bold">{lowStockItems.length}</div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="p-4 bg-white/20 dark:bg-black/20 rounded-lg border border-black/5 dark:border-white/10"
          >
            <div className="text-sm font-medium">Finished Goods</div>
            <div className="text-2xl font-bold">{inventoryItems.filter(item => Number(item.quantity) === 0).length}</div>
          </motion.div>
        </div>
      </div>
      
      <DataTable
        data={lowStockItems}
        columns={[
          { header: "Product ID", accessor: "product_id" },
          { header: "Quantity", accessor: "quantity" },
          { header: "Location", accessor: "location" },
        ]}
        searchable={false}
      />
    </div>
  );

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
    <motion.div 
      className="animate-in"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={childVariants} className="mb-8">
        <h1 className="text-3xl font-semibold mb-2 tracking-wide text-foreground">Dashboard</h1>
        <p className="text-muted-foreground text-lg tracking-wide">
          Overview of your business metrics and key performance indicators.
        </p>
      </motion.div>
      
      <motion.div variants={childVariants} className="mb-8">
        <BatchProcessingTable />
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"
        variants={containerVariants}
      >
        <motion.div variants={childVariants}>
          <StatCard
            title="Total Orders"
            value={totalOrders}
            icon={<ShoppingCart size={20} />}
            change={{ value: 8.2, trend: "up" }}
            drawerContent={totalOrdersDrawer}
            className="text-foreground"
          />
        </motion.div>
        
        <motion.div variants={childVariants}>
          <StatCard
            title="Dispatch Tracker"
            value="₹4,00,000"
            icon={<Box size={20} />}
            change={{ value: 2.1, trend: "down" }}
            drawerContent={pendingOrdersDrawer}
            className="text-foreground"
          />
        </motion.div>
        
        <motion.div variants={childVariants}>
          <StatCard
            title="Monthly Sales"
            value={`$${monthlySalesData.reduce((acc, curr) => acc + curr.value, 0).toLocaleString()}`}
            icon={<DollarSign size={20} />}
            change={{ value: 12.5, trend: "up" }}
            drawerContent={monthlySalesDrawer}
          />
        </motion.div>
        
        <motion.div variants={childVariants}>
          <StatCard
            title="Inventory Items"
            value={inventoryItems.length}
            icon={<Package size={20} />}
            change={{ value: 1.5, trend: "up" }}
            drawerContent={inventoryDrawer}
          />
        </motion.div>
      </motion.div>
      
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
      
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
        variants={containerVariants}
      >
        <motion.div variants={childVariants}>
          <DashboardCard className="premium-card">
            <DashboardCardHeader>
              <DashboardCardTitle className="premium-text-gradient">Recent Orders</DashboardCardTitle>
            </DashboardCardHeader>
            <DashboardCardContent>
              <DataTable
                data={recentOrders}
                columns={[
                  { header: "SO No.", accessor: "order_number" },
                  { header: "Customer", accessor: "customer_name" },
                  { 
                    header: "Status", 
                    accessor: "order_status",
                    cell: (item) => (
                      <span className={`
                        status-pill
                        ${item.order_status === "Delivered" ? "status-pill-success" : 
                          item.order_status === "Processing" ? "status-pill-info" : 
                          item.order_status === "Shipped" ? "status-pill-info" : 
                          item.order_status === "Cancelled" ? "status-pill-danger" : 
                          "status-pill-warning"}
                      `}>
                        {item.order_status}
                      </span>
                    )
                  },
                  { header: "Payment Date", accessor: "expected_payment_date" },
                ]}
                searchable={false}
              />
            </DashboardCardContent>
          </DashboardCard>
        </motion.div>
        
        <motion.div variants={childVariants}>
          <DashboardCard className="premium-card">
            <DashboardCardHeader>
              <DashboardCardTitle className="premium-text-gradient">Low Stock Items</DashboardCardTitle>
            </DashboardCardHeader>
            <DashboardCardContent>
              <DataTable
                data={lowStockItems}
                columns={[
                  { header: "ID", accessor: "id" },
                  { header: "Product ID", accessor: "product_id" },
                  { header: "Quantity", accessor: "quantity" },
                  { header: "Location", accessor: "location" },
                ]}
                searchable={false}
              />
            </DashboardCardContent>
          </DashboardCard>
        </motion.div>
      </motion.div>
      
      {/* Bottom tiles section */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        variants={containerVariants}
      >
        <motion.div variants={childVariants}>
          <StatCard
            title="Active Users"
            value={22}
            icon={<Users size={20} />}
          />
        </motion.div>
        
        <motion.div variants={childVariants}>
          <StatCard
            title="In-Transit Deliveries"
            value={12}
            icon={<Truck size={20} />}
            change={{ value: 15, trend: "up" }}
          />
        </motion.div>
        
        <motion.div variants={childVariants}>
          <StatCard
            title="Low Stock Items"
            value={lowStockItems.length}
            icon={<BarChart3 size={20} />}
            change={{ value: 5, trend: "up" }}
          />
        </motion.div>
        
        <motion.div variants={childVariants}>
          <StatCard
            title="Out of Stock"
            value={inventoryItems.filter(item => Number(item.quantity) === 0).length}
            icon={<Package size={20} />}
            change={{ value: 2, trend: "down" }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Index;