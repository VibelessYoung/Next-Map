"use client";

import { Search, LoaderCircle, MapPin } from "lucide-react";
import { useState } from "react";
import useSearchLocation from "@/app/hooks/useSearchLocation";

export default function LocationSearch({ onSelect }) {
  const [query, setQuery] = useState("");

  const { results, loading } = useSearchLocation(query);

  return (
    <div
      className="
      absolute
      top-5
      left-1/2
      z-[2000]
      w-[90%]
      max-w-xl
      -translate-x-1/2
      "
    >
      <div
        className="
        flex
        items-center
        gap-3
        rounded-2xl
        bg-white
        dark:bg-black
        dark:text-white
        px-5
        py-3
        shadow-xl
        "
      >
        <Search className="text-gray-400" size={22} />

        <input
        dir="rtl"
        type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="جستجوی مکان..."
          className="flex-1 outline-none"
        />

        {loading && (
          <LoaderCircle className="animate-spin text-blue-500" size={20} />
        )}
      </div>

      {results.length > 0 && (
        <div
          className="
          mt-2
          overflow-hidden
          rounded-2xl
          bg-white
          shadow-2xl
          "
        >
          {results.map((item) => (
            <button
              key={item.place_id}
              onClick={() => {
                onSelect(item);

                setQuery(item.display_name);
              }}
              className="
              flex
              w-full
              items-start
              gap-3
              border-b
              px-4
              py-4
              text-left
              transition
              hover:bg-gray-50
              "
            >
              <MapPin size={18} className="mt-1 text-red-500" />

              <div className="flex-1">
                <p className="font-medium">
                  {item.name || item.display_name.split(",")[0]}
                </p>

                <p className="text-sm text-gray-500">{item.display_name}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
