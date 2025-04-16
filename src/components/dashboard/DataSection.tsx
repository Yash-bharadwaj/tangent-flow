
import React from 'react';
import { DataTable } from "../ui/DataTable";
import { 
  DashboardCard, 
  DashboardCardContent, 
  DashboardCardHeader, 
  DashboardCardTitle 
} from "./DashboardCard";

interface DataSectionProps {
  recentOrders: any[];
  lowStockItems: any[];
}

export function DataSection({ recentOrders, lowStockItems }: DataSectionProps) {
  return (
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
  );
}
