
import { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

export function SidebarCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="p-3 bg-sidebar-accent/30 rounded-md">
      <div className="flex items-center gap-2 mb-2">
        <CalendarIcon className="h-4 w-4 text-sidebar-foreground/70" />
        <span className="text-xs font-medium text-sidebar-foreground/70">Calendar</span>
      </div>
      
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="p-0 border-none"
      />
    </div>
  );
}
