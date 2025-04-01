
import { useState, useEffect } from "react";
import { Header } from "../components/layout/Header";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSalesOrders, deleteSalesOrder, subscribeToSalesOrders } from "@/services/supabase";
import { SalesOrder } from "@/types/database";
import { DashboardCard, DashboardCardContent, DashboardCardHeader, DashboardCardTitle } from "../components/dashboard/DashboardCard";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SalesOrderForm } from "@/components/sales/SalesOrderForm";
import { SalesOrdersTable } from "@/components/sales/SalesOrdersTable";
import { EditSalesOrderDialog } from "@/components/sales/EditSalesOrderDialog";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const SalesOrders = () => {
  const { isAuthenticated } = useAuth();
  const [formVisible, setFormVisible] = useState(false);
  const [editingOrder, setEditingOrder] = useState<SalesOrder | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  // Query sales orders
  const { data: salesOrders, isLoading, isError, error } = useQuery({
    queryKey: ['salesOrders'],
    queryFn: getSalesOrders,
    enabled: isAuthenticated, // Only fetch when authenticated
  });

  // Setup real-time subscription
  useEffect(() => {
    if (!isAuthenticated) return;
    
    // Setup real-time subscription to changes in the sales_orders table
    const channel = subscribeToSalesOrders((payload) => {
      console.log('Real-time update received:', payload);
      queryClient.invalidateQueries({ queryKey: ['salesOrders'] });
    });

    return () => {
      channel.unsubscribe();
    };
  }, [queryClient, isAuthenticated]);

  // Setup mutation for deleting sales orders
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteSalesOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['salesOrders'] });
      toast.success("Sales order deleted successfully");
    },
    onError: (error) => {
      toast.error(`Error deleting sales order: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });

  const handleDeleteOrder = (id: string) => {
    if (window.confirm("Are you sure you want to delete this sales order?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleEditOrder = (order: SalesOrder) => {
    setEditingOrder(order);
    setIsEditDialogOpen(true);
  };

  const handleFormSuccess = () => {
    setFormVisible(false);
    queryClient.invalidateQueries({ queryKey: ['salesOrders'] });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 p-6">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Sales Orders</h1>
              <p className="text-muted-foreground">
                View and manage customer sales orders.
              </p>
            </div>
            <Button onClick={() => setFormVisible(!formVisible)}>
              {formVisible ? "Hide Form" : "Create Order"}
            </Button>
          </div>
        </div>
        
        {!isAuthenticated && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              You must be logged in to manage sales orders
            </AlertDescription>
          </Alert>
        )}
        
        {formVisible && (
          <div className="mb-6">
            <SalesOrderForm onSuccess={handleFormSuccess} />
          </div>
        )}
        
        {isError && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Error loading sales orders: {(error as Error)?.message || "Unknown error"}
            </AlertDescription>
          </Alert>
        )}
        
        <SalesOrdersTable
          data={salesOrders || []}
          isLoading={isLoading}
          onEdit={handleEditOrder}
          onDelete={handleDeleteOrder}
        />
        
        <EditSalesOrderDialog
          salesOrder={editingOrder}
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onSuccess={handleFormSuccess}
        />
      </main>
    </div>
  );
};

export default SalesOrders;
