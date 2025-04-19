import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LayoutDashboard,
  Settings,
  Users,
  Package2,
  Truck,
  Boxes,
  LogOut,
  Menu,
} from "lucide-react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

interface UserPermissions {
  canViewDashboard: boolean;
  canViewModules: boolean;
  canManageUsers: boolean;
  canViewSalesOrders: boolean;
  canViewInventory: boolean;
  canViewDeliveries: boolean;
  canViewBusinessPartners: boolean;
  canManageBusinessPartners: boolean;
}

const useUserPermissions = (): UserPermissions => {
  const { user } = useAuth();
  
  // Default permissions - very permissive for now
  return {
    canViewDashboard: true,
    canViewModules: true,
    canManageUsers: true,
    canViewSalesOrders: true,
    canViewInventory: true,
    canViewDeliveries: true,
    canViewBusinessPartners: true,
    canManageBusinessPartners: true,
  };
};

export function Sidebar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const permissions = useUserPermissions();

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  const navigationItems = [
    {
      name: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
      permission: "canViewDashboard",
      current: pathname === "/",
    },
    {
      name: "Modules",
      href: "/modules",
      icon: Boxes,
      permission: "canViewModules",
      current: pathname === "/modules",
    },
    {
      name: "User Management",
      href: "/users",
      icon: Users,
      permission: "canManageUsers",
      current: pathname === "/users",
    },
    {
      name: "Sales Orders",
      href: "/sales-orders",
      icon: Package2,
      permission: "canViewSalesOrders",
      current: pathname === "/sales-orders",
    },
    {
      name: "Business Partners",
      href: "/business-partners",
      icon: Users,
      permission: "canViewBusinessPartners",
      current: pathname === "/business-partners",
    },
    {
      name: "Inventory",
      href: "/inventory",
      icon: Boxes,
      permission: "canViewInventory",
      current: pathname === "/inventory",
    },
    {
      name: "Delivery Tracking",
      href: "/deliveries",
      icon: Truck,
      permission: "canViewDeliveries",
      current: pathname === "/deliveries",
    },
  ];

  return (
    <>
      <aside className="fixed left-0 top-0 z-50 flex h-full w-[72px] flex-col gap-2 border-r bg-secondary/80 backdrop-blur-sm">
        <Link to="/" className="p-3">
          <img src="/acme-logo.svg" alt="Logo" width="32" height="32" />
        </Link>

        <nav className="flex-1">
          <ul className="grid h-full place-items-start gap-2">
            {navigationItems.map(
              (item, index) =>
                permissions[item.permission as keyof UserPermissions] && (
                  <li key={index}>
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        `group relative flex h-14 w-full items-center justify-center px-3 transition-all hover:bg-primary/10 hover:text-primary data-[active=true]:bg-primary/10 data-[active=true]:text-primary`
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="sr-only">{item.name}</span>
                    </NavLink>
                  </li>
                )
            )}
          </ul>
        </nav>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="group relative flex h-14 w-full items-center justify-center px-3 transition-all hover:bg-primary/10 hover:text-primary"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar_url || ""} alt={user?.full_name || "User Avatar"} />
                <AvatarFallback>{user?.full_name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <span className="sr-only">Open user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" forceMount className="w-36">
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleSignOut}
              className="cursor-pointer focus:bg-accent focus:text-accent-foreground"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </aside>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="absolute left-3 top-3 rounded-full p-2 lg:hidden"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="flex w-full flex-col gap-2 border-r bg-secondary/80 backdrop-blur-sm md:w-[300px]"
        >
          <SheetHeader className="text-left">
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription>
              Navigate through the application.
            </SheetDescription>
          </SheetHeader>

          <nav className="flex-1">
            <ul className="grid h-full place-items-start gap-2">
              {navigationItems.map(
                (item, index) =>
                  permissions[item.permission as keyof UserPermissions] && (
                    <li key={index}>
                      <NavLink
                        to={item.href}
                        className={({ isActive }) =>
                          `group relative flex h-14 w-full items-center justify-start gap-4 px-3 transition-all hover:bg-primary/10 hover:text-primary data-[active=true]:bg-primary/10 data-[active=true]:text-primary`
                        }
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </NavLink>
                    </li>
                  )
              )}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}
