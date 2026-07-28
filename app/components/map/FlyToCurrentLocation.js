"use client";

import { useEffect } from "react";
import { useMap, CircleMarker } from "react-leaflet";

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
    <CircleMarker
      center={location}
      radius={8}
      pathOptions={{
        color: "#2563eb",
        fillColor: "#2563eb",
        fillOpacity: 1,
      }}
    />
  );
}
