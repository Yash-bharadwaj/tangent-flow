
import { Bell, Search } from "lucide-react";
import { ThemeToggle } from "../ui/ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-black/5 dark:border-white/5 bg-white/50 dark:bg-black/50 backdrop-blur-2xl">
      <div className="flex h-12 items-center px-4">
        <div className="flex flex-1 items-center justify-between">
          <div className="hidden md:flex md:gap-2 lg:gap-10">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-4 h-4 text-muted-foreground" />
              </div>
              <input
                type="text"
                className="w-full p-2 pl-10 text-sm rounded-xl focus:ring-2 
                          focus:ring-primary/20 focus:border-primary outline-none 
                          bg-white/10 dark:bg-black/10 backdrop-blur-lg border border-black/5 dark:border-white/10
                          transition-all duration-300"
                placeholder="Search anything..."
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="inline-flex items-center justify-center rounded-xl border border-black/5 dark:border-white/10
                              backdrop-blur-lg bg-white/10 dark:bg-black/10 w-8 h-8 
                              transition-all duration-300 hover:bg-white/20 dark:hover:bg-white/5 relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 flex h-2 w-2 rounded-full bg-destructive"></span>
            </button>
            
            <ThemeToggle />
            
            <div className="relative hidden md:flex items-center">
              <div className="flex items-center gap-2">
                <div className="relative w-8 h-8 rounded-xl overflow-hidden border border-black/5 dark:border-white/10">
                  <div className="w-full h-full bg-primary/20 flex items-center justify-center text-primary text-xs">
                    AU
                  </div>
                </div>
                <div className="hidden lg:block">
                  <p className="text-xs font-medium leading-none">Admin User</p>
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
