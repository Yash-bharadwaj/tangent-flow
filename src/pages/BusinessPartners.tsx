
import { useState, useEffect } from "react";
import { BusinessPartnersForm } from "@/components/business-partners/BusinessPartnersForm";
import { BusinessPartnersTable } from "@/components/business-partners/BusinessPartnersTable";
import { getBusinessPartners } from "@/services/businessPartners";
import { type BusinessPartner } from "@/types/businessPartner";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function BusinessPartners() {
  const [partners, setPartners] = useState<BusinessPartner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // Add this to force re-render of form

  const loadPartners = async () => {
    setIsLoading(true);
    try {
      const data = await getBusinessPartners();
      setPartners(data);
    } catch (error) {
      console.error("Error loading partners:", error);
      toast.error("Failed to load business partners. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPartners();
  }, []);

  const handleFormSuccess = () => {
    loadPartners();
    setShowForm(false); // Hide the form after successful submission
    setRefreshKey(prev => prev + 1); // Reset form state
  };

  return (
    <div className="flex-1 ml-20 md:ml-72 p-6 space-y-8 transition-all duration-500">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Business Partners</h1>
            <p className="text-muted-foreground">
              Create and manage your business partners
            </p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancel" : "Create Partner"}
          </Button>
        </div>
      </div>

      {showForm && (
        <div className="rounded-lg border bg-card p-6 space-y-6 mb-8">
          <h2 className="text-lg font-semibold">Add New Business Partner</h2>
          <BusinessPartnersForm key={refreshKey} onSuccess={handleFormSuccess} />
        </div>
      )}

      <div className="rounded-lg border bg-card">
        <BusinessPartnersTable data={partners} isLoading={isLoading} onRefresh={loadPartners} />
      </div>
    </div>
  );
}
