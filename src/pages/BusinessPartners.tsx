import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
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
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Business Partners</h1>
        <p className="text-muted-foreground">
          Create and manage your business partners
        </p>
      </div>

      <div>
        <Button 
          variant="outline" 
          onClick={() => setShowForm(!showForm)}
          className="mb-4"
        >
          {showForm ? (
            <>
              <EyeOff className="mr-2 h-4 w-4" />
              Hide Form
            </>
          ) : (
            <>
              <Eye className="mr-2 h-4 w-4" />
              Show Form
            </>
          )}
        </Button>

        {showForm && (
          <div className="rounded-lg border bg-card p-6 space-y-6 mb-8">
            <h2 className="text-lg font-semibold">Add New Business Partner</h2>
            <BusinessPartnersForm onSuccess={loadPartners} />
          </div>
        )}
      </div>

      <div className="rounded-lg border bg-card">
        <BusinessPartnersTable data={partners} isLoading={isLoading} />
      </div>
    </div>
  );
}
