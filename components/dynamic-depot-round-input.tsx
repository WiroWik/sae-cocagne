import { ChangeEvent, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Depot } from "@/db/types/depot-point";

interface RoundInputProps {
    depots : Depot[];
}

export default function DynamicRoundInputFields({ depots } : RoundInputProps) {
  const [inputs, setInputs] = useState<Depot[]>();

  const handleAddInput = () => {
    setInputs((prevItems) => [...prevItems, { depot: "" }]);
  };

  const handleChange = (value: string, index: number) => {
    setInputs((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index].depot = value;
      return updatedItems;
    });
  };

  const handleDeleteInput = (index: number) => {
    const newArray = [...inputs];
    newArray.splice(index, 1);
    setInputs(newArray);
  };


  return (

        
            
            <Select name="depot">
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Dépôt de la tournée" />
                </SelectTrigger>
                <SelectContent>
                    {
                        depots.map((depot) => {
                            return <SelectItem value={depot.id.toString()}>{depot.name}</SelectItem>
                        })
                    }
                </SelectContent>
            </Select> 
            
        
    );
}