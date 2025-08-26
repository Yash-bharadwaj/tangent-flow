import { motion } from "framer-motion";
import { ProcessStepper } from "./ProcessStepper";

interface BatchData {
  batchNo: string;
  itemName: string;
  process: {
    steps: string[];
    currentStep: number;
  };
  percentage: number;
  priority: "high" | "medium" | "low";
}

const batchData: BatchData[] = [
  {
    batchNo: "102",
    itemName: "Lead Ingots",
    process: {
      steps: ["Melting", "Refining", "Casting", "Cooling", "Quality Check"],
      currentStep: 4
    },
    percentage: 95,
    priority: "high"
  },
  {
    batchNo: "103", 
    itemName: "Tin Bars",
    process: {
      steps: ["Smelting", "Purification", "Alloying", "Molding"],
      currentStep: 3
    },
    percentage: 86,
    priority: "medium"
  },
  {
    batchNo: "104",
    itemName: "Copper Wire",
    process: {
      steps: ["Melting", "Electrolysis", "Wire Drawing", "Annealing", "Coating", "Spooling", "Testing"],
      currentStep: 5
    },
    percentage: 71,
    priority: "medium"
  },
  {
    batchNo: "105",
    itemName: "Aluminum Sheets",
    process: {
      steps: ["Smelting", "Rolling", "Annealing", "Cutting", "Surface Treatment"],
      currentStep: 2
    },
    percentage: 40,
    priority: "low"
  },
  {
    batchNo: "106",
    itemName: "Steel Rods",
    process: {
      steps: ["Melting", "Continuous Casting", "Rolling", "Heat Treatment", "Straightening", "Cutting"],
      currentStep: 4
    },
    percentage: 78,
    priority: "high"
  }
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high": return "bg-red-100 text-red-800 border-red-200";
    case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "low": return "bg-green-100 text-green-800 border-green-200";
    default: return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export function BatchProcessingTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-card/50 backdrop-blur-lg border border-border/50 rounded-xl p-6 mb-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Active Production Batches</h3>
          <p className="text-sm text-muted-foreground">Real-time processing status and completion tracking</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-muted-foreground">Live Updates</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/30">
              <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Batch No
              </th>
              <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Item Name
              </th>
              <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider min-w-[300px]">
                Process Flow
              </th>
              <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Progress
              </th>
              <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Priority
              </th>
            </tr>
          </thead>
          <tbody>
            {batchData.map((batch, index) => (
              <motion.tr
                key={batch.batchNo}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border-b border-border/20 hover:bg-muted/30 transition-colors duration-200"
              >
                <td className="py-4 px-2">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">#{batch.batchNo}</span>
                    </div>
                  </div>
                </td>
                
                <td className="py-4 px-2">
                  <div className="font-medium text-sm text-foreground">{batch.itemName}</div>
                </td>
                
                <td className="py-4 px-2">
                  <ProcessStepper 
                    steps={batch.process.steps}
                    currentStep={batch.process.currentStep}
                  />
                </td>
                
                <td className="py-4 px-2">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{batch.percentage}%</span>
                    </div>
                    <div className="w-16 bg-muted rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${batch.percentage}%` }}
                        transition={{ duration: 1.5, delay: index * 0.2, ease: "easeOut" }}
                        className="h-2 bg-gradient-to-r from-primary to-primary/80 rounded-full"
                      />
                    </div>
                  </div>
                </td>
                
                <td className="py-4 px-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(batch.priority)}`}>
                    {batch.priority.charAt(0).toUpperCase() + batch.priority.slice(1)}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}