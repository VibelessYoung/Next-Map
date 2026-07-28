"use client";

import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",

  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",

  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function SelectedMarker({ location }) {
  if (!location) return null;

  return (
    <Marker position={location} icon={redIcon}>
      <Popup>انتخاب شده</Popup>
    </Marker>
  );
}
