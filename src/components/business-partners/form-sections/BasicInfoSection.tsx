
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "@/hooks/useBusinessPartnerForm";

interface BasicInfoSectionProps {
  form: UseFormReturn<FormValues>;
}

export function BasicInfoSection({ form }: BasicInfoSectionProps) {
  return (
    <>
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
    </>
  );
}
