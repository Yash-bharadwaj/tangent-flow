
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { communicationMethodOptions, shippingMethodOptions } from "../constants/formOptions";
import { UseFormReturn } from "react-hook-form";
import { CreateBusinessPartnerInput } from "@/services/business-partners";

interface LogisticsTabProps {
  form: UseFormReturn<CreateBusinessPartnerInput>;
}

export function LogisticsTab({ form }: LogisticsTabProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                {communicationMethodOptions.map((method) => (
                  <SelectItem key={method} value={method}>{method}</SelectItem>
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
                {shippingMethodOptions.map((method) => (
                  <SelectItem key={method} value={method}>{method}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
