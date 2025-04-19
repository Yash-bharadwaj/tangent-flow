
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateBusinessPartnerInput } from "@/services/business-partners";
import { formSchema } from "./schemas/partnerFormSchema";
import { BasicInfoTab } from "./form-tabs/BasicInfoTab";
import { PaymentTypeTab } from "./form-tabs/PaymentTypeTab";
import { MaterialsTab } from "./form-tabs/MaterialsTab";
import { LogisticsTab } from "./form-tabs/LogisticsTab";

interface BusinessPartnerFormProps {
  onSuccess: () => void;
  initialData?: CreateBusinessPartnerInput;
  isEditing?: boolean;
}

export function BusinessPartnerForm({
  onSuccess,
  initialData,
  isEditing = false,
}: BusinessPartnerFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  const form = useForm<CreateBusinessPartnerInput>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      bp_name: "",
      contact_person: "",
      phone_country: "+1",
      phone_number: "",
      email: "",
      address: "",
      country: "",
      payment_terms: "30 Days",
      payment_method: "Bank Transfer",
      bp_type: "Customer",
      material_1: "",
      material_2: "",
      material_3: "",
      communication_method: "Email",
      shipping_method: "Transport",
    },
  });

  async function onSubmit(data: CreateBusinessPartnerInput) {
    setIsSubmitting(true);
    try {
      onSuccess();
    } catch (error) {
      console.error("Error submitting business partner:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
      <h2 className="text-2xl font-semibold mb-6">
        {isEditing ? "Edit Business Partner" : "Add New Business Partner"}
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="basic">Basic Information</TabsTrigger>
              <TabsTrigger value="payment">Payment & Type</TabsTrigger>
              <TabsTrigger value="materials">Materials</TabsTrigger>
              <TabsTrigger value="logistics">Communication & Shipping</TabsTrigger>
            </TabsList>

            <TabsContent value="basic">
              <BasicInfoTab form={form} />
            </TabsContent>

            <TabsContent value="payment">
              <PaymentTypeTab form={form} />
            </TabsContent>

            <TabsContent value="materials">
              <MaterialsTab form={form} />
            </TabsContent>

            <TabsContent value="logistics">
              <LogisticsTab form={form} />
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onSuccess()}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : isEditing ? "Update Partner" : "Add Partner"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
