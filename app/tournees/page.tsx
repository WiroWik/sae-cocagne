'use client'
import { Separator } from "@/components/ui/separator";
import { Depot } from "@/db/types/depot-point";
// import { Map } from "@/components/map";
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Round } from "@/db/types/round";

const Map = dynamic(() => import('@/components/map').then(mod => mod.Map), { ssr: false });

export default function Tournees() {

    const [depots, setDepots] = useState<Depot[]>([]);
    const [rounds, setRounds] = useState<Round[]>([]);

    useEffect(() => {
        const fetchDepots = async () => {
            const response = await fetch('/api/depot', { method: 'GET' });
            if (response.ok) {
                const data = await response.json();
                const depots: Depot[] = data as Depot[]
                setDepots(depots);
            } else {
                console.error('Failed to fetch depots:', response.statusText);
            }
        };
        fetchDepots();
        const fetchRounds = async () => {
            const response = await fetch('/api/round', { method: 'GET' });
            if (response.ok) {
                const data = await response.json();
                const rounds: Round[] = data as Round[]
                setRounds(rounds);
            } else {
                console.error('Failed to fetch rounds:', response.statusText);
            }
        };
        fetchRounds();
    }, []);
    

    return (
        <>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Tournées de livraison
            </h1>
            <Separator className="my-5" />
            <div className="flex flex-row gap-2">
                <Map depots={depots} rounds={rounds}/>
            </div>
        </>
    );
}