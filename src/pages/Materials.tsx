import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
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
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Materials</h1>
        <p className="text-muted-foreground">
          Create and manage your materials
        </p>
      </div>

      <div>
        <Button 
          variant="outline" 
          onClick={() => setShowForm(!showForm)}
          className="mb-4"
        >
          {showForm ? (
            <>
              <EyeOff className="mr-2 h-4 w-4" />
              Hide Form
            </>
          ) : (
            <>
              <Eye className="mr-2 h-4 w-4" />
              Show Form
            </>
          )}
        </Button>

        {showForm && (
          <div className="rounded-lg border bg-card p-6 space-y-6 mb-8">
            <h2 className="text-lg font-semibold">Add New Material</h2>
            <MaterialsForm onSuccess={loadMaterials} />
          </div>
        )}
      </div>

      <div className="rounded-lg border bg-card">
        <MaterialsTable data={materials} isLoading={isLoading} />
      </div>
    </div>
  );
}
