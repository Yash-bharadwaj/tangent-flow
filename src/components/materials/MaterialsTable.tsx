
import { Material } from "@/types/material";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type MaterialsTableProps = {
  data: Material[];
  isLoading?: boolean;
};

export function MaterialsTable({ data, isLoading }: MaterialsTableProps) {
  if (isLoading) {
    return <div>Loading materials...</div>;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Material Code</TableHead>
            <TableHead>Material Name</TableHead>
            <TableHead>Product Type</TableHead>
            <TableHead>UOM</TableHead>
            <TableHead>Specification</TableHead>
            <TableHead>Procurement Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((material) => (
            <TableRow key={material.id}>
              <TableCell>{material.material_code}</TableCell>
              <TableCell>{material.material_name}</TableCell>
              <TableCell>{material.product_type}</TableCell>
              <TableCell>{material.uom}</TableCell>
              <TableCell>{material.specification}</TableCell>
              <TableCell>{material.procurement_type}</TableCell>
            </TableRow>
          ))}
          {data.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No materials found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
