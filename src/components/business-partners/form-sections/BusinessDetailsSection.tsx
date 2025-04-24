
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "@/hooks/useBusinessPartnerForm";
import { PaymentTerms, PaymentMethods, BPTypes, CommunicationMethods, ShippingMethods } from "@/types/businessPartner";

interface BusinessDetailsSectionProps {
  form: UseFormReturn<FormValues>;
}

export function BusinessDetailsSection({ form }: BusinessDetailsSectionProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="payment_terms"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Payment Terms*</FormLabel>
            <Select onValueChange={field.onChange} value={field.value || ""}>
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
            <Select onValueChange={field.onChange} value={field.value || ""}>
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
            <Select onValueChange={field.onChange} value={field.value || ""}>
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

      {["material_1", "material_2", "material_3"].map((materialField, index) => (
        <FormField
          key={materialField}
          control={form.control}
          name={materialField as keyof FormValues}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Material {index + 1}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}

      <FormField
        control={form.control}
        name="communication_method"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Communication Method</FormLabel>
            <Select onValueChange={field.onChange} value={field.value || ""}>
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
            <Select onValueChange={field.onChange} value={field.value || ""}>
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
    </>
  );
}
