
import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface ClockProps {
  timezone: string;
  label: string;
}

const SingleClock = ({ timezone, label }: ClockProps) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true,
        timeZone: timezone
      };
      
      const formatter = new Intl.DateTimeFormat('en-US', options);
      setTime(formatter.format(new Date()));
    };

    // Update immediately and then set interval
    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, [timezone]);

  return (
    <div className="flex flex-col items-center">
      <div className="text-xs text-sidebar-foreground/70 font-medium">{label}</div>
      <div className="text-sm font-bold">{time}</div>
    </div>
  );
};

export function WorldClocks() {
  return (
    <div className="p-3 bg-sidebar-accent/30 rounded-md">
      <div className="flex items-center gap-2 mb-2">
        <Clock className="h-4 w-4 text-sidebar-foreground/70" />
        <span className="text-xs font-medium text-sidebar-foreground/70">World Time</span>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <SingleClock timezone="Asia/Kolkata" label="India" />
        <SingleClock timezone="America/New_York" label="US (ET)" />
      </div>
    </div>
  );
}
