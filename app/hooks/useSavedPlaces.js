"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "saved_places";

export default function useSavedPlaces() {
  const [savedPlaces, setSavedPlaces] = useState([]);

  const [loaded, setLoaded] = useState(false);

  // Load

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      setSavedPlaces(JSON.parse(saved));
    }

    setLoaded(true);
  }, []);

  // Save

  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedPlaces));
  }, [savedPlaces, loaded]);

  const savePlace = (place, location) => {
    if (!place || !location) return;

    const exists = savedPlaces.some(
      (item) => item.lat === location[0] && item.lng === location[1],
    );

    if (exists) return;

    setSavedPlaces((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),

        name: place.address?.road || place.display_name.split(",")[0],

        address: place.display_name,

        lat: location[0],

        lng: location[1],

        createdAt: Date.now(),
      },
    ]);
  };

  const removePlace = (id) => {
    setSavedPlaces((prev) => prev.filter((item) => item.id !== id));
  };

  const clearPlaces = () => {
    setSavedPlaces([]);
  };

  return {
    savedPlaces,
    savePlace,
    removePlace,
    clearPlaces,
  };
}
