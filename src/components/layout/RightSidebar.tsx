
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
        className="absolute left-0 top-20 z-30 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border bg-background shadow-md"
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 z-20 h-full w-64 transform overflow-y-auto border-l bg-sidebar transition-all duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center border-b px-4">
          <h2 className="text-sm font-semibold">Tools</h2>
        </div>
        <SidebarContent />
      </div>
    </div>
  );
}
