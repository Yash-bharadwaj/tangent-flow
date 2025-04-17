
import { motion } from "framer-motion";
import { Header } from "../components/layout/Header";
import { Sidebar } from "../components/layout/Sidebar";
import { DataTable } from "../components/ui/DataTable";
import { deliveryData } from "../lib/mockData";
import { DashboardCard, DashboardCardContent, DashboardCardHeader, DashboardCardTitle } from "../components/dashboard/DashboardCard";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

const DeliveryTracking = () => {
  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar />
      
      <main className="flex-1 lg:pl-72 transition-all duration-300 ease-in-out">
        <Header />
        
        <div className="p-6">
          <motion.div 
            className="mb-8"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            custom={0}
          >
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Delivery Tracking</h1>
            <p className="text-muted-foreground">
              Track and manage customer deliveries.
            </p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            custom={1}
          >
            <DashboardCard className="transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl">
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
                        <motion.span 
                          className={`
                            status-pill
                            ${item.status === "Delivered" ? "status-pill-success" : 
                              item.status === "In Progress" ? "status-pill-info" : 
                              "status-pill-warning"}
                          `}
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {item.status === "In Progress" && (
                            <motion.span 
                              className="absolute inset-0 rounded-full bg-blue-400/20"
                              animate={{ 
                                scale: [1, 1.2, 1],
                                opacity: [0.7, 0.2, 0.7]
                              }}
                              transition={{ 
                                duration: 2, 
                                repeat: Infinity,
                                ease: "easeInOut" 
                              }}
                            />
                          )}
                          {item.status}
                        </motion.span>
                      )
                    },
                    { header: "Contact Person", accessor: "contactPerson" },
                    { header: "Address", accessor: "address" },
                  ]}
                  searchKeys={["deliveryId", "soNo", "customerName", "contactPerson"]}
                />
              </DashboardCardContent>
            </DashboardCard>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default DeliveryTracking;
