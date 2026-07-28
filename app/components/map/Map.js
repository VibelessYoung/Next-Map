"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import { useState } from "react";
import CurrentLocationButton from "../controls/CurrentLocationButton";
import FlyToCurrentLocation from "../controls/FlyToCurrentLocation";
import MapClickHandler from "../controls/MapClickHandler";
import SelectedMarker from "../controls/SelectedMarker";
import useReverseGeocode from "@/app/hooks/useReverseGeocode";

export default function GlobalMap() {
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const { place, getPlace } = useReverseGeocode();

  const handleCurrentLocation = () => {
    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = [position.coords.latitude, position.coords.longitude];

        setUserLocation(location);

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
      <MapClickHandler
        onLocationSelect={(location) => {
          setSelectedLocation(location);

          getPlace(location[0], location[1]);
        }}
      />
      <SelectedMarker location={selectedLocation} />
      <FlyToCurrentLocation location={userLocation} />
      <CurrentLocationButton
        loading={loading}
        onClick={handleCurrentLocation}
      />
    </MapContainer>
  );
}
