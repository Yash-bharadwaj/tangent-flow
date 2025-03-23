
import React, { useState } from "react";
import { Search } from "lucide-react";

interface Column<T> {
  header: string;
  accessor: keyof T;
  cell?: (item: T) => React.ReactNode;
  isSortable?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  searchable?: boolean;
  searchKeys?: Array<keyof T>;
  sortable?: boolean;
  onRowClick?: (item: T) => void;
  className?: string;
}

export function DataTable<T>({
  data,
  columns,
  isLoading = false,
  searchable = true,
  searchKeys,
  sortable = true,
  onRowClick,
  className = "",
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: "ascending" | "descending" | null;
  }>({
    key: null,
    direction: null,
  });

  // Filter data based on search term
  const filteredData = React.useMemo(() => {
    if (!searchTerm || !searchKeys?.length) return data;

    return data.filter((item) =>
      searchKeys.some((key) => {
        const value = item[key];
        if (typeof value === "string") {
          return value.toLowerCase().includes(searchTerm.toLowerCase());
        }
        if (typeof value === "number") {
          return value.toString().includes(searchTerm);
        }
        return false;
      })
    );
  }, [data, searchTerm, searchKeys]);

  // Sort data based on sort config
  const sortedData = React.useMemo(() => {
    if (!sortConfig.key || !sortConfig.direction) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key!];
      const bValue = b[sortConfig.key!];
      
      if (aValue === bValue) return 0;
      
      const comparison = aValue < bValue ? -1 : 1;
      return sortConfig.direction === "ascending" ? comparison : -comparison;
    });
  }, [filteredData, sortConfig]);

  // Handle sort request
  const requestSort = (key: keyof T) => {
    if (!sortable) return;
    
    let direction: "ascending" | "descending" | null = "ascending";
    
    if (sortConfig.key === key) {
      if (sortConfig.direction === "ascending") {
        direction = "descending";
      } else if (sortConfig.direction === "descending") {
        direction = null;
      }
    }
    
    setSortConfig({ key, direction });
  };

  // Get sort direction indicator
  const getSortDirectionIndicator = (key: keyof T) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "ascending" ? " ↑" : sortConfig.direction === "descending" ? " ↓" : "";
  };

  return (
    <div className={`data-table-container animate-in ${className}`}>
      {searchable && searchKeys?.length && (
        <div className="p-4 border-b">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-muted-foreground" />
            </div>
            <input
              type="text"
              className="w-full p-2 pl-10 text-sm border rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-background"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead className="data-table-header">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  onClick={() => column.isSortable !== false && requestSort(column.accessor)}
                  className={`${column.isSortable !== false && sortable ? "cursor-pointer" : ""}`}
                >
                  {column.header}
                  {sortable && column.isSortable !== false && getSortDirectionIndicator(column.accessor)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-8">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-primary animate-pulse"></div>
                    <div className="w-4 h-4 rounded-full bg-primary animate-pulse delay-150"></div>
                    <div className="w-4 h-4 rounded-full bg-primary animate-pulse delay-300"></div>
                  </div>
                </td>
              </tr>
            ) : sortedData.length > 0 ? (
              sortedData.map((item, rowIndex) => (
                <tr
                  key={rowIndex}
                  onClick={() => onRowClick && onRowClick(item)}
                  className={onRowClick ? "cursor-pointer" : ""}
                >
                  {columns.map((column, colIndex) => (
                    <td key={colIndex}>
                      {column.cell ? column.cell(item) : (item[column.accessor] as React.ReactNode)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center py-8">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
