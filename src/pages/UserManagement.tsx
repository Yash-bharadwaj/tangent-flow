
import { Header } from "../components/layout/Header";
import { Sidebar } from "../components/layout/Sidebar";
import { DataTable } from "../components/ui/DataTable";
import { userData } from "../lib/mockData";
import { DashboardCard, DashboardCardContent, DashboardCardHeader, DashboardCardTitle } from "../components/dashboard/DashboardCard";

const UserManagement = () => {
  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar />
      
      <main className="flex-1 lg:pl-72 transition-all duration-300 ease-in-out">
        <Header />
        
        <div className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">User Management</h1>
            <p className="text-muted-foreground">
              View and manage system users and their roles.
            </p>
          </div>
          
          <DashboardCard>
            <DashboardCardHeader>
              <DashboardCardTitle>System Users</DashboardCardTitle>
            </DashboardCardHeader>
            <DashboardCardContent>
              <DataTable
                data={userData}
                columns={[
                  { header: "ID", accessor: "userId" },
                  { header: "Username", accessor: "username" },
                  { header: "Full Name", accessor: "fullName" },
                  { header: "Email", accessor: "email" },
                  { 
                    header: "Role", 
                    accessor: "role",
                    cell: (item) => (
                      <span className={`
                        status-pill
                        ${item.role === "Supervisor" ? "status-pill-info" : 
                          item.role === "Operator" ? "status-pill-success" : 
                          "status-pill-neutral"}
                      `}>
                        {item.role}
                      </span>
                    )
                  },
                  { header: "Department", accessor: "department" },
                  { 
                    header: "Status", 
                    accessor: "status",
                    cell: (item) => (
                      <span className={`
                        status-pill
                        ${item.status === "Active" ? "status-pill-success" : "status-pill-danger"}
                      `}>
                        {item.status}
                      </span>
                    )
                  },
                ]}
                searchKeys={["username", "fullName", "email", "department"]}
              />
            </DashboardCardContent>
          </DashboardCard>
        </div>
      </main>
    </div>
  );
};

export default UserManagement;
