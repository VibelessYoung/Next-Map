"use client";

import { useMapEvents } from "react-leaflet";

export default function MapClickHandler({ onLocationSelect }) {
  useMapEvents({
    click(e) {
      const location = [e.latlng.lat, e.latlng.lng];

      onLocationSelect(location);
    },
  });

  return null;
}
