
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "@/hooks/useBusinessPartnerForm";
import { PaymentMethods, PaymentTerms, BPTypes, CommunicationMethods, ShippingMethods } from "@/types/businessPartner";

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
                {PaymentTerms.map((term, index) => (
                  <SelectItem key={`payment-term-${index}`} value={term}>
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
                {PaymentMethods.map((method, index) => (
                  <SelectItem key={`payment-method-${index}`} value={method}>
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
                {BPTypes.map((type, index) => (
                  <SelectItem key={`bp-type-${index}`} value={type}>
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
                {CommunicationMethods.map((method, index) => (
                  <SelectItem key={`comm-method-${index}`} value={method}>
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
                {ShippingMethods.map((method, index) => (
                  <SelectItem key={`shipping-method-${index}`} value={method}>
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
