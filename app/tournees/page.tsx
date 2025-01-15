import { Map } from "@/components/map";
import { Separator } from "@/components/ui/separator";
import { getDepotPoint, getRound } from "@/db";
import dynamic from "next/dynamic";
import { useMemo } from "react";

export default async function Tournees() {

    const depots = await getDepotPoint();
    const rounds = await getRound();

    return (
        <>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Tournées de livraison
            </h1>
            <Separator className="my-5" />
            <Map depots={depots} rounds={rounds} />



            
        </>
    );
}