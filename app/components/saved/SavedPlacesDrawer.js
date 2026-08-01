"use client";

import { X, Search, Trash2, MapPinned } from "lucide-react";
import { useMemo, useState } from "react";

export default function SavedPlacesDrawer({
  open,
  onClose,
  places,
  onFly,
  onDelete,
  onClear,
}) {
  const [search, setSearch] = useState("");

  const filteredPlaces = useMemo(() => {
    return places.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [places, search]);

  if (!open) return null;

  return (
    <div
      className="
      absolute
      left-0
      top-0
      z-[2000]
      h-full
      w-[380px]
      bg-white
      shadow-2xl
      flex
      flex-col
      "
    >
      {/* Header */}

      <div className="flex items-center justify-between border-b p-5">
        <h2 className="text-xl font-bold">مکان‌های ذخیره شده</h2>

        <button onClick={onClose}>
          <X />
        </button>
      </div>

      {/* Search */}

      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-3" size={18} />

          <input
            dir="rtl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جستجو..."
            className="
            w-full
            rounded-xl
            border
            py-3
            pl-10
            pr-4
            outline-none
            "
          />
        </div>
      </div>

      {/* List */}

      <div className="flex-1 overflow-y-auto">
        {filteredPlaces.length === 0 && (
          <div className="mt-20 text-center text-gray-400">
            مکانی ذخیره نشده
          </div>
        )}

        {filteredPlaces.map((item) => (
          <div
            key={item.id}
            className="
            border-b
            p-4
            hover:bg-gray-50
            "
          >
            <div className="font-semibold">{item.name}</div>

            <div
              className="
              mt-1
              text-sm
              text-gray-500
              line-clamp-2
              "
            >
              {item.address}
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => onFly(item)}
                className="
  flex
  flex-1
  items-center
  justify-center
  rounded-xl
  bg-blue-600
  py-2
  text-white
  "
              >
                <MapPinned size={18} />
              </button>

              <button
                onClick={() => onDelete(item.id)}
                className="
                rounded-xl
                bg-red-500
                px-4
                text-white
                "
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}

      <div className="border-t p-4">
        <button
          onClick={onClear}
          className="
          w-full
          rounded-xl
          bg-red-500
          py-3
          text-white
          "
        >
          حذف همه
        </button>
      </div>
    </div>
  );
}
