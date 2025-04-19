
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavigationItem } from "./types";
import { NavLink } from "react-router-dom";

interface MobileMenuProps {
  navigationItems: NavigationItem[];
  permissions: Record<string, boolean>;
  onClose: () => void;
}

export function MobileMenu({ navigationItems, permissions, onClose }: MobileMenuProps) {
  return (
    <Sheet>
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
                permissions[item.permission] && (
                  <li key={index} className="w-full">
                    <NavLink
                      to={item.href}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `group relative flex h-14 w-full items-center justify-start gap-4 px-3 transition-all hover:bg-primary/10 hover:text-primary ${
                          isActive ? "bg-primary/10 text-primary" : ""
                        }`
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
  );
}
