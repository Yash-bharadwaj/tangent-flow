
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider, useAuth } from "./components/auth/AuthProvider";
import LoginPage from "./components/auth/LoginPage";
import Index from "./pages/Index";
import ModuleManagement from "./pages/ModuleManagement";
import SalesOrders from "./pages/SalesOrders";
import Inventory from "./pages/Inventory";
import UserManagement from "./pages/UserManagement";
import DeliveryTracking from "./pages/DeliveryTracking";
import NotFound from "./pages/NotFound";
import { Sidebar } from "./components/layout/Sidebar";
import { RightSidebar } from "./components/layout/RightSidebar";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 relative">
        {children}
      </main>
      <RightSidebar />
    </div>
  );
};

// We need this wrapper to use the AuthProvider context
const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
    <Route path="/modules" element={<ProtectedRoute><ModuleManagement /></ProtectedRoute>} />
    <Route path="/sales-orders" element={<ProtectedRoute><SalesOrders /></ProtectedRoute>} />
    <Route path="/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
    <Route path="/users" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
    <Route path="/deliveries" element={<ProtectedRoute><DeliveryTracking /></ProtectedRoute>} />
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
