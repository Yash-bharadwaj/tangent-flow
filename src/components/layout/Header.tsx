
import { Bell, Search } from "lucide-react";
import { ThemeToggle } from "../ui/ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-6">
        <div className="flex flex-1 items-center justify-between">
          <div className="hidden md:flex md:gap-2 lg:gap-10">
            {/* Main search bar */}
            <div className="relative w-full max-w-md">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-4 h-4 text-muted-foreground" />
              </div>
              <input
                type="text"
                className="w-full p-2 pl-10 text-sm border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-background"
                placeholder="Search anything..."
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="inline-flex items-center justify-center rounded-md w-9 h-9 transition-colors hover:bg-muted relative">
              <Bell className="h-[1.2rem] w-[1.2rem]" />
              <span className="absolute top-1 right-1.5 flex h-2 w-2 rounded-full bg-destructive"></span>
            </button>
            
            <ThemeToggle />
            
            <div className="relative hidden md:flex items-center">
              <div className="flex items-center gap-2">
                <div className="relative w-8 h-8 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary">
                    AU
                  </div>
                </div>
                <div className="hidden lg:block">
                  <p className="text-sm font-medium leading-none">Admin User</p>
                  <p className="text-xs text-muted-foreground">admin@example.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
