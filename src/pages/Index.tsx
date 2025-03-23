
import { 
  BarChart3, 
  Box, 
  DollarSign, 
  Package, 
  ShoppingCart, 
  Truck, 
  Users 
} from "lucide-react";
import { DataTable } from "../components/ui/DataTable";
import { Header } from "../components/layout/Header";
import { Sidebar } from "../components/layout/Sidebar";
import { dashboardStats, salesOrderData, inventoryData } from "../lib/mockData";
import { StatCard } from "../components/dashboard/StatCard";
import { 
  DashboardCard, 
  DashboardCardContent, 
  DashboardCardHeader, 
  DashboardCardTitle 
} from "../components/dashboard/DashboardCard";

const Index = () => {
  // Recent orders for dashboard
  const recentOrders = salesOrderData.slice(0, 5);
  
  // Low stock items
  const lowStockItems = inventoryData.filter(item => item.inStock < item.minStock).slice(0, 5);

  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar />
      
      <main className="flex-1 lg:pl-72 transition-all duration-300 ease-in-out">
        <Header />
        
        <div className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Overview of your business metrics and key performance indicators.
            </p>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Orders"
              value={dashboardStats.totalOrders}
              icon={<ShoppingCart size={18} />}
              change={{ value: 8.2, trend: "up" }}
            />
            <StatCard
              title="Pending Orders"
              value={dashboardStats.pendingOrders}
              icon={<Box size={18} />}
              change={{ value: 2.1, trend: "down" }}
            />
            <StatCard
              title="Monthly Sales"
              value={`$${dashboardStats.sales.monthly.toLocaleString()}`}
              icon={<DollarSign size={18} />}
              change={{ value: dashboardStats.sales.change, trend: "up" }}
            />
            <StatCard
              title="Inventory Items"
              value={dashboardStats.inventory.totalItems}
              icon={<Package size={18} />}
              change={{ value: 1.5, trend: "up" }}
            />
            <StatCard
              title="Active Users"
              value={dashboardStats.userActivity.activeUsers}
              icon={<Users size={18} />}
            />
            <StatCard
              title="In-Transit Deliveries"
              value={dashboardStats.deliveries.inTransit}
              icon={<Truck size={18} />}
              change={{ value: 15, trend: "up" }}
            />
            <StatCard
              title="Low Stock Items"
              value={dashboardStats.inventory.lowStock}
              icon={<BarChart3 size={18} />}
              change={{ value: 5, trend: "up" }}
            />
            <StatCard
              title="Out of Stock"
              value={dashboardStats.inventory.outOfStock}
              icon={<Package size={18} />}
              change={{ value: 2, trend: "down" }}
            />
          </div>
          
          {/* Recent Orders & Low Stock */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <DashboardCard>
              <DashboardCardHeader>
                <DashboardCardTitle>Recent Orders</DashboardCardTitle>
              </DashboardCardHeader>
              <DashboardCardContent>
                <DataTable
                  data={recentOrders}
                  columns={[
                    { header: "SO No.", accessor: "soNo" },
                    { header: "Customer", accessor: "customerName" },
                    { 
                      header: "Status", 
                      accessor: "orderStatus",
                      cell: (item) => (
                        <span className={`
                          status-pill
                          ${item.orderStatus === "Delivered" ? "status-pill-success" : 
                            item.orderStatus === "Processing" ? "status-pill-info" : 
                            item.orderStatus === "Shipped" ? "status-pill-info" : 
                            item.orderStatus === "Cancelled" ? "status-pill-danger" : 
                            "status-pill-warning"}
                        `}>
                          {item.orderStatus}
                        </span>
                      )
                    },
                    { header: "Payment Date", accessor: "expectedPaymentDate" },
                  ]}
                  searchable={false}
                />
              </DashboardCardContent>
            </DashboardCard>
            
            <DashboardCard>
              <DashboardCardHeader>
                <DashboardCardTitle>Low Stock Items</DashboardCardTitle>
              </DashboardCardHeader>
              <DashboardCardContent>
                <DataTable
                  data={lowStockItems}
                  columns={[
                    { header: "Item", accessor: "itemName" },
                    { header: "In Stock", accessor: "inStock" },
                    { header: "Min Stock", accessor: "minStock" },
                    { header: "Supplier", accessor: "supplier" },
                  ]}
                  searchable={false}
                />
              </DashboardCardContent>
            </DashboardCard>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
