"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";

export default function FlyToLocation({ location }) {
  const map = useMap();

  useEffect(() => {
    if (!location) return;

    map.flyTo(location, 16, {
      animate: true,
      duration: 1.5,
    });
  }, [location, map]);

  return null;
}
