
import { React } from 'react';
import { 
  BarChart3, 
  Box, 
  DollarSign, 
  Package, 
  ShoppingCart, 
  Truck, 
  Users 
} from "lucide-react";
import { StatCard } from "./StatCard";

interface StatsGridProps {
  totalOrders: number;
  pendingOrders: number;
  monthlySales: number;
  inventoryCount: number;
  activeUsers: number;
  inTransitDeliveries: number;
  lowStockCount: number;
  outOfStockCount: number;
}

export function StatsGrid({
  totalOrders,
  pendingOrders,
  monthlySales,
  inventoryCount,
  activeUsers,
  inTransitDeliveries,
  lowStockCount,
  outOfStockCount
}: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="Total Orders"
        value={totalOrders}
        icon={<ShoppingCart size={20} />}
        change={{ value: 8.2, trend: "up" }}
      />
      <StatCard
        title="Pending Orders"
        value={pendingOrders}
        icon={<Box size={20} />}
        change={{ value: 2.1, trend: "down" }}
      />
      <StatCard
        title="Monthly Sales"
        value={`$${monthlySales.toLocaleString()}`}
        icon={<DollarSign size={20} />}
        change={{ value: 12.5, trend: "up" }}
      />
      <StatCard
        title="Inventory Items"
        value={inventoryCount}
        icon={<Package size={20} />}
        change={{ value: 1.5, trend: "up" }}
      />
      <StatCard
        title="Active Users"
        value={activeUsers}
        icon={<Users size={20} />}
      />
      <StatCard
        title="In-Transit Deliveries"
        value={inTransitDeliveries}
        icon={<Truck size={20} />}
        change={{ value: 15, trend: "up" }}
      />
      <StatCard
        title="Low Stock Items"
        value={lowStockCount}
        icon={<BarChart3 size={20} />}
        change={{ value: 5, trend: "up" }}
      />
      <StatCard
        title="Out of Stock"
        value={outOfStockCount}
        icon={<Package size={20} />}
        change={{ value: 2, trend: "down" }}
      />
    </div>
  );
}
