import React from 'react';
import L from 'leaflet';
import { createControlComponent } from "@react-leaflet/core";
import 'leaflet-routing-machine';
import { MapContainer, TileLayer } from 'react-leaflet';
import { getDepotPointByRoundId } from '@/db';
import { Depot } from '@/db/types/depot-point';
import { Round } from '@/db/types/round';


interface RoutingMachineProps {
    depots: Depot[];
}


const createRoutingMachineLayer = ({depots} : RoutingMachineProps) => {
  const instance = L.Routing.control({
    waypoints: [
        ...depots.map(depot => {
            const coordinates = JSON.parse(depot.coordinates);
            return L.latLng(coordinates.lat, coordinates.lng);
        }),
    ],
    lineOptions: {
      styles: [{ color: "#6FA1EC", weight: 4 }]
    },
    show: false,
    addWaypoints: false,
    routeWhileDragging: false,
    draggableWaypoints: false,
    fitSelectedRoutes: true,
    showAlternatives: false
  });

  return instance;
};

const RoutingMachine = ({depots} : RoutingMachineProps) => {
  const RoutingMachineComponent = createControlComponent(() => createRoutingMachineLayer({depots}));
  return <RoutingMachineComponent />;
};



export default RoutingMachine;



