
import React from "react";

interface DashboardCardProps {
  className?: string;
  children: React.ReactNode;
}

export function DashboardCard({ className = "", children }: DashboardCardProps) {
  return (
    <div 
      className={`bg-card text-card-foreground rounded-lg border shadow-sm overflow-hidden ${className} transition-all duration-200 hover:shadow-md animate-in`}
    >
      {children}
    </div>
  );
}

interface DashboardCardHeaderProps {
  className?: string;
  children: React.ReactNode;
}

export function DashboardCardHeader({ className = "", children }: DashboardCardHeaderProps) {
  return (
    <div className={`p-6 flex flex-col space-y-1.5 ${className}`}>
      {children}
    </div>
  );
}

interface DashboardCardTitleProps {
  className?: string;
  children: React.ReactNode;
}

export function DashboardCardTitle({ className = "", children }: DashboardCardTitleProps) {
  return (
    <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>
      {children}
    </h3>
  );
}

interface DashboardCardDescriptionProps {
  className?: string;
  children: React.ReactNode;
}

export function DashboardCardDescription({ className = "", children }: DashboardCardDescriptionProps) {
  return (
    <p className={`text-sm text-muted-foreground ${className}`}>
      {children}
    </p>
  );
}

interface DashboardCardContentProps {
  className?: string;
  children: React.ReactNode;
}

export function DashboardCardContent({ className = "", children }: DashboardCardContentProps) {
  return (
    <div className={`p-6 pt-0 ${className}`}>
      {children}
    </div>
  );
}

interface DashboardCardFooterProps {
  className?: string;
  children: React.ReactNode;
}

export function DashboardCardFooter({ className = "", children }: DashboardCardFooterProps) {
  return (
    <div className={`flex items-center p-6 pt-0 ${className}`}>
      {children}
    </div>
  );
}
