"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

export default function FitRouteBounds({ route }) {
  const map = useMap();

  useEffect(() => {
    if (!route?.length) return;

    const bounds = L.latLngBounds(route);

    map.fitBounds(bounds, {
      padding: [80, 80],
    });
  }, [route, map]);

  return null;
}
