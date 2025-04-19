
import { useState, useEffect } from "react";
import { BusinessPartnersForm } from "@/components/business-partners/BusinessPartnersForm";
import { BusinessPartnersTable } from "@/components/business-partners/BusinessPartnersTable";
import { getBusinessPartners } from "@/services/businessPartners";
import { type BusinessPartner } from "@/types/businessPartner";

export default function BusinessPartners() {
  const [partners, setPartners] = useState<BusinessPartner[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
    <div className="container mx-auto p-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Business Partners</h1>
        <p className="text-muted-foreground">
          Create and manage your business partners
        </p>
      </div>

      <div className="rounded-lg border bg-card p-6 space-y-6">
        <h2 className="text-lg font-semibold">Add New Business Partner</h2>
        <BusinessPartnersForm onSuccess={loadPartners} />
      </div>

      <div className="rounded-lg border bg-card">
        <BusinessPartnersTable data={partners} isLoading={isLoading} />
      </div>
    </div>
  );
}
