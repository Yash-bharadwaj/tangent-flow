
import { useState } from "react";
import { BusinessPartner } from "@/services/business-partners";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/DataTable";
import { 
  Sheet,
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle
} from "@/components/ui/sheet";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash } from "lucide-react";

interface BusinessPartnerTableProps {
  data: BusinessPartner[];
  isLoading?: boolean;
  onEdit: (partner: BusinessPartner) => void;
  onDelete: (id: string) => void;
}

export function BusinessPartnerTable({
  data,
  isLoading = false,
  onEdit,
  onDelete,
}: BusinessPartnerTableProps) {
  const [selectedPartner, setSelectedPartner] = useState<BusinessPartner | null>(null);
  const [detailsOpen, setDetailsOpen] = useState<boolean>(false);

  const handleRowClick = (partner: BusinessPartner) => {
    setSelectedPartner(partner);
    setDetailsOpen(true);
  };

  const columns = [
    {
      header: "BP Code",
      accessor: "bp_code" as keyof BusinessPartner,
    },
    {
      header: "BP Name",
      accessor: "bp_name" as keyof BusinessPartner,
    },
    {
      header: "Type",
      accessor: "bp_type" as keyof BusinessPartner,
      cell: (partner: BusinessPartner) => (
        <Badge variant="outline" className="capitalize">
          {partner.bp_type || "N/A"}
        </Badge>
      ),
    },
    {
      header: "Contact Person",
      accessor: "contact_person" as keyof BusinessPartner,
    },
    {
      header: "Payment Terms",
      accessor: "payment_terms" as keyof BusinessPartner,
    },
    {
      header: "Actions",
      accessor: "id" as keyof BusinessPartner,
      cell: (partner: BusinessPartner) => (
        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(partner)}
          >
            <Edit size={16} />
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Trash size={16} />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete {partner.bp_name}? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline">Cancel</Button>
                <Button 
                  variant="destructive"
                  onClick={() => onDelete(partner.id)}
                >
                  Delete
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <DataTable
        data={data}
        columns={columns}
        isLoading={isLoading}
        searchable={true}
        searchKeys={["bp_code", "bp_name", "contact_person"]}
        onRowClick={handleRowClick}
      />

      {selectedPartner && (
        <Sheet open={detailsOpen} onOpenChange={setDetailsOpen}>
          <SheetContent className="w-full sm:max-w-xl">
            <SheetHeader>
              <SheetTitle>{selectedPartner.bp_name}</SheetTitle>
              <SheetDescription>
                BP Code: {selectedPartner.bp_code}
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Contact Person</h3>
                  <p>{selectedPartner.contact_person}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Partner Type</h3>
                  <p>{selectedPartner.bp_type || "N/A"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Phone</h3>
                  <p>{selectedPartner.phone_country} {selectedPartner.phone_number || "N/A"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                  <p>{selectedPartner.email || "N/A"}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Address</h3>
                <p>{selectedPartner.address || "N/A"}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Country</h3>
                <p>{selectedPartner.country || "N/A"}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Payment Terms</h3>
                  <p>{selectedPartner.payment_terms}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Payment Method</h3>
                  <p>{selectedPartner.payment_method || "N/A"}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Materials</h3>
                <ul className="list-disc list-inside">
                  {selectedPartner.material_1 && <li>{selectedPartner.material_1}</li>}
                  {selectedPartner.material_2 && <li>{selectedPartner.material_2}</li>}
                  {selectedPartner.material_3 && <li>{selectedPartner.material_3}</li>}
                  {!selectedPartner.material_1 && !selectedPartner.material_2 && !selectedPartner.material_3 && <p>No materials listed</p>}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Communication Method</h3>
                  <p>{selectedPartner.communication_method || "N/A"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Shipping Method</h3>
                  <p>{selectedPartner.shipping_method || "N/A"}</p>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  onClick={() => onEdit(selectedPartner)}
                >
                  Edit Partner
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}
