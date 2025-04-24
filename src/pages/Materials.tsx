
import { useState, useEffect } from "react";
import { MaterialsForm } from "@/components/materials/MaterialsForm";
import { MaterialsTable } from "@/components/materials/MaterialsTable";
import { getMaterials } from "@/services/materials";
import { type Material } from "@/types/material";

export default function Materials() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadMaterials = async () => {
    setIsLoading(true);
    try {
      const data = await getMaterials();
      setMaterials(data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMaterials();
  }, []);

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Materials</h1>
        <p className="text-muted-foreground">
          Create and manage your materials
        </p>
      </div>

      <div className="rounded-lg border bg-card p-6 space-y-6">
        <h2 className="text-lg font-semibold">Add New Material</h2>
        <MaterialsForm onSuccess={loadMaterials} />
      </div>

      <div className="rounded-lg border bg-card">
        <MaterialsTable data={materials} isLoading={isLoading} />
      </div>
    </div>
  );
}
