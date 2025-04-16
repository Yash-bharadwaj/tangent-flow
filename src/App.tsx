
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
import { Sidebar } from "./components/layout/Sidebar";
import { RightSidebar } from "./components/layout/RightSidebar";
import { useEffect, useState } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Protected route component with dynamic content adjustment
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  
  useEffect(() => {
    console.log("ProtectedRoute check:", { isAuthenticated, path: location.pathname });
    
    // Listen for custom events from the sidebars to track their state
    const handleLeftSidebarToggle = (e: CustomEvent) => {
      setLeftSidebarOpen(e.detail.isOpen);
    };
    
    const handleRightSidebarToggle = (e: CustomEvent) => {
      setRightSidebarOpen(e.detail.isOpen);
    };
    
    window.addEventListener('leftsidebar-toggle' as any, handleLeftSidebarToggle as EventListener);
    window.addEventListener('rightsidebar-toggle' as any, handleRightSidebarToggle as EventListener);
    
    return () => {
      window.removeEventListener('leftsidebar-toggle' as any, handleLeftSidebarToggle as EventListener);
      window.removeEventListener('rightsidebar-toggle' as any, handleRightSidebarToggle as EventListener);
    };
  }, [isAuthenticated, location]);
  
  if (!isAuthenticated) {
    console.log("Not authenticated, redirecting to login from ProtectedRoute");
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div className="flex min-h-screen bg-background pattern-waves-bg">
      <Sidebar />
      <div 
        id="main-content"
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out
                   ${leftSidebarOpen ? 'ml-72' : 'ml-20'} 
                   ${rightSidebarOpen ? 'mr-72' : 'mr-0'}
                   sm:${leftSidebarOpen ? 'ml-72' : 'ml-20'}
                   sm:${rightSidebarOpen ? 'mr-72' : 'mr-0'}`}
      >
        {children}
      </div>
      <RightSidebar />
    </div>
  );
};

// Inner routes component wrapped with AuthProvider
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

// App component with all providers
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
