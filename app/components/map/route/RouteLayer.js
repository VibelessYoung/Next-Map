"use client";

import { Polyline } from "react-leaflet";

export default function RouteLayer({ route }) {
  if (!route) return null;

  return (
    <Polyline
      positions={route}
      pathOptions={{
        color: "#2563eb",
        weight: 6,
        opacity: 0.9,
      }}
    />
  );
}
