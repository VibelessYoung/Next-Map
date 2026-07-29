"use client";

import { useState } from "react";

export default function useRoute() {
  const [route, setRoute] = useState(null);

  const [routeInfo, setRouteInfo] = useState(null);

  const [loading, setLoading] = useState(false);

  const getRoute = async (origin, destination) => {
    try {
      setLoading(true);

      const url =
        `https://router.project-osrm.org/route/v1/driving/` +
        `${origin[1]},${origin[0]};` +
        `${destination[1]},${destination[0]}` +
        `?overview=full&geometries=geojson`;

      const res = await fetch(url);

      const data = await res.json();

      if (!data.routes?.length) return;

      const geometry = data.routes[0].geometry.coordinates.map(([lng, lat]) => [
        lat,
        lng,
      ]);

      setRoute(geometry);

      setRouteInfo({
        distance: data.routes[0].distance,
        duration: data.routes[0].duration,
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    route,
    routeInfo,
    loading,
    getRoute,
  };
}
