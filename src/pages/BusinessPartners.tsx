import { useState, useEffect } from "react";
import { BusinessPartnersForm } from "@/components/business-partners/BusinessPartnersForm";
import { BusinessPartnersTable } from "@/components/business-partners/BusinessPartnersTable";
import { getBusinessPartners } from "@/services/businessPartners";
import { type BusinessPartner } from "@/types/businessPartner";
import { Button } from "@/components/ui/button";

export default function BusinessPartners() {
  const [partners, setPartners] = useState<BusinessPartner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const loadPartners = async () => {
    setIsLoading(true);
    try {
      const data = await getBusinessPartners();
      setPartners(data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPartners();
  }, []);

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
            {showForm ? "Hide Form" : "Create Partner"}
          </Button>
        </div>
      </div>

      {showForm && (
        <div className="rounded-lg border bg-card p-6 space-y-6 mb-8">
          <h2 className="text-lg font-semibold">Add New Business Partner</h2>
          <BusinessPartnersForm onSuccess={loadPartners} />
        </div>
      )}

      <div className="rounded-lg border bg-card">
        <BusinessPartnersTable data={partners} isLoading={isLoading} />
      </div>
    </div>
  );
}
