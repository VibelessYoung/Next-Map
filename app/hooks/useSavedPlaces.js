"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "saved_places";

export default function useSavedPlaces() {
  const [savedPlaces, setSavedPlaces] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem(STORAGE_KEY);

    if (data) {
      setSavedPlaces(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedPlaces));
  }, [savedPlaces]);

  const savePlace = (place, location) => {
    if (!place || !location) return false;

    const exists = savedPlaces.some(
      (item) => item.lat === location[0] && item.lng === location[1],
    );

    if (exists) {
      return false;
    }

    setSavedPlaces((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name:
          place.address?.road || place.name || place.display_name.split(",")[0],

        address: place.display_name,

        lat: location[0],
        lng: location[1],

        createdAt: Date.now(),
      },
    ]);

    return true;
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
