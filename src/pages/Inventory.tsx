
import { useQuery } from "@tanstack/react-query";
import { getInventory } from "@/services/supabase";
import { Header } from "../components/layout/Header";
import { DataTable } from "../components/ui/DataTable";
import { DashboardCard, DashboardCardContent, DashboardCardHeader, DashboardCardTitle } from "../components/dashboard/DashboardCard";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const Inventory = () => {
  // Fetch inventory data from backend
  const { data: inventoryItems, isLoading, isError, error } = useQuery({
    queryKey: ['inventory'],
    queryFn: getInventory
  });

  return (
    <div className="min-h-screen flex bg-background pattern-waves-bg">
      <main className="flex-1 ml-[72px] lg:ml-72 transition-all duration-500">
        <Header />
        
        <div className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Inventory Management</h1>
            <p className="text-muted-foreground">
              View and manage inventory items and stock levels.
            </p>
          </div>
          
          {isError && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Error loading inventory: {(error as Error)?.message || "Unknown error"}
              </AlertDescription>
            </Alert>
          )}
          
          <DashboardCard>
            <DashboardCardHeader>
              <DashboardCardTitle>Current Inventory</DashboardCardTitle>
            </DashboardCardHeader>
            <DashboardCardContent>
              <DataTable
                data={inventoryItems || []}
                isLoading={isLoading}
                columns={[
                  { header: "ID", accessor: "id" },
                  { header: "Product", accessor: "product_id" },
                  { 
                    header: "Quantity", 
                    accessor: "quantity",
                    cell: (item) => (
                      <span className={`
                        font-medium
                        ${Number(item.quantity) < 50 ? "text-red-600 dark:text-red-400" : 
                          Number(item.quantity) < 100 ? "text-yellow-600 dark:text-yellow-400" : 
                          "text-green-600 dark:text-green-400"}
                      `}>
                        {item.quantity}
                      </span>
                    )
                  },
                  { header: "Location", accessor: "location" },
                  { header: "Last Updated", accessor: "updated_at", 
                    cell: (item) => new Date(item.updated_at).toLocaleDateString() 
                  },
                ]}
                searchKeys={["id", "product_id", "location"]}
              />
            </DashboardCardContent>
          </DashboardCard>
        </div>
      </main>
    </div>
  );
};

export default Inventory;
