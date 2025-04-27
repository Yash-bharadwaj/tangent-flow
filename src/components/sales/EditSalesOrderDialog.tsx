import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateSalesOrder } from "@/services/salesOrders";
import { SalesOrder } from "@/types/database";

const formSchema = z.object({
  order_number: z.string().min(1, "Order number is required"),
  customer_name: z.string().min(1, "Customer name is required"),
  order_status: z.enum(["Pending", "Processing", "Shipped", "Delivered", "Cancelled"]),
  material: z.string().min(1, "Material is required"),
  quantity: z.coerce.number().positive("Quantity must be greater than 0"),
  price: z.coerce.number().min(0, "Price must be 0 or greater"),
  expected_payment_date: z.string().refine(value => !isNaN(Date.parse(value)), {
    message: "Invalid date format",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface EditSalesOrderDialogProps {
  salesOrder: SalesOrder | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function EditSalesOrderDialog({ salesOrder, open, onOpenChange, onSuccess }: EditSalesOrderDialogProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      order_number: salesOrder?.order_number || "",
      customer_name: salesOrder?.customer_name || "",
      order_status: (salesOrder?.order_status as any) || "Pending",
      material: salesOrder?.material || "",
      quantity: salesOrder?.quantity || 1,
      price: salesOrder?.price || 0,
      expected_payment_date: salesOrder?.expected_payment_date
        ? typeof salesOrder.expected_payment_date === 'string'
          ? salesOrder.expected_payment_date.split('T')[0]
          : new Date(salesOrder.expected_payment_date).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0],
    },
  });

  React.useEffect(() => {
    if (salesOrder) {
      form.reset({
        order_number: salesOrder.order_number || "",
        customer_name: salesOrder.customer_name || "",
        order_status: (salesOrder.order_status as any) || "Pending",
        material: salesOrder.material || "",
        quantity: salesOrder.quantity || 1,
        price: salesOrder.price || 0,
        expected_payment_date: salesOrder.expected_payment_date
          ? typeof salesOrder.expected_payment_date === 'string'
            ? salesOrder.expected_payment_date.split('T')[0]
            : new Date(salesOrder.expected_payment_date).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0],
      });
    }
  }, [salesOrder, form]);

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: FormValues) {
    if (!salesOrder?.id) return;

    try {
      const updated = await updateSalesOrder(salesOrder.id, values);
      if (updated) {
        onOpenChange(false);
        onSuccess();
      }
    } catch (error) {
      console.error("Error updating sales order:", error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Sales Order</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
