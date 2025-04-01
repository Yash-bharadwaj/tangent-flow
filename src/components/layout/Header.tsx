
import { Bell, Search } from "lucide-react";
import { ThemeToggle } from "../ui/ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-white/5 bg-background/50 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/30">
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
                className="w-full p-2 pl-10 text-sm border border-white/10 rounded-xl focus:ring-2 
                          focus:ring-primary/20 focus:border-primary outline-none bg-white/5 backdrop-blur-lg 
                          transition-all duration-300"
                placeholder="Search anything..."
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="inline-flex items-center justify-center rounded-xl border border-white/10 backdrop-blur-lg 
                              bg-white/5 w-10 h-10 transition-all duration-300 hover:bg-white/10 relative">
              <Bell className="h-[1.2rem] w-[1.2rem]" />
              <span className="absolute top-2 right-2.5 flex h-2 w-2 rounded-full bg-destructive"></span>
            </button>
            
            <ThemeToggle />
            
            <div className="relative hidden md:flex items-center">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-white/10">
                  <div className="w-full h-full bg-primary/20 flex items-center justify-center text-primary">
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
