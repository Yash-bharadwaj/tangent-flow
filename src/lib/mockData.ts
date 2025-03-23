
// Mock Module Data
export interface Module {
  moduleid: number;
  modulename: string;
  enabled: boolean;
  displayorder: number;
}

export const moduleData: Module[] = [
  { moduleid: 1, modulename: "Dashboard", enabled: true, displayorder: 1 },
  { moduleid: 2, modulename: "Sales Orders", enabled: true, displayorder: 2 },
  { moduleid: 3, modulename: "Inventory Management", enabled: true, displayorder: 3 },
  { moduleid: 4, modulename: "User Management", enabled: true, displayorder: 4 },
  { moduleid: 5, modulename: "Delivery Tracking", enabled: true, displayorder: 5 },
  { moduleid: 6, modulename: "Reporting", enabled: false, displayorder: 6 },
  { moduleid: 7, modulename: "Settings", enabled: true, displayorder: 7 },
  { moduleid: 8, modulename: "Customer Management", enabled: false, displayorder: 8 },
  { moduleid: 9, modulename: "Supplier Management", enabled: false, displayorder: 9 },
  { moduleid: 10, modulename: "Analytics", enabled: false, displayorder: 10 },
];

// Mock Sales Order Data
export interface SalesOrder {
  soNo: string;
  customerName: string;
  orderStatus: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  material: string;
  quantity: number;
  expectedPaymentDate: string;
}

export const salesOrderData: SalesOrder[] = [
  {
    soNo: "SO-2023-001",
    customerName: "Acme Steel Inc.",
    orderStatus: "Processing",
    material: "Stainless Steel Sheets",
    quantity: 500,
    expectedPaymentDate: "2023-06-30",
  },
  {
    soNo: "SO-2023-002",
    customerName: "MetalWorks Ltd.",
    orderStatus: "Shipped",
    material: "Aluminum Rods",
    quantity: 200,
    expectedPaymentDate: "2023-06-15",
  },
  {
    soNo: "SO-2023-003",
    customerName: "BuildRight Construction",
    orderStatus: "Pending",
    material: "Copper Pipes",
    quantity: 150,
    expectedPaymentDate: "2023-07-10",
  },
  {
    soNo: "SO-2023-004",
    customerName: "Global Metals Corp.",
    orderStatus: "Delivered",
    material: "Carbon Steel Plates",
    quantity: 300,
    expectedPaymentDate: "2023-06-05",
  },
  {
    soNo: "SO-2023-005",
    customerName: "Superior Fabrication",
    orderStatus: "Processing",
    material: "Titanium Alloy",
    quantity: 50,
    expectedPaymentDate: "2023-07-20",
  },
  {
    soNo: "SO-2023-006",
    customerName: "Acme Steel Inc.",
    orderStatus: "Pending",
    material: "Galvanized Steel",
    quantity: 450,
    expectedPaymentDate: "2023-07-05",
  },
  {
    soNo: "SO-2023-007",
    customerName: "BuildRight Construction",
    orderStatus: "Cancelled",
    material: "Brass Fittings",
    quantity: 75,
    expectedPaymentDate: "2023-06-25",
  },
  {
    soNo: "SO-2023-008",
    customerName: "MetalWorks Ltd.",
    orderStatus: "Processing",
    material: "Zinc Sheets",
    quantity: 120,
    expectedPaymentDate: "2023-07-15",
  },
];

// Mock Inventory Data
export interface InventoryItem {
  itemId: string;
  itemName: string;
  category: string;
  inStock: number;
  minStock: number;
  supplier: string;
  lastOrderDate: string;
}

export const inventoryData: InventoryItem[] = [
  {
    itemId: "INV-001",
    itemName: "Stainless Steel Sheets",
    category: "Raw Materials",
    inStock: 250,
    minStock: 100,
    supplier: "Steel Suppliers Inc.",
    lastOrderDate: "2023-05-15",
  },
  {
    itemId: "INV-002",
    itemName: "Aluminum Rods",
    category: "Raw Materials",
    inStock: 50,
    minStock: 75,
    supplier: "Metal Resources Ltd.",
    lastOrderDate: "2023-05-20",
  },
  {
    itemId: "INV-003",
    itemName: "Copper Pipes",
    category: "Finished Goods",
    inStock: 180,
    minStock: 50,
    supplier: "Copper Industries",
    lastOrderDate: "2023-06-01",
  },
  {
    itemId: "INV-004",
    itemName: "Carbon Steel Plates",
    category: "Raw Materials",
    inStock: 150,
    minStock: 100,
    supplier: "Steel Suppliers Inc.",
    lastOrderDate: "2023-05-25",
  },
  {
    itemId: "INV-005",
    itemName: "Titanium Alloy",
    category: "Specialty Materials",
    inStock: 20,
    minStock: 15,
    supplier: "Specialty Metals Corp.",
    lastOrderDate: "2023-06-05",
  },
  {
    itemId: "INV-006",
    itemName: "Galvanized Steel",
    category: "Raw Materials",
    inStock: 200,
    minStock: 300,
    supplier: "Steel Suppliers Inc.",
    lastOrderDate: "2023-05-30",
  },
  {
    itemId: "INV-007",
    itemName: "Brass Fittings",
    category: "Components",
    inStock: 25,
    minStock: 50,
    supplier: "Metal Resources Ltd.",
    lastOrderDate: "2023-06-10",
  },
  {
    itemId: "INV-008",
    itemName: "Zinc Sheets",
    category: "Raw Materials",
    inStock: 40,
    minStock: 75,
    supplier: "Metal Resources Ltd.",
    lastOrderDate: "2023-06-15",
  },
];

// Mock User Data
export interface User {
  userId: number;
  username: string;
  fullName: string;
  email: string;
  role: "Supervisor" | "Operator" | "Helper";
  department: string;
  status: "Active" | "Inactive";
}

export const userData: User[] = [
  {
    userId: 1,
    username: "jsmith",
    fullName: "John Smith",
    email: "john.smith@example.com",
    role: "Supervisor",
    department: "Production",
    status: "Active",
  },
  {
    userId: 2,
    username: "ajohnson",
    fullName: "Alice Johnson",
    email: "alice.johnson@example.com",
    role: "Operator",
    department: "Inventory",
    status: "Active",
  },
  {
    userId: 3,
    username: "mwilliams",
    fullName: "Mike Williams",
    email: "mike.williams@example.com",
    role: "Helper",
    department: "Shipping",
    status: "Active",
  },
  {
    userId: 4,
    username: "jdoe",
    fullName: "Jane Doe",
    email: "jane.doe@example.com",
    role: "Supervisor",
    department: "Quality Control",
    status: "Active",
  },
  {
    userId: 5,
    username: "tlee",
    fullName: "Tom Lee",
    email: "tom.lee@example.com",
    role: "Operator",
    department: "Production",
    status: "Inactive",
  },
  {
    userId: 6,
    username: "sking",
    fullName: "Sarah King",
    email: "sarah.king@example.com",
    role: "Helper",
    department: "Inventory",
    status: "Active",
  },
  {
    userId: 7,
    username: "rgarcia",
    fullName: "Robert Garcia",
    email: "robert.garcia@example.com",
    role: "Supervisor",
    department: "Shipping",
    status: "Active",
  },
  {
    userId: 8,
    username: "lbrown",
    fullName: "Lisa Brown",
    email: "lisa.brown@example.com",
    role: "Operator",
    department: "Quality Control",
    status: "Active",
  },
];

// Mock Delivery Data
export interface Delivery {
  deliveryId: string;
  soNo: string;
  customerName: string;
  deliveryDate: string;
  status: "In Progress" | "Delivered" | "On Hold";
  address: string;
  contactPerson: string;
}

export const deliveryData: Delivery[] = [
  {
    deliveryId: "DEL-2023-001",
    soNo: "SO-2023-002",
    customerName: "MetalWorks Ltd.",
    deliveryDate: "2023-06-20",
    status: "In Progress",
    address: "123 Industrial Ave, Boston, MA",
    contactPerson: "Michael Johnson",
  },
  {
    deliveryId: "DEL-2023-002",
    soNo: "SO-2023-004",
    customerName: "Global Metals Corp.",
    deliveryDate: "2023-06-07",
    status: "Delivered",
    address: "456 Manufacturing Blvd, Chicago, IL",
    contactPerson: "Jennifer Williams",
  },
  {
    deliveryId: "DEL-2023-003",
    soNo: "SO-2023-001",
    customerName: "Acme Steel Inc.",
    deliveryDate: "2023-07-01",
    status: "On Hold",
    address: "789 Commerce St, Detroit, MI",
    contactPerson: "David Anderson",
  },
  {
    deliveryId: "DEL-2023-004",
    soNo: "SO-2023-005",
    customerName: "Superior Fabrication",
    deliveryDate: "2023-07-25",
    status: "In Progress",
    address: "321 Technology Park, Pittsburgh, PA",
    contactPerson: "Emily Parker",
  },
  {
    deliveryId: "DEL-2023-005",
    soNo: "SO-2023-003",
    customerName: "BuildRight Construction",
    deliveryDate: "2023-07-15",
    status: "On Hold",
    address: "654 Builder's Way, Cleveland, OH",
    contactPerson: "Robert Taylor",
  },
  {
    deliveryId: "DEL-2023-006",
    soNo: "SO-2023-008",
    customerName: "MetalWorks Ltd.",
    deliveryDate: "2023-07-20",
    status: "In Progress",
    address: "123 Industrial Ave, Boston, MA",
    contactPerson: "Michael Johnson",
  },
];

// Dashboard Statistics
export const dashboardStats = {
  totalOrders: 145,
  pendingOrders: 38,
  inventory: {
    totalItems: 1250,
    lowStock: 8,
    outOfStock: 3,
  },
  sales: {
    monthly: 245000,
    change: 12.5,
  },
  deliveries: {
    scheduled: 28,
    inTransit: 12,
    completed: 95,
  },
  userActivity: {
    activeUsers: 22,
    newTickets: 5,
  },
};
