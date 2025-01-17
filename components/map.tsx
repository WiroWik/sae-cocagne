'use client'
import { Depot } from "@/db/types/depot-point";
import tt from "@tomtom-international/web-sdk-maps";
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";

interface MapProps {
    depots: Depot[];
}

export function Map({ depots }: MapProps) {
    const mapElement = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<tt.Map | undefined>(undefined);
    const latitude = 48.28761638007273;
    const longitude = 6.9447613354683995;
    const [newMarkerAdress, setNewMarkerAdress] = useState('');
    const [newMarkerName, setNewMarkerName] = useState('');
    const [newMarkerContact, setNewMarkerContact] = useState('');
    const [newMarkerOpenTime, setNewMarkerOpenTime] = useState<Date | undefined>(undefined);
    const [newMarkerCloseTime, setNewMarkerCloseTime] = useState<Date | undefined>(undefined);

    useEffect(() => {
        const buildMap = (tt: typeof import('@tomtom-international/web-sdk-maps')) => {
            const map = tt.map({
                key: process.env.NEXT_PUBLIC_TOMTOM_API_KEY || '',
                container: mapElement.current as unknown as HTMLElement,
                center: [longitude, latitude],
                zoom: 13,
            });
            depots.map((depot) => {
                const coords = JSON.parse(depot.coordinates);
                new tt.Marker().setLngLat([coords.lng, coords.lat]).setPopup(new tt.Popup().setHTML(depot.name))
                    .addTo(map);
            });
            setMap(map);
            console.log('mapLangage:', map.getLanguage());
            return () => map.remove();
        };

        const initTomTom = async () => {
            const tt = await import('@tomtom-international/web-sdk-maps');
            buildMap(tt);
        };

        initTomTom();

        return () => {
            if (map) {
                map.remove();
            }
        };
    }, [depots, map]);

    const addMarker = () => {
        if (map && newMarkerAdress) {
            const geocode = async (address: string) => {
                const response = await fetch(`https://api.tomtom.com/search/2/geocode/${encodeURIComponent(address)}.json?key=${process.env.NEXT_PUBLIC_TOMTOM_API_KEY}`);
                const data = await response.json();
                if (data.results && data.results.length > 0) {
                    const { lat, lon } = data.results[0].position;
                    return { lat, lng: lon };
                } else {
                    throw new Error('Address not found');
                }
            };

            geocode(newMarkerAdress).then(({ lat, lng }) => {
                new tt.Marker().setLngLat([lng, lat]).setPopup(new tt.Popup().setHTML(newMarkerName))
                    .addTo(map);
                

                const formData = new FormData();
                formData.append('name', newMarkerName);
                formData.append('coordinates', JSON.stringify({ lat, lng }));
                formData.append('contact', newMarkerContact);
                formData.append('openTime', (newMarkerOpenTime || new Date()).toISOString());
                formData.append('closeTime', (newMarkerCloseTime || new Date()).toISOString());

                fetch('/api/depot', {
                    method: 'POST',
                    body: formData,
                }).then((response) => {
                    if (response.ok) {
                        console.log('Depot inserted successfully');
                    } else {
                        console.error('Error inserting depot');
                    }
                }).catch((error) => {
                    console.error('Error inserting depot:', error);
                });
            }).catch((error) => {
                console.error('Error fetching geocode:', error);
            });
        }
    };

    return (
        <div className="flex flex-row gap-2">
            <div className="border w-[500px] h-[700px]" id="theMap" ref={mapElement} />
            <Card className="p-4 flex flex-col gap-2">
                <input
                    type="text"
                    placeholder="Marker Name"
                    value={newMarkerName}
                    onChange={(e) => setNewMarkerName(e.target.value)}
                    className="border p-2 mr-2"
                />
                <input
                    type="text"
                    placeholder="Address"
                    value={newMarkerAdress}
                    onChange={(e) => setNewMarkerAdress(e.target.value)}
                    className="border p-2 mr-2"
                />
                <input
                    type="text"
                    placeholder="Contact"
                    value={newMarkerContact}
                    onChange={(e) => setNewMarkerContact(e.target.value)}
                    className="border p-2 mr-2"
                />
                <input
                    type="datetime-local"
                    value={newMarkerOpenTime?.toISOString().slice(0, 16)}
                    onChange={(e) => setNewMarkerOpenTime(new Date(e.target.value))}
                    className="border p-2 mr-2"
                />
                <input
                    type="datetime-local"
                    value={newMarkerCloseTime?.toISOString().slice(0, 16)}
                    onChange={(e) => setNewMarkerCloseTime(new Date(e.target.value))}
                    className="border p-2 mr-2"
                />
                
                <button onClick={addMarker} className="bg-blue-500 text-white p-2">Add Marker</button>
            </Card>
        </div>
    );
}