"use client";

import { CigaretteOffIcon } from "lucide-react";
import { useEffect } from "react";
import { useMap, CircleMarker, Circle } from "react-leaflet";

export default function FlyToCurrentLocation({ location }) {
  const map = useMap();

  useEffect(() => {
    if (!location) return;

    map.flyTo(location, 16, {
      animate: true,
      duration: 1.5,
    });
  }, [location, map]);

  if (!location) return null;

  return (
    <>
      <Circle
        center={location}
        radius={25}
        pathOptions={{
          color: "#3b82f6",
          fillColor: "#3b82f6",
          fillOpacity: 0.2,
          weight: 1,
        }}
      />

      <CircleMarker
        center={location}
        radius={8}
        pathOptions={{
          color: "#fff",
          weight: 3,
          fillColor: "#2563eb",
          fillOpacity: 1,
        }}
      />
    </>
  );
}
