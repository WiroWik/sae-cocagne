
import { Map } from "@/components/map";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDepotPoint, getDepotPointByRoundId, getRound } from "@/db";
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import tt from '@tomtom-international/web-sdk-maps';
import dynamic from "next/dynamic";



export default async function Tournees() {

    

    const depots = await getDepotPoint();
    const rounds = await getRound();
    

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