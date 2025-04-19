
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { CreateBusinessPartnerInput } from "@/services/business-partners";

interface MaterialsTabProps {
  form: UseFormReturn<CreateBusinessPartnerInput>;
}

export function MaterialsTab({ form }: MaterialsTabProps) {
  return (
    <div className="grid grid-cols-1 gap-4">
      <FormField
        control={form.control}
        name="material_1"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Material 1</FormLabel>
            <FormControl>
              <Input placeholder="Enter material" {...field} />
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
              <Input placeholder="Enter material" {...field} />
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
              <Input placeholder="Enter material" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
