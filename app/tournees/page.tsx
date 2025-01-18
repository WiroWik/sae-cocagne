'use client'
import { Separator } from "@/components/ui/separator";
import { Depot } from "@/db/types/depot-point";
import { Map } from "@/components/map";
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import { useEffect, useState } from "react";



export default function Tournees() {

    const [depots, setDepots] = useState<Depot[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/depot', { method: 'GET' });
            if (response.ok) {
                const data = await response.json();
                const depots: Depot[] = data as Depot[]
                setDepots(depots);
            } else {
                console.error('Failed to fetch depots:', response.statusText);
            }
        };
        fetchData();
    }, []);
    

    return (
        <>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Tournées de livraison
            </h1>
            <Separator className="my-5" />
            <div className="flex flex-row gap-2">
                <Map depots={depots}/>
                
            </div>
        </>
    );
}