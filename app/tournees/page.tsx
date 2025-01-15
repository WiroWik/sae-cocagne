import { Map } from "@/components/map";
import { Separator } from "@/components/ui/separator";

export default function Tournees() {
    
   

    return (
        <>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Tournées de livraison
            </h1>
            <Separator className="my-5" />
            <Map/>



            
        </>
    );
}