import { DataTable } from "../components/ui/DataTable";
import { moduleData } from "../lib/mockData";
import { DashboardCard, DashboardCardContent, DashboardCardHeader, DashboardCardTitle } from "../components/dashboard/DashboardCard";
import { Check, X } from "lucide-react";

const ModuleManagement = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Module Management</h1>
        <p className="text-muted-foreground">
          View and manage system modules.
        </p>
      </div>
      
      <DashboardCard>
        <DashboardCardHeader>
          <DashboardCardTitle>System Modules</DashboardCardTitle>
        </DashboardCardHeader>
        <DashboardCardContent>
          <DataTable
            data={moduleData}
            columns={[
              { header: "ID", accessor: "moduleid" },
              { header: "Module Name", accessor: "modulename" },
              { 
                header: "Status", 
                accessor: "enabled",
                cell: (item) => (
                  <span className={`flex items-center ${item.enabled ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {item.enabled ? <Check className="h-4 w-4 mr-1" /> : <X className="h-4 w-4 mr-1" />}
                    {item.enabled ? 'Enabled' : 'Disabled'}
                  </span>
                )
              },
              { header: "Display Order", accessor: "displayorder" },
            ]}
            searchKeys={["modulename"]}
          />
        </DashboardCardContent>
      </DashboardCard>
    </div>
  );
};

export default ModuleManagement;