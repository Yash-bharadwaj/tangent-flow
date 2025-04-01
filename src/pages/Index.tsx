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
import { Header } from "../components/layout/Header";
import { StatCard } from "../components/dashboard/StatCard";
import { 
  DashboardCard, 
  DashboardCardContent, 
  DashboardCardHeader, 
  DashboardCardTitle 
} from "../components/dashboard/DashboardCard";
import { SalesChart } from "../components/dashboard/SalesChart";
import { PieChartComponent } from "../components/dashboard/PieChartComponent";

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
  
  // Calculate low stock items
  const lowStockItems = inventoryItems.filter(item => Number(item.quantity) < 50).slice(0, 5);
  
  // Recent orders for dashboard
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
      
      <div className="p-6 animate-in ml-[72px] lg:ml-72 transition-all duration-500">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-2 tracking-wide premium-text-gradient">Dashboard</h1>
          <p className="text-muted-foreground text-lg tracking-wide">
            Overview of your business metrics and key performance indicators.
          </p>
        </div>
        
        {/* Stats Grid */}
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
            value={`$${monthlySalesData.reduce((acc, curr) => acc + curr.value, 0).toLocaleString()}`}
            icon={<DollarSign size={20} />}
            change={{ value: 12.5, trend: "up" }}
          />
          <StatCard
            title="Inventory Items"
            value={inventoryItems.length}
            icon={<Package size={20} />}
            change={{ value: 1.5, trend: "up" }}
          />
          <StatCard
            title="Active Users"
            value={22}
            icon={<Users size={20} />}
          />
          <StatCard
            title="In-Transit Deliveries"
            value={12}
            icon={<Truck size={20} />}
            change={{ value: 15, trend: "up" }}
          />
          <StatCard
            title="Low Stock Items"
            value={lowStockItems.length}
            icon={<BarChart3 size={20} />}
            change={{ value: 5, trend: "up" }}
          />
          <StatCard
            title="Out of Stock"
            value={inventoryItems.filter(item => Number(item.quantity) === 0).length}
            icon={<Package size={20} />}
            change={{ value: 2, trend: "down" }}
          />
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <SalesChart data={monthlySalesData} title="Monthly Sales Performance" type="bar" />
          <SalesChart data={monthlySalesData} title="Sales Trend" type="line" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <PieChartComponent data={productCategoryData} title="Sales by Product Category" />
          <PieChartComponent data={orderStatusData} title="Orders by Status" />
        </div>
        
        {/* Recent Orders & Low Stock */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
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
        </div>
      </div>
    </div>
  );
};

export default Index;
