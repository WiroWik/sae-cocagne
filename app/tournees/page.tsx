import { Map } from "@/components/map";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDepotPoint, getDepotPointByRoundId, getRound } from "@/db";


import { NextRouter } from 'next/router';
import React from "react";

interface TourneesProps {
    router: NextRouter;
}

export default async function Tournees(props: TourneesProps) {

    const depots = await getDepotPoint();
    const rounds = await getRound();

    return (
        <>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Tournées de livraison
            </h1>
            <Separator className="my-5" />
            <div className="flex flex-row gap-2">
                <Tabs defaultValue="account" className="w-[400px]">
                    <TabsList>
                        {rounds.map(async (r) => {
                            
                            return ( 
                                <TabsTrigger value={r.id.toString()}>Tournée n°{r.id}</TabsTrigger>
                            );
                        })}
                    </TabsList>
                    {await Promise.all(rounds.map(async (r) => {
                        const depotsByRound = await getDepotPointByRoundId(r.id);
                        return (
                            <TabsContent key={r.id} value={r.id.toString()}>
                                <Map depots={depotsByRound} />
                            </TabsContent>
                        );
                    }))}
                    
                </Tabs>
            </div>



            
        </>
    );
}