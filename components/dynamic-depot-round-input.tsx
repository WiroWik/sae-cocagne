import { ChangeEvent, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Depot } from "@/db/types/depot-point";
import { Plus } from "lucide-react";

interface RoundInputProps {
    depots : Depot[];
}

export default function DynamicRoundInputFields({ depots } : RoundInputProps) {
  const [items, setItems] = useState<Partial<Depot>[]>([
    { id: 1, name: "", coordinates: "", contact: "", openTime: new Date(), closeTime: new Date() },
  ]);

  // Handle dynamic input change
  const handleChange = (index: number, field: keyof Depot, value: string | Date) => {
    setItems((prevItems) => {
      const updatedItems = [...(prevItems || [])];
      updatedItems[index] = { ...updatedItems[index], [field]: value };
      return updatedItems;
    });
  };

  // Add a new depot input
  const addDepotField = () => {
    setItems((prevItems) => [
      ...(prevItems || []),
      { id: Date.now(), name: "", coordinates: "", contact: "", openTime: new Date(), closeTime: new Date() },
    ]);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={item.id} className="space-y-2">
          <Select
            onValueChange={(value) => handleChange(index, "name", value)}
            value={item.name || ""}
          >
            <SelectTrigger className="w-full border p-2">
              <SelectValue placeholder="Select a depot" />
            </SelectTrigger>
            <SelectContent>
              {depots.map((depot) => (
                <SelectItem key={depot.id} value={depot.id.toString()}>
                  {depot.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}

      <button
        onClick={addDepotField}
        className="flex items-center space-x-2 p-2 bg-blue-500 text-white rounded"
      >
        <Plus/>
      </button>
    </div>
  );
}