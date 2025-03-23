
import { WorldClocks } from "./WorldClocks";
import { SidebarCalendar } from "./SidebarCalendar";
import { Calculator } from "./Calculator";

export function SidebarContent() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <WorldClocks />
      <SidebarCalendar />
      <Calculator />
    </div>
  );
}
