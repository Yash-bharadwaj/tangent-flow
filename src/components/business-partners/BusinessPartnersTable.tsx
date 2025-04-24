
import { DataTable } from "@/components/ui/DataTable";
import { type BusinessPartner } from "@/types/businessPartner";

interface BusinessPartnersTableProps {
  data: BusinessPartner[];
  isLoading?: boolean;
  onRefresh?: () => void;
}

export function BusinessPartnersTable({ data, isLoading, onRefresh }: BusinessPartnersTableProps) {
  const columns = [
    {
      header: "BP Code",
      accessor: "bp_code" as const,
    },
    {
      header: "Name",
      accessor: "bp_name" as const,
    },
    {
      header: "Contact Person",
      accessor: "contact_person" as const,
    },
    {
      header: "Payment Terms",
      accessor: "payment_terms" as const,
    },
    {
      header: "Type",
      accessor: "bp_type" as const,
    },
    {
      header: "Email",
      accessor: "email" as const,
    },
    {
      header: "Phone",
      accessor: "phone_number" as const,
      cell: (item: BusinessPartner) => (
        <span>
          {item.phone_country} {item.phone_number}
        </span>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      isLoading={isLoading}
      searchable
      searchKeys={["bp_code", "bp_name", "contact_person", "email"]}
    />
  );
}
