
import { WorldClocks } from "./WorldClocks";
import { SidebarCalendar } from "./SidebarCalendar";
import { Calculator } from "./Calculator";
import { ChatBot } from "./ChatBot";
import { useAuth } from "../auth/AuthProvider";

export function SidebarContent() {
  const { userRole } = useAuth();

  return (
    <div className="flex flex-col gap-4 p-4">
      <WorldClocks />
      <SidebarCalendar />
      <Calculator />
      <ChatBot />
      {userRole === "customer" && (
        <div className="px-3 py-4 bg-sidebar-accent/30 rounded-md">
          <h3 className="text-sm font-medium mb-2">Customer Portal</h3>
          <p className="text-xs text-sidebar-foreground/70">
            Welcome to your customer portal. Here you can track your orders and deliveries.
          </p>
        </div>
      )}
    </div>
  );
}
