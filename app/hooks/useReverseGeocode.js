import { useState } from "react";

export default function useReverseGeocode() {
  const [place, setPlace] = useState(null);

  const getPlace = async (lat, lng) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
    );

    const data = await res.json();

    setPlace(data);
  };

  return {
    place,
    getPlace,
  };
}
