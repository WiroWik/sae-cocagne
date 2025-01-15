'use client'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import L from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet/dist/leaflet.css';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { getDepotPoint } from "@/db";

interface Depot {
    id: number;
    name: string;
    coordinates: string;
    contact: string;
    openTime: Date;
    closeTime: Date;
}

interface MapProps {
    depots: Depot[];
}


export function Map({ depots }: MapProps) {

    return (
        <Card className="h-[500px] w-[500px] p-5">
            <MapContainer style={{height: '100%', width: '100%'}} center={[48.28753557547101, 6.942228242470202]} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {depots.map((depot) => {
                    const coordinates = JSON.parse(depot.coordinates);
                    return (
                        <Marker position={[coordinates.lat, coordinates.lng]} key={depot.id}>
                            <Popup>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>{depot.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription>
                                            <p>Contact: {depot.contact}</p>
                                            <p>Open: {new Date(depot.openTime).toLocaleTimeString()}</p>
                                            <p>Close: {new Date(depot.closeTime).toLocaleTimeString()}</p>
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
        </Card>
    )
}