import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createSalesOrder, getBusinessPartnersForSelect, getMaterialsForSelect } from "@/services/salesOrders";
import { useAuth } from "@/components/auth/AuthProvider";
import { toast } from "sonner";
import { SalesOrder } from "@/types/database";
import { useEffect, useState } from "react";
import { BusinessPartner } from "@/types/businessPartner";
import { Material } from "@/types/material";

const CURRENCY_OPTIONS = [
  { value: 'USD', label: 'US Dollar ($)' },
  { value: 'INR', label: 'Indian Rupee (₹)' },
  { value: 'EUR', label: 'Euro (€)' },
  { value: 'GBP', label: 'British Pound (£)' },
  { value: 'JPY', label: 'Japanese Yen (¥)' },
];

const formSchema = z.object({
  customer_name: z.string().min(1, "Customer name is required"),
  order_status: z.enum(["Pending", "Processing", "Shipped", "Delivered", "Cancelled"]),
  material: z.string().min(1, "Material is required"),
  quantity: z.coerce.number().positive("Quantity must be greater than 0"),
  price: z.coerce.number().min(0, "Price must be 0 or greater"),
  currency: z.enum(CURRENCY_OPTIONS.map(c => c.value as any)),
  expected_payment_date: z.string().refine(value => !isNaN(Date.parse(value)), {
    message: "Invalid date format",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function SalesOrderForm({ onSuccess }: { onSuccess: () => void }) {
  const { user, isAuthenticated } = useAuth();
  const [businessPartners, setBusinessPartners] = useState<Pick<BusinessPartner, 'id' | 'bp_name' | 'bp_code'>[]>([]);
  const [materials, setMaterials] = useState<Pick<Material, 'id' | 'material_name' | 'material_code'>[]>([]);
  
  useEffect(() => {
    const loadData = async () => {
      const [bpData, materialsData] = await Promise.all([
        getBusinessPartnersForSelect(),
        getMaterialsForSelect()
      ]);
      setBusinessPartners(bpData);
      setMaterials(materialsData);
    };
    loadData();
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customer_name: "",
      order_status: "Pending",
      material: "",
      quantity: 1,
      price: 0,
      currency: "USD",
      expected_payment_date: new Date().toISOString().split('T')[0],
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: FormValues) {
    if (!isAuthenticated) {
      toast.error("You must be logged in to create a sales order");
      return;
    }

    try {
      const userId = user?.id || "mock-user-id";
      
      const newOrder = await createSalesOrder({
        customer_name: values.customer_name,
        order_status: values.order_status,
        material: values.material,
        quantity: values.quantity,
        price: values.price,
        currency: values.currency,
        expected_payment_date: values.expected_payment_date,
        user_id: userId,
      });

      if (newOrder) {
        form.reset();
        toast.success("Sales order created successfully");
        onSuccess();
      }
    } catch (error) {
      console.error("Error creating sales order:", error);
      toast.error("Failed to create sales order");
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Sales Order</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="customer_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Name</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a customer" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {businessPartners.map((bp) => (
                          <SelectItem key={bp.id} value={bp.bp_name}>
                            {bp.bp_name} ({bp.bp_code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="material"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Material</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a material" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {materials.map((material) => (
                          <SelectItem key={material.id} value={material.material_name}>
                            {material.material_name} ({material.material_code})
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
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="order_status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Processing">Processing</SelectItem>
                        <SelectItem value="Shipped">Shipped</SelectItem>
                        <SelectItem value="Delivered">Delivered</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="expected_payment_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Due Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Currency</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CURRENCY_OPTIONS.map((currency) => (
                          <SelectItem key={currency.value} value={currency.value}>
                            {currency.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <CardFooter className="px-0 pt-4">
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Creating..." : "Create Sales Order"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
