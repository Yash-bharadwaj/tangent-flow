
import { useState, useEffect } from "react";
import { Header } from "../components/layout/Header";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  BusinessPartner,
  getBusinessPartners,
  createBusinessPartner,
  updateBusinessPartner,
  deleteBusinessPartner,
  subscribeToBusinessPartners,
  CreateBusinessPartnerInput
} from "@/services/business-partners";
import { DashboardCard, DashboardCardContent, DashboardCardHeader, DashboardCardTitle } from "../components/dashboard/DashboardCard";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BusinessPartnerForm } from "@/components/business-partners/BusinessPartnerForm";
import { BusinessPartnerTable } from "@/components/business-partners/BusinessPartnerTable";
import { EditBusinessPartnerDialog } from "@/components/business-partners/EditBusinessPartnerDialog";
import { useAuth } from "@/components/auth/AuthProvider";
import { toast } from "sonner";

const BusinessPartners = () => {
  const { isAuthenticated } = useAuth();
  const [formVisible, setFormVisible] = useState(false);
  const [editingPartner, setEditingPartner] = useState<BusinessPartner | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  // Query business partners
  const { 
    data: businessPartners, 
    isLoading, 
    isError, 
    error 
  } = useQuery({
    queryKey: ['businessPartners'],
    queryFn: getBusinessPartners,
    enabled: isAuthenticated,
  });

  // Setup real-time subscription
  useEffect(() => {
    if (!isAuthenticated) return;
    
    // Setup real-time subscription
    const channel = subscribeToBusinessPartners((payload) => {
      console.log('Real-time update received:', payload);
      queryClient.invalidateQueries({ queryKey: ['businessPartners'] });
    });

    return () => {
      channel.unsubscribe();
    };
  }, [queryClient, isAuthenticated]);

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (data: CreateBusinessPartnerInput) => createBusinessPartner(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['businessPartners'] });
      setFormVisible(false);
      toast.success("Business partner created successfully");
    },
    onError: (error) => {
      toast.error(`Error creating business partner: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<BusinessPartner> }) => 
      updateBusinessPartner(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['businessPartners'] });
      setIsEditDialogOpen(false);
      toast.success("Business partner updated successfully");
    },
    onError: (error) => {
      toast.error(`Error updating business partner: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteBusinessPartner(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['businessPartners'] });
      toast.success("Business partner deleted successfully");
    },
    onError: (error) => {
      toast.error(`Error deleting business partner: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });

  const handleCreatePartner = (data: CreateBusinessPartnerInput) => {
    createMutation.mutate(data);
  };

  const handleUpdatePartner = (id: string, data: Partial<BusinessPartner>) => {
    updateMutation.mutate({ id, data });
  };

  const handleDeletePartner = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleEditPartner = (partner: BusinessPartner) => {
    setEditingPartner(partner);
    setIsEditDialogOpen(true);
  };

  const handleFormSuccess = () => {
    setFormVisible(false);
    queryClient.invalidateQueries({ queryKey: ['businessPartners'] });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background pattern-waves-bg">
      <Header />
      
      <main className="flex-1 p-6 ml-[72px] lg:ml-72 transition-all duration-500">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Business Partners</h1>
              <p className="text-muted-foreground">
                Manage your business partners, customers, and vendors.
              </p>
            </div>
            <Button onClick={() => setFormVisible(!formVisible)}>
              {formVisible ? "Hide Form" : "Add Business Partner"}
            </Button>
          </div>
        </div>
        
        {!isAuthenticated && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              You must be logged in to manage business partners
            </AlertDescription>
          </Alert>
        )}
        
        {formVisible && (
          <div className="mb-6">
            <DashboardCard>
              <DashboardCardHeader>
                <DashboardCardTitle>Add New Business Partner</DashboardCardTitle>
              </DashboardCardHeader>
              <DashboardCardContent>
                <BusinessPartnerForm 
                  onSuccess={handleFormSuccess} 
                />
              </DashboardCardContent>
            </DashboardCard>
          </div>
        )}
        
        {isError && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Error loading business partners: {(error as Error)?.message || "Unknown error"}
            </AlertDescription>
          </Alert>
        )}
        
        <DashboardCard>
          <DashboardCardHeader>
            <DashboardCardTitle>Business Partners</DashboardCardTitle>
          </DashboardCardHeader>
          <DashboardCardContent>
            <BusinessPartnerTable
              data={businessPartners || []}
              isLoading={isLoading}
              onEdit={handleEditPartner}
              onDelete={handleDeletePartner}
            />
          </DashboardCardContent>
        </DashboardCard>
        
        <EditBusinessPartnerDialog
          businessPartner={editingPartner}
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onSuccess={handleFormSuccess}
        />
      </main>
    </div>
  );
};

export default BusinessPartners;
