
import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MobileMenu } from "./MobileMenu";
import { UserMenu } from "./UserMenu";
import { useUserPermissions } from "./usePermissions";
import { getNavigationItems } from "./navigation";

export function Sidebar() {
  const location = useLocation();
  const { pathname } = location;
  const [expanded, setExpanded] = useState(() => {
    const savedState = localStorage.getItem('sidebar-expanded');
    return savedState !== null ? savedState === 'true' : true;
  });
  
  const permissions = useUserPermissions();
  const navigationItems = getNavigationItems(pathname);

  // Save sidebar state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('sidebar-expanded', String(expanded));
  }, [expanded]);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <aside 
        className={`fixed left-0 top-0 z-50 flex h-full ${
          expanded ? "w-64" : "w-[72px]"
        } flex-col gap-2 border-r bg-secondary/80 backdrop-blur-sm transition-all duration-300`}
      >
        {/* Toggle button */}
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-20 z-30 flex h-6 w-6 items-center justify-center rounded-full 
                   border border-white/10 bg-background shadow-md"
          aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {expanded ? (
            <ChevronLeft className="h-3 w-3" />
          ) : (
            <ChevronRight className="h-3 w-3" />
          )}
        </button>

        <Link to="/" className="flex items-center p-3">
          <img src="/acme-logo.svg" alt="Logo" width="32" height="32" />
          {expanded && <span className="ml-3 font-semibold">ACME ERP</span>}
        </Link>

        <nav className="flex-1">
          <ul className="grid h-full place-items-start gap-2">
            {navigationItems.map(
              (item, index) =>
                permissions[item.permission] && (
                  <li key={index} className="w-full">
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        `group relative flex h-14 w-full items-center ${expanded ? "justify-start px-3" : "justify-center px-3"} transition-all hover:bg-primary/10 hover:text-primary ${
                          isActive ? "bg-primary/10 text-primary" : ""
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      {expanded && <span className="ml-3">{item.name}</span>}
                      {!expanded && <span className="sr-only">{item.name}</span>}
                    </NavLink>
                  </li>
                )
            )}
          </ul>
        </nav>

        <UserMenu expanded={expanded} />
      </aside>

      {/* Mobile menu */}
      <MobileMenu 
        navigationItems={navigationItems}
        permissions={permissions}
        onClose={() => {}}
      />
    </>
  );
}
