
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { BasicInfoSection } from "./form-sections/BasicInfoSection";
import { ContactSection } from "./form-sections/ContactSection";
import { BusinessDetailsSection } from "./form-sections/BusinessDetailsSection";
import { useBusinessPartnerForm } from "@/hooks/useBusinessPartnerForm";

export function BusinessPartnersForm({ onSuccess }: { onSuccess?: () => void }) {
  const { form, isLoading, onSubmit } = useBusinessPartnerForm({ onSuccess });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BasicInfoSection form={form} />
          <ContactSection form={form} />
          <BusinessDetailsSection form={form} />
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Business Partner"}
        </Button>
      </form>
    </Form>
  );
}
