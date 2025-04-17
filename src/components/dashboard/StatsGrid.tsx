
import React from 'react';
import { motion } from 'framer-motion';
import { Box, ShoppingCart, DollarSign, Package, Users, Truck, BarChart3 } from "lucide-react";
import { StatCard } from "./StatCard";

interface StatsGridProps {
  totalOrders: number;
  pendingOrders: number;
  monthlySales: number;
  inventoryItems: Array<any>;
  lowStockItems: Array<any>;
  recentOrders: Array<any>;
}

export function StatsGrid({
  totalOrders,
  pendingOrders,
  monthlySales,
  inventoryItems,
  lowStockItems,
  recentOrders
}: StatsGridProps) {
  // Container animation variants
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

  // Create drawer content for each card
  const totalOrdersDrawer = (
    <div className="space-y-6">
      <p className="text-muted-foreground">
        Overview of all orders in the system. Current total: <strong>{totalOrders}</strong>
      </p>
      
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Order Status Breakdown</h4>
        <div className="grid grid-cols-2 gap-4">
          {[
            { name: 'Delivered', value: 35 },
            { name: 'Processing', value: 25 },
            { name: 'Shipped', value: 20 },
            { name: 'Pending', value: 15 },
            { name: 'Cancelled', value: 5 }
          ].map((status) => (
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
    </div>
  );

  return (
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
        />
      </motion.div>
      
      <motion.div variants={childVariants}>
        <StatCard
          title="Pending Orders"
          value={pendingOrders}
          icon={<Box size={20} />}
          change={{ value: 2.1, trend: "down" }}
        />
      </motion.div>
      
      <motion.div variants={childVariants}>
        <StatCard
          title="Monthly Sales"
          value={`$${monthlySales.toLocaleString()}`}
          icon={<DollarSign size={20} />}
          change={{ value: 12.5, trend: "up" }}
        />
      </motion.div>
      
      <motion.div variants={childVariants}>
        <StatCard
          title="Inventory Items"
          value={inventoryItems.length}
          icon={<Package size={20} />}
          change={{ value: 1.5, trend: "up" }}
        />
      </motion.div>
      
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
  );
}
