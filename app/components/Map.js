"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import { useState } from "react";
import CurrentLocationButton from "./map/CurrentLocationButton"

export default function GlobalMap() {
  const [loading, setLoading] = useState(false);

  const handleCurrentLocation = () => {
    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);

        setLoading(false);
      },
      (error) => {
        console.error(error);
        setLoading(false);
      },
    );
  };
  return (
    <MapContainer
      center={[35.6892, 51.389]}
      zoom={12}
      className="h-screen w-full"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CurrentLocationButton
        loading={loading}
        onClick={handleCurrentLocation}
      />
    </MapContainer>
  );
}
