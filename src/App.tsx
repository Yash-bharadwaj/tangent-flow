
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ModuleManagement from "./pages/ModuleManagement";
import SalesOrders from "./pages/SalesOrders";
import Inventory from "./pages/Inventory";
import UserManagement from "./pages/UserManagement";
import DeliveryTracking from "./pages/DeliveryTracking";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/modules" element={<ModuleManagement />} />
          <Route path="/sales-orders" element={<SalesOrders />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/deliveries" element={<DeliveryTracking />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
