
import { Map } from "@/components/map";
import { Separator } from "@/components/ui/separator";
import { getDepotPoint } from "@/db";
import '@tomtom-international/web-sdk-maps/dist/maps.css';



export default async function Tournees() {

    

    const depots = await getDepotPoint();
    

    return (
        <>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Tournées de livraison
            </h1>
            <Separator className="my-5" />
            <div className="flex flex-row gap-2">
                <Map depots={depots} />
            </div>
        </>
    );
}