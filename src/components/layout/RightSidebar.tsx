
import { useState, useEffect } from "react";
import { 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";
import { SidebarContent } from "../sidebar/SidebarContent";

export function RightSidebar() {
  const [isOpen, setIsOpen] = useState(true);

  // Dispatch custom event when sidebar state changes
  useEffect(() => {
    const event = new CustomEvent('rightsidebar-toggle', { 
      detail: { isOpen } 
    });
    window.dispatchEvent(event);
  }, [isOpen]);

  return (
    <div className="relative h-full">
      {/* Toggle button - positioned to the left of the sidebar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed ${isOpen ? "right-72" : "right-0"} top-20 z-30 flex h-10 w-10 items-center justify-center rounded-full 
                   border border-white/10 bg-background/80 shadow-xl backdrop-blur-lg transition-all duration-300 
                   hover:bg-accent/20 dark:hover:bg-white/10`}
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? (
          <ChevronRight className="h-5 w-5" />
        ) : (
          <ChevronLeft className="h-5 w-5" />
        )}
      </button>

      {/* Sidebar */}
      <div
        data-state={isOpen ? "open" : "closed"}
        className={`fixed right-0 top-0 z-20 h-full w-72 transform overflow-y-auto 
                    backdrop-blur-xl bg-white/10 dark:bg-black/30 border-l border-black/5 dark:border-white/5 
                    pattern-waves transition-all duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center border-b border-black/5 dark:border-white/5 px-4">
          <h2 className="text-base font-semibold tracking-wide">Tools</h2>
        </div>
        <SidebarContent />
      </div>
    </div>
  );
}
