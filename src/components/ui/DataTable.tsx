
import React, { useState } from "react";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  
  const [hoveredRowIndex, setHoveredRowIndex] = useState<number | null>(null);

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

  // Table row animation variants
  const tableRowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        delay: custom * 0.05
      }
    }),
    exit: { opacity: 0, y: -20 }
  };

  return (
    <motion.div 
      className={`data-table-container animate-in ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {searchable && searchKeys?.length && (
        <motion.div 
          className="p-4 border-b"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-muted-foreground" />
            </div>
            <motion.input
              type="text"
              className="w-full p-2 pl-10 text-sm border rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-background"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(var(--primary), 0.2)" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>
        </motion.div>
      )}
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead className="data-table-header">
            <tr>
              {columns.map((column, index) => (
                <motion.th
                  key={index}
                  onClick={() => column.isSortable !== false && requestSort(column.accessor)}
                  className={`${column.isSortable !== false && sortable ? "cursor-pointer" : ""}`}
                  whileHover={column.isSortable !== false && sortable ? { 
                    backgroundColor: "rgba(var(--primary), 0.05)",
                    color: "var(--primary)" 
                  } : {}}
                  transition={{ duration: 0.2 }}
                >
                  {column.header}
                  {sortable && column.isSortable !== false && getSortDirectionIndicator(column.accessor)}
                </motion.th>
              ))}
            </tr>
          </thead>
          <motion.tbody className="divide-y">
            <AnimatePresence>
              {isLoading ? (
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <td colSpan={columns.length} className="text-center py-8">
                    <div className="flex items-center justify-center space-x-2">
                      <motion.div 
                        className="w-4 h-4 rounded-full bg-primary"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                      ></motion.div>
                      <motion.div 
                        className="w-4 h-4 rounded-full bg-primary"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5, delay: 0.2, ease: "easeInOut" }}
                      ></motion.div>
                      <motion.div 
                        className="w-4 h-4 rounded-full bg-primary"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5, delay: 0.4, ease: "easeInOut" }}
                      ></motion.div>
                    </div>
                  </td>
                </motion.tr>
              ) : sortedData.length > 0 ? (
                sortedData.map((item, rowIndex) => (
                  <motion.tr
                    key={rowIndex}
                    onClick={() => onRowClick && onRowClick(item)}
                    className={onRowClick ? "cursor-pointer" : ""}
                    variants={tableRowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    custom={rowIndex}
                    style={{ 
                      backgroundColor: hoveredRowIndex === rowIndex ? 
                        "var(--accent, rgba(0,0,0,0.05))" : 
                        "transparent",
                      transform: hoveredRowIndex === rowIndex ? 
                        "translateY(-1px)" : 
                        "translateY(0)"
                    }}
                    onMouseEnter={() => setHoveredRowIndex(rowIndex)}
                    onMouseLeave={() => setHoveredRowIndex(null)}
                    whileHover={{ 
                      y: -1, 
                      backgroundColor: "var(--accent, rgba(0,0,0,0.05))",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30
                    }}
                  >
                    {columns.map((column, colIndex) => (
                      <td key={colIndex}>
                        {column.cell ? column.cell(item) : (item[column.accessor] as React.ReactNode)}
                      </td>
                    ))}
                  </motion.tr>
                ))
              ) : (
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <td colSpan={columns.length} className="text-center py-8">
                    No data available
                  </td>
                </motion.tr>
              )}
            </AnimatePresence>
          </motion.tbody>
        </table>
      </div>
    </motion.div>
  );
}
