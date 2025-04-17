
import React from 'react';
import { motion } from 'framer-motion';
import { DataTable } from '../ui/DataTable';
import { DashboardCard, DashboardCardContent, DashboardCardHeader, DashboardCardTitle } from './DashboardCard';

interface TablesSectionProps {
  recentOrders: Array<any>;
  lowStockItems: Array<any>;
}

export function TablesSection({
  recentOrders,
  lowStockItems
}: TablesSectionProps) {
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
  );
}
