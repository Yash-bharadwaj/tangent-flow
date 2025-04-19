
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { BusinessPartner } from "@/services/business-partners";
import { BusinessPartnerForm } from "./BusinessPartnerForm";

interface EditBusinessPartnerDialogProps {
  businessPartner: BusinessPartner | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function EditBusinessPartnerDialog({
  businessPartner,
  open,
  onOpenChange,
  onSuccess,
}: EditBusinessPartnerDialogProps) {
  if (!businessPartner) {
    return null;
  }

  // Remove fields that are not part of the form
  const { id, bp_code, created_at, updated_at, ...formData } = businessPartner;

  const handleSuccess = () => {
    onSuccess();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <BusinessPartnerForm
          initialData={formData}
          onSuccess={handleSuccess}
          isEditing
        />
      </DialogContent>
    </Dialog>
  );
}
