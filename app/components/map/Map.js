"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import { useState } from "react";
import CurrentLocationButton from "../controls/CurrentLocationButton";
import FlyToCurrentLocation from "../controls/FlyToCurrentLocation";
import MapClickHandler from "../controls/MapClickHandler";
import SelectedMarker from "../controls/SelectedMarker";
import useReverseGeocode from "@/app/hooks/useReverseGeocode";
import LocationModal from "../modal/LocationModal";
import LocationSearch from "../search/LocationSearch";
import FlyToLocation from "../controls/FlyToLocation";

export default function GlobalMap() {
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showModal, setShowModal] = useState(false);
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
    <>
      <LocationSearch
        onSelect={(item) => {
          const location = [Number(item.lat), Number(item.lon)];

          setSelectedLocation(location);

          getPlace(location[0], location[1]);
        }}
      />
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
          }}
        />
        <SelectedMarker
          location={selectedLocation}
          onOpen={(location) => {
            setShowModal(true);

            getPlace(location[0], location[1]);
          }}
        />
        <FlyToLocation location={selectedLocation} />
        <FlyToCurrentLocation location={userLocation} />
        <CurrentLocationButton
          loading={loading}
          onClick={handleCurrentLocation}
        />
      </MapContainer>
      <LocationModal
        open={showModal}
        onClose={() => setShowModal(false)}
        place={place}
        location={selectedLocation}
      />
    </>
  );
}
