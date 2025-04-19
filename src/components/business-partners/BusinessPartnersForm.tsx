
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  PaymentTerms, 
  PaymentMethods, 
  BPTypes, 
  CommunicationMethods, 
  ShippingMethods 
} from "@/types/businessPartner";
import { createBusinessPartner, BusinessPartnerInput } from "@/services/businessPartners";

const formSchema = z.object({
  bp_name: z.string().min(1, "Business Partner Name is required").max(100),
  contact_person: z.string().min(1, "Contact Person is required").max(50),
  phone_country: z.string().optional(),
  phone_number: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  address: z.string().optional(),
  country: z.string().optional(),
  payment_terms: z.string().min(1, "Payment Terms is required"),
  payment_method: z.string().optional(),
  bp_type: z.string().optional(),
  material_1: z.string().optional(),
  material_2: z.string().optional(),
  material_3: z.string().optional(),
  communication_method: z.string().optional(),
  shipping_method: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function BusinessPartnersForm({ onSuccess }: { onSuccess?: () => void }) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bp_name: "",
      contact_person: "",
      phone_country: "",
      phone_number: "",
      email: "",
      address: "",
      country: "",
      payment_terms: "",
      payment_method: "",
      bp_type: "",
      material_1: "",
      material_2: "",
      material_3: "",
      communication_method: "",
      shipping_method: "",
    },
  });

  const onSubmit = async (formData: FormValues) => {
    setIsLoading(true);
    try {
      // Ensure all required fields are present with proper typing
      const businessPartnerData: BusinessPartnerInput = {
        bp_name: formData.bp_name,
        contact_person: formData.contact_person,
        phone_country: formData.phone_country || null,
        phone_number: formData.phone_number || null,
        email: formData.email || null,
        address: formData.address || null,
        country: formData.country || null,
        payment_terms: formData.payment_terms,
        payment_method: formData.payment_method || null,
        bp_type: formData.bp_type || null,
        material_1: formData.material_1 || null,
        material_2: formData.material_2 || null,
        material_3: formData.material_3 || null,
        communication_method: formData.communication_method || null,
        shipping_method: formData.shipping_method || null,
      };
      
      await createBusinessPartner(businessPartnerData);
      form.reset();
      onSuccess?.();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="bp_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Partner Name*</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={100} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contact_person"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Person*</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={50} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone_country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country Code</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="+1" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input {...field} type="tel" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="payment_terms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Terms*</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment terms" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {PaymentTerms.map((term) => (
                      <SelectItem key={term} value={term}>
                        {term}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="payment_method"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Method</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {PaymentMethods.map((method) => (
                      <SelectItem key={method} value={method}>
                        {method}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bp_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Partner Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select partner type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {BPTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="material_1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Material 1</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="material_2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Material 2</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="material_3"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Material 3</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="communication_method"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Communication Method</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select communication method" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CommunicationMethods.map((method) => (
                      <SelectItem key={method} value={method}>
                        {method}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="shipping_method"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shipping Method</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select shipping method" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ShippingMethods.map((method) => (
                      <SelectItem key={method} value={method}>
                        {method}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Business Partner"}
        </Button>
      </form>
    </Form>
  );
}
