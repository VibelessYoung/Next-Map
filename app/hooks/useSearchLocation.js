"use client";

import { useEffect, useState } from "react";

export default function useSearchLocation(query) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const controller = new AbortController();

    const timeout = setTimeout(async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            query,
          )}&format=jsonv2&addressdetails=1&limit=6`,
          {
            signal: controller.signal,
            headers: {
              Accept: "application/json",
            },
          },
        );

        const data = await res.json();

        setResults(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, [query]);

  return {
    results,
    loading,
  };
}
