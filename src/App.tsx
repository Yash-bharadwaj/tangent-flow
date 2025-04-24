
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

import { AuthProvider, useAuth } from "./components/auth/AuthProvider";
import LoginPage from "./components/auth/LoginPage";
import Index from "./pages/Index";
import ModuleManagement from "./pages/ModuleManagement";
import SalesOrders from "./pages/SalesOrders";
import Inventory from "./pages/Inventory";
import UserManagement from "./pages/UserManagement";
import DeliveryTracking from "./pages/DeliveryTracking";
import NotFound from "./pages/NotFound";
import BusinessPartners from "./pages/BusinessPartners";
import Materials from "./pages/Materials";
import { Sidebar } from "./components/layout/Sidebar";
import { RightSidebar } from "./components/layout/RightSidebar";
import { useEffect } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  useEffect(() => {
    console.log("ProtectedRoute check:", { isAuthenticated, path: location.pathname });
  }, [isAuthenticated, location]);
  
  if (!isAuthenticated) {
    console.log("Not authenticated, redirecting to login from ProtectedRoute");
    return <Navigate to="/login" replace />;
  }
  
  console.log("Authenticated, rendering protected content");
  return (
    <div className="flex min-h-screen bg-background pattern-waves-bg">
      <Sidebar />
      <div className="flex-1 w-full relative">
        {children}
      </div>
      <RightSidebar />
    </div>
  );
};

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
    <Route path="/modules" element={<ProtectedRoute><ModuleManagement /></ProtectedRoute>} />
    <Route path="/sales-orders" element={<ProtectedRoute><SalesOrders /></ProtectedRoute>} />
    <Route path="/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
    <Route path="/users" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
    <Route path="/deliveries" element={<ProtectedRoute><DeliveryTracking /></ProtectedRoute>} />
    <Route path="/business-partners" element={<ProtectedRoute><BusinessPartners /></ProtectedRoute>} />
    <Route path="/materials" element={<ProtectedRoute><Materials /></ProtectedRoute>} />
    <Route path="*" element={<ProtectedRoute><NotFound /></ProtectedRoute>} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
