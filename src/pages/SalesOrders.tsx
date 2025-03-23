
import { Header } from "../components/layout/Header";
import { Sidebar } from "../components/layout/Sidebar";
import { DataTable } from "../components/ui/DataTable";
import { salesOrderData } from "../lib/mockData";
import { DashboardCard, DashboardCardContent, DashboardCardHeader, DashboardCardTitle } from "../components/dashboard/DashboardCard";

const SalesOrders = () => {
  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar />
      
      <main className="flex-1 lg:pl-72 transition-all duration-300 ease-in-out">
        <Header />
        
        <div className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Sales Orders</h1>
            <p className="text-muted-foreground">
              View and manage customer sales orders.
            </p>
          </div>
          
          <DashboardCard>
            <DashboardCardHeader>
              <DashboardCardTitle>Open Sales Orders</DashboardCardTitle>
            </DashboardCardHeader>
            <DashboardCardContent>
              <DataTable
                data={salesOrderData}
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
                  { header: "Material", accessor: "material" },
                  { header: "Quantity", accessor: "quantity" },
                  { header: "Payment Due", accessor: "expectedPaymentDate" },
                ]}
                searchKeys={["soNo", "customerName", "material"]}
              />
            </DashboardCardContent>
          </DashboardCard>
        </div>
      </main>
    </div>
  );
};

export default SalesOrders;
