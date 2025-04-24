
import { useState, useEffect } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MaterialInput, createMaterial, getBusinessPartnersForVendors } from "@/services/materials";
import {
  ProductTypes,
  UOMByProductType,
  SpecificationsByProductType,
  ProcurementTypes,
  QualityCheckTypes,
  InboundSupplyTypes,
  GRLocations,
  TemperatureControlTypes,
} from "@/types/material";
import { BusinessPartner } from "@/types/businessPartner";

const formSchema = z.object({
  material_name: z.string().min(1, "Material Name is required"),
  product_type: z.string().min(1, "Product Type is required"),
  uom: z.string().min(1, "UOM is required"),
  specification: z.string().optional(),
  procurement_type: z.string().optional(),
  scrap_percentage: z.number().min(0).max(100).optional(),
  processing_time: z.number().min(0).optional(),
  processing_time_unit: z.string(),
  quality_check: z.string().optional(),
  qm_tolerance_percentage: z.number().min(0).max(100).optional(),
  documentation_required: z.boolean(),
  batch_managed: z.boolean(),
  preferred_vendor_1: z.string().optional(),
  preferred_vendor_2: z.string().optional(),
  inbound_supply_type: z.string().optional(),
  serial_no: z.string().optional(),
  notes: z.string().optional(),
  gr_location: z.string().optional(),
  temperature_control: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function MaterialsForm({ onSuccess }: { onSuccess?: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const [vendors, setVendors] = useState<BusinessPartner[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      material_name: "",
      product_type: "",
      uom: "",
      specification: "",
      procurement_type: "",
      scrap_percentage: 0,
      processing_time: 0,
      processing_time_unit: "hours",
      quality_check: "",
      qm_tolerance_percentage: 0,
      documentation_required: false,
      batch_managed: false,
      preferred_vendor_1: "",
      preferred_vendor_2: "",
      inbound_supply_type: "",
      serial_no: "",
      notes: "",
      gr_location: "",
      temperature_control: "",
    },
  });

  useEffect(() => {
    const loadVendors = async () => {
      const data = await getBusinessPartnersForVendors();
      setVendors(data);
    };
    loadVendors();
  }, []);

  // Update UOM when product type changes
  const product_type = form.watch("product_type");
  useEffect(() => {
    if (product_type) {
      form.setValue("uom", UOMByProductType[product_type]);
    }
  }, [product_type, form]);

  const onSubmit = async (formData: FormValues) => {
    setIsLoading(true);
    try {
      const materialData: MaterialInput = {
        ...formData,
        scrap_percentage: formData.scrap_percentage || null,
        processing_time: formData.processing_time || null,
        qm_tolerance_percentage: formData.qm_tolerance_percentage || null,
      };
      
      await createMaterial(materialData);
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
            name="material_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Material Name*</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="product_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Type*</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select product type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ProductTypes.map((type) => (
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
            name="uom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>UOM (Auto-populated)*</FormLabel>
                <FormControl>
                  <Input {...field} readOnly />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="specification"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Specification</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select specification" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {product_type && SpecificationsByProductType[product_type]?.map((spec) => (
                      <SelectItem key={spec} value={spec}>
                        {spec}
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
            name="procurement_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Procurement Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select procurement type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ProcurementTypes.map((type) => (
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
            name="scrap_percentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Scrap Percentage (%)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    {...field} 
                    onChange={e => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex space-x-2">
            <FormField
              control={form.control}
              name="processing_time"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Processing Time</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field} 
                      onChange={e => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="processing_time_unit"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Time Unit</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {["minutes", "hours", "days"].map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {unit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="quality_check"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quality Check</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select quality check type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {QualityCheckTypes.map((type) => (
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
            name="qm_tolerance_percentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>QM Tolerance (%)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    {...field} 
                    onChange={e => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="documentation_required"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Documentation Required</FormLabel>
                <Select 
                  onValueChange={(value) => field.onChange(value === "true")} 
                  defaultValue={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="true">Required</SelectItem>
                    <SelectItem value="false">Not Required</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="batch_managed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Batch Managed</FormLabel>
                <Select 
                  onValueChange={(value) => field.onChange(value === "true")} 
                  defaultValue={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="preferred_vendor_1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Vendor 1</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select preferred vendor" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {vendors.map((vendor) => (
                      <SelectItem key={vendor.id} value={vendor.id}>
                        {vendor.bp_name}
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
            name="preferred_vendor_2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Vendor 2</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select preferred vendor" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {vendors.map((vendor) => (
                      <SelectItem key={vendor.id} value={vendor.id}>
                        {vendor.bp_name}
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
            name="inbound_supply_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Inbound Supply Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select inbound supply type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {InboundSupplyTypes.map((type) => (
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
            name="serial_no"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Serial No</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gr_location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GR Location</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select GR location" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {GRLocations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
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
            name="temperature_control"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Temperature Control</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select temperature control" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {TemperatureControlTypes.map((type) => (
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
            name="notes"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Material"}
        </Button>
      </form>
    </Form>
  );
}
