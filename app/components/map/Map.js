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
import useRoute from "@/app/hooks/useRoute";
import RouteLayer from "../map/route/RouteLayer";
import FitRouteBounds from "../map/route/FitRouteBounds";
import useSavedPlaces from "@/app/hooks/useSavedPlaces";
import SavedPlacesButton from "../saved/SavedPlacesButton";
import SavedPlacesDrawer from "../saved/SavedPlacesDrawer";
import ThemeButton from "../controls/ThemeButton";

export default function GlobalMap() {
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isRouting, setIsRouting] = useState(false);
  const [openSaved, setOpenSaved] = useState(false);
  const { place, getPlace } = useReverseGeocode();
  const { route, routeInfo, loading: routeLoading, getRoute } = useRoute();
  const { savedPlaces, savePlace, removePlace, clearPlaces } = useSavedPlaces();

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
      <ThemeButton />
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
        <RouteLayer route={route} />

        <FitRouteBounds route={route} />
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
        <SavedPlacesButton
          count={savedPlaces.length}
          onClick={() => setOpenSaved(true)}
        />
        <SavedPlacesDrawer
          open={openSaved}
          onClose={() => setOpenSaved(false)}
          places={savedPlaces}
          onDelete={removePlace}
          onClear={clearPlaces}
          onFly={(item) => {
            setSelectedLocation([item.lat, item.lng]);

            getPlace(
              item.lat,

              item.lng,
            );
          }}
        />
      </MapContainer>
      <LocationModal
        onSave={() => {
          savePlace(place, selectedLocation);
        }}
        open={showModal}
        onClose={() => setShowModal(false)}
        place={place}
        location={selectedLocation}
        canRoute={Boolean(userLocation)}
        onRoute={() => {
          if (!userLocation || !selectedLocation) return;

          getRoute(userLocation, selectedLocation);

          setShowModal(false);
        }}
      />
    </>
  );
}
