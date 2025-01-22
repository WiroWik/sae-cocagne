import { ChangeEvent, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Depot } from "@/db/types/depot-point";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";


interface RoundInputProps {
  depots: Depot[];
  onDepotsChange: (newDepots: Depot[] | undefined) => void;

}



export default function DynamicRoundInputFields({ depots, onDepotsChange } : RoundInputProps) {
  const [selectedDepots, setSelectedDepots] = useState<Depot[]>([{} as Depot]);

  const handleDepotChange = (index: number, depotId: string) => {
    const depot = depots.find(d => d.id === Number(depotId));
    if (depot) {
      const newSelectedDepots = [...selectedDepots];
      newSelectedDepots[index] = depot;
      setSelectedDepots(newSelectedDepots);
      console.log(newSelectedDepots);
      onDepotsChange(newSelectedDepots);
    }
  };

  const handleAddSelect = () => {
    setSelectedDepots([...selectedDepots, {} as Depot]);
  };

  return (
    <div className="flex flex-col gap-2">
      {selectedDepots.map((selectedDepot, index) => (
        <div key={index}>
          <Select onValueChange={(value) => handleDepotChange(index, value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a depot" />
            </SelectTrigger>
            <SelectContent>
              {depots.map(depot => (
                <SelectItem key={depot.id} value={depot.id.toString()}>
                  {depot.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}
      <Button onClick={handleAddSelect}>
        <Plus size={24} />
      </Button>
    </div>
  );
  
}