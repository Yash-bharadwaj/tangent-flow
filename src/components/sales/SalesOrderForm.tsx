
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createSalesOrder, SalesOrder } from "@/services/supabase";
import { useAuth } from "@/components/auth/AuthProvider";
import { toast } from "sonner";

const formSchema = z.object({
  order_number: z.string().min(1, "Order number is required"),
  customer_name: z.string().min(1, "Customer name is required"),
  order_status: z.enum(["Pending", "Processing", "Shipped", "Delivered", "Cancelled"]),
  material: z.string().min(1, "Material is required"),
  quantity: z.coerce.number().positive("Quantity must be greater than 0"),
  expected_payment_date: z.string().refine(value => !isNaN(Date.parse(value)), {
    message: "Invalid date format",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function SalesOrderForm({ onSuccess }: { onSuccess: () => void }) {
  const { user } = useAuth();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      order_number: "",
      customer_name: "",
      order_status: "Pending",
      material: "",
      quantity: 1,
      expected_payment_date: new Date().toISOString().split('T')[0],
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: FormValues) {
    if (!user?.id) {
      toast.error("You must be logged in to create a sales order");
      return;
    }

    try {
      const newOrder = await createSalesOrder({
        ...values,
        user_id: user.id,
      });

      if (newOrder) {
        form.reset();
        onSuccess();
      }
    } catch (error) {
      console.error("Error creating sales order:", error);
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
                name="order_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Order Number</FormLabel>
                    <FormControl>
                      <Input placeholder="SO-12345" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="customer_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Customer name" {...field} />
                    </FormControl>
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
                    <FormControl>
                      <Input placeholder="Material name" {...field} />
                    </FormControl>
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
