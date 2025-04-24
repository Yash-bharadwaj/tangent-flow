import { useState, useEffect } from "react";
import { MaterialsForm } from "@/components/materials/MaterialsForm";
import { MaterialsTable } from "@/components/materials/MaterialsTable";
import { getMaterials } from "@/services/materials";
import { type Material } from "@/types/material";
import { Button } from "@/components/ui/button";

export default function Materials() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

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
    <div className="flex-1 ml-20 md:ml-72 p-6 space-y-8 transition-all duration-500">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Materials</h1>
            <p className="text-muted-foreground">
              Create and manage your materials
            </p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? "Hide Form" : "Create Material"}
          </Button>
        </div>
      </div>

      {showForm && (
        <div className="rounded-lg border bg-card p-6 space-y-6 mb-8">
          <h2 className="text-lg font-semibold">Add New Material</h2>
          <MaterialsForm onSuccess={loadMaterials} />
        </div>
      )}

      <div className="rounded-lg border bg-card">
        <MaterialsTable data={materials} isLoading={isLoading} />
      </div>
    </div>
  );
}
