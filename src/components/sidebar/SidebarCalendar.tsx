
import { useState } from "react";
import { Calendar as CalendarIcon, ChevronDown, ChevronUp } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export function SidebarCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-3 bg-sidebar-accent/30 rounded-md">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-sidebar-foreground/70" />
            <span className="text-xs font-medium text-sidebar-foreground/70">Calendar</span>
          </div>
          <div className="flex items-center">
            <span className="text-xs mr-2">{date?.toLocaleDateString()}</span>
            {isOpen ? (
              <ChevronUp className="h-3 w-3 text-sidebar-foreground/70" />
            ) : (
              <ChevronDown className="h-3 w-3 text-sidebar-foreground/70" />
            )}
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="p-0 border-none"
          />
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
