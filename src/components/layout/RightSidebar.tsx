
import { useState } from "react";
import { 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";
import { SidebarContent } from "../sidebar/SidebarContent";

export function RightSidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="relative h-full">
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute left-0 top-20 z-30 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full 
                 border border-white/10 bg-background shadow-xl backdrop-blur-lg transition-all duration-300 hover:bg-white/10"
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
        className={`fixed right-0 top-0 z-20 h-full w-72 transform overflow-y-auto border-l border-white/5 
                  premium-gradient transition-all duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center border-b border-white/5 px-4">
          <h2 className="text-base font-semibold tracking-wide">Tools</h2>
        </div>
        <SidebarContent />
      </div>
    </div>
  );
}
