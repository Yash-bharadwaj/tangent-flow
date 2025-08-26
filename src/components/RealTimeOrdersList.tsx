
import { useEffect, useState } from 'react';
import { getOrders, getOrdersForUser, subscribeToOrders } from '@/services/supabase';
import { SalesOrder as Order } from '@/types/database';
import { useAuth } from '@/components/auth/AuthProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import '@/styles/status-pills.css';

export const RealTimeOrdersList = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, userRole } = useAuth();

  useEffect(() => {
    if (!user?.id) return;

    const fetchOrders = async () => {
      try {
        // Get all orders for admins, or just user's orders for customers
        const data = userRole === 'admin' 
          ? await getOrders()
          : await getOrdersForUser(user.id);
          
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();

    // Set up real-time subscription
    const channel = subscribeToOrders((payload) => {
      console.log('Realtime update received:', payload);
      
      if (userRole !== 'admin' && payload.new.user_id !== user.id) {
        // Skip updates for orders that don't belong to this user (unless admin)
        return;
      }
      
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
  }, [user, userRole]);

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
        <CardTitle>{userRole === 'admin' ? 'All Orders' : 'Your Orders'}</CardTitle>
        <CardDescription>
          {userRole === 'admin' 
            ? 'View all customer orders and their status' 
            : 'View your recent orders and their status'
          }
        </CardDescription>
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
                    ${order.order_status === "Delivered" ? "status-pill-success" : 
                      order.order_status === "Processing" ? "status-pill-info" : 
                      order.order_status === "Shipped" ? "status-pill-info" : 
                      order.order_status === "Cancelled" ? "status-pill-danger" : 
                      "status-pill-warning"}
                  `}>
                    {order.order_status}
                  </span>
                </TableCell>
                <TableCell>${Number(order.price || 0).toFixed(2)}</TableCell>
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
