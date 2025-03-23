
import { Header } from "../components/layout/Header";
import { Sidebar } from "../components/layout/Sidebar";
import { DataTable } from "../components/ui/DataTable";
import { inventoryData } from "../lib/mockData";
import { DashboardCard, DashboardCardContent, DashboardCardHeader, DashboardCardTitle } from "../components/dashboard/DashboardCard";

const Inventory = () => {
  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar />
      
      <main className="flex-1 lg:pl-72 transition-all duration-300 ease-in-out">
        <Header />
        
        <div className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Inventory Management</h1>
            <p className="text-muted-foreground">
              View and manage inventory items and stock levels.
            </p>
          </div>
          
          <DashboardCard>
            <DashboardCardHeader>
              <DashboardCardTitle>Current Inventory</DashboardCardTitle>
            </DashboardCardHeader>
            <DashboardCardContent>
              <DataTable
                data={inventoryData}
                columns={[
                  { header: "Item ID", accessor: "itemId" },
                  { header: "Item Name", accessor: "itemName" },
                  { header: "Category", accessor: "category" },
                  { 
                    header: "In Stock", 
                    accessor: "inStock",
                    cell: (item) => (
                      <span className={`
                        font-medium
                        ${item.inStock < item.minStock ? "text-red-600 dark:text-red-400" : 
                          item.inStock < item.minStock * 1.2 ? "text-yellow-600 dark:text-yellow-400" : 
                          "text-green-600 dark:text-green-400"}
                      `}>
                        {item.inStock}
                      </span>
                    )
                  },
                  { header: "Min Stock", accessor: "minStock" },
                  { header: "Supplier", accessor: "supplier" },
                  { header: "Last Order", accessor: "lastOrderDate" },
                ]}
                searchKeys={["itemId", "itemName", "category", "supplier"]}
              />
            </DashboardCardContent>
          </DashboardCard>
        </div>
      </main>
    </div>
  );
};

export default Inventory;
