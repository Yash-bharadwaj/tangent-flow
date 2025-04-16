import { Header } from "../components/layout/Header";
import { Sidebar } from "../components/layout/Sidebar";
import { DataTable } from "../components/ui/DataTable";
import { deliveryData } from "../lib/mockData";
import { DashboardCard, DashboardCardContent, DashboardCardHeader, DashboardCardTitle } from "../components/dashboard/DashboardCard";

export default function DeliveryTracking() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Delivery Tracking</h1>
        <p className="text-muted-foreground">
          Track and manage customer deliveries.
        </p>
      </div>
      
      <DashboardCard>
        <DashboardCardHeader>
          <DashboardCardTitle>Deliveries</DashboardCardTitle>
        </DashboardCardHeader>
        <DashboardCardContent>
          <DataTable
            data={deliveryData}
            columns={[
              { header: "Delivery ID", accessor: "deliveryId" },
              { header: "SO No.", accessor: "soNo" },
              { header: "Customer", accessor: "customerName" },
              { header: "Delivery Date", accessor: "deliveryDate" },
              { 
                header: "Status", 
                accessor: "status",
                cell: (item) => (
                  <span className={`
                    status-pill
                    ${item.status === "Delivered" ? "status-pill-success" : 
                      item.status === "In Progress" ? "status-pill-info" : 
                      "status-pill-warning"}
                  `}>
                    {item.status}
                  </span>
                )
              },
              { header: "Contact Person", accessor: "contactPerson" },
              { header: "Address", accessor: "address" },
            ]}
            searchKeys={["deliveryId", "soNo", "customerName", "contactPerson"]}
          />
        </DashboardCardContent>
      </DashboardCard>
    </div>
  );
}
