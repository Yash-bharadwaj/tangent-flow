
import { useEffect, useState } from 'react';
import { getOrders, subscribeToOrders } from '@/services/supabase';
import { Order } from '@/types/database';
import { useAuth } from '@/components/auth/AuthProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

export const RealTimeOrdersList = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.id) return;

    const fetchOrders = async () => {
      const data = await getOrders(user.id);
      setOrders(data);
      setLoading(false);
    };

    fetchOrders();

    // Set up real-time subscription
    const channel = subscribeToOrders(user.id, (payload) => {
      console.log('Realtime update received:', payload);
      
      if (payload.eventType === 'INSERT') {
        setOrders(prev => [payload.new as Order, ...prev]);
      } else if (payload.eventType === 'UPDATE') {
        setOrders(prev => 
          prev.map(order => order.id === payload.new.id ? (payload.new as Order) : order)
        );
      } else if (payload.eventType === 'DELETE') {
        setOrders(prev => prev.filter(order => order.id !== payload.old.id));
      }
    });

    return () => {
      channel.unsubscribe();
    };
  }, [user]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Orders</CardTitle>
          <CardDescription>Loading your recent orders...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Orders</CardTitle>
        <CardDescription>View your recent orders and their status</CardDescription>
      </CardHeader>
      <CardContent>
        {orders.length === 0 ? (
          <p className="text-center py-4 text-muted-foreground">No orders found</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id.substring(0, 8)}</TableCell>
                  <TableCell>
                    <span className={`
                      status-pill
                      ${order.status === "Delivered" ? "status-pill-success" : 
                        order.status === "Processing" ? "status-pill-info" : 
                        order.status === "Shipped" ? "status-pill-info" : 
                        order.status === "Cancelled" ? "status-pill-danger" : 
                        "status-pill-warning"}
                    `}>
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell>${Number(order.total_amount).toFixed(2)}</TableCell>
                  <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default RealTimeOrdersList;
