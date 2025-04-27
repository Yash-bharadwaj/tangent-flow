
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { SalesOrder } from "@/types/database";

interface SalesOrdersTableProps {
  data: SalesOrder[];
  isLoading: boolean;
  onEdit: (order: SalesOrder) => void;
  onDelete: (id: string) => void;
}

export function SalesOrdersTable({ data, isLoading, onEdit, onDelete }: SalesOrdersTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order No.</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Material</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Payment Due</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 rounded-full bg-primary/60 animate-pulse"></div>
                      <div className="w-4 h-4 rounded-full bg-primary/60 animate-pulse delay-150"></div>
                      <div className="w-4 h-4 rounded-full bg-primary/60 animate-pulse delay-300"></div>
                    </div>
                  </TableCell>
                </TableRow>
              ) : data.length > 0 ? (
                data.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.order_number}</TableCell>
                    <TableCell>{order.customer_name}</TableCell>
                    <TableCell>
                      <span className={`
                        status-pill
                        ${order.order_status === "Delivered" ? "status-pill-success" : 
                          order.order_status === "Processing" ? "status-pill-info" : 
                          order.order_status === "Shipped" ? "status-pill-info" : 
                          order.order_status === "Cancelled" ? "status-pill-danger" : 
                          "status-pill-warning"}
                      `}>
                        {order.order_status}
                      </span>
                    </TableCell>
                    <TableCell>{order.material}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>${order.price.toFixed(2)}</TableCell>
                    <TableCell>{formatDate(order.expected_payment_date)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => onEdit(order)}
                        >
                          <PencilIcon className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => onDelete(order.id)}
                        >
                          <TrashIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    No sales orders found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
