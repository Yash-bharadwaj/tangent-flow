
import { useEffect, useState } from "react";
import { useSidebar } from "../ui/sidebar";

interface ContentWrapperProps {
  children: React.ReactNode;
}

export const ContentWrapper = ({ children }: ContentWrapperProps) => {
  const { state: leftSidebarState } = useSidebar();
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);

  // Listen for right sidebar toggle events
  useEffect(() => {
    const handleRightSidebarToggle = (e: CustomEvent) => {
      setRightSidebarOpen(e.detail.isOpen);
    };

    window.addEventListener('rightSidebarToggle', handleRightSidebarToggle as EventListener);
    return () => {
      window.removeEventListener('rightSidebarToggle', handleRightSidebarToggle as EventListener);
    };
  }, []);

  return (
    <main 
      className={`
        flex-1 min-h-screen transition-all duration-300 ease-in-out
        ${leftSidebarState === "expanded" ? "lg:ml-72" : "lg:ml-20"}
        ${rightSidebarOpen ? "lg:mr-72" : "lg:mr-0"}
        ${leftSidebarState === "expanded" && rightSidebarOpen ? "max-w-[calc(100%-36rem)]" : ""}
        ${leftSidebarState === "expanded" && !rightSidebarOpen ? "max-w-[calc(100%-18rem)]" : ""}
        ${leftSidebarState !== "expanded" && rightSidebarOpen ? "max-w-[calc(100%-23rem)]" : ""}
      `}
    >
      {children}
    </main>
  );
};
