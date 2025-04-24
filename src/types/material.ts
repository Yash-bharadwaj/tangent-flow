
export type Material = {
  id: string;
  material_code: string;
  material_name: string;
  product_type: string;
  uom: string;
  specification: string | null;
  procurement_type: string | null;
  scrap_percentage: number | null;
  processing_time: number | null;
  processing_time_unit: string;
  quality_check: string | null;
  qm_tolerance_percentage: number | null;
  documentation_required: boolean;
  batch_managed: boolean;
  preferred_vendor_1: string | null;
  preferred_vendor_2: string | null;
  inbound_supply_type: string | null;
  serial_no: string | null;
  notes: string | null;
  gr_location: string | null;
  temperature_control: string | null;
  created_at: string;
  updated_at: string;
};

export const ProductTypes = [
  "Wire Bar",
  "Plates",
  "Ingot",
  "Tube"
] as const;

export const UOMByProductType: Record<string, string> = {
  "Wire Bar": "Meters",
  "Plates": "Sheets",
  "Ingot": "Kilograms",
  "Tube": "Pieces"
};

export const SpecificationsByProductType: Record<string, string[]> = {
  "Wire Bar": ["10 Gauge", "14 Gauge", "16 Gauge", "18 Gauge", "20 Gauge", "22 Gauge"],
  "Bar": ["Standard"],
  "Plates": ["50 X 50 X 1.2mm Thickness"],
  "Ingot": ["Standard"],
  "Tube": ["8 X 10", "10 X 16", "16 X 20"]
};

export const ProcurementTypes = [
  "In-house Production",
  "External Procurement",
  "Subcontracting",
  "Consignment",
  "Stock Transfer",
  "CBU (Completely built unit)"
] as const;

export const QualityCheckTypes = [
  "Not Required",
  "RM Check",
  "FG Check",
  "RM & FG Check"
] as const;

export const InboundSupplyTypes = [
  "Rapido",
  "ACPL",
  "Courier",
  "Own Transport",
  "Vendor Transport"
] as const;

export const GRLocations = [
  "Raw Material section",
  "Office",
  "Production",
  "Casting",
  "Packing",
  "Ware House",
  "Finished Good Section"
] as const;

export const TemperatureControlTypes = [
  "No Temperature Control need",
  "Yes Temperature Controlled"
] as const;
