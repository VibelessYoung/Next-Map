"use client";

import { MapPin, X, Navigation, Globe, Map, LoaderCircle } from "lucide-react";

export default function LocationModal({
  open,
  onClose,
  place,
  location,
  onRoute,
  canRoute,
}) {
  if (!open) return null;

  return (
    <div
      className="
      fixed
      inset-0
      z-[2000]
      flex
      items-center
      justify-center
      bg-black/40
      backdrop-blur-sm
      p-4
      "
    >
      <div
        className="
        w-full
        max-w-md
        overflow-hidden
        rounded-3xl
        bg-white
        shadow-2xl
        animate-in
        fade-in
        zoom-in-95
        duration-200
        "
      >
        {/* Header */}
        <div
          className="
          flex
          items-center
          justify-between
          border-b
          px-6
          py-5
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-blue-100
              text-blue-600
              "
            >
              <MapPin size={22} />
            </div>

            <div>
              <h2 className="font-bold text-lg">اطلاعات مکان</h2>

              <p className="text-sm text-gray-500">Location Details</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            bg-gray-100
            text-gray-500
            transition
            hover:bg-gray-200
            hover:text-black
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-5 p-6">
          {place ? (
            <>
              {/* Address */}
              <div
                className="
                rounded-2xl
                bg-gray-50
                p-4
                "
              >
                <div
                  className="
                  mb-2
                  flex
                  items-center
                  gap-2
                  text-blue-600
                  "
                >
                  <Navigation size={18} />

                  <span className="font-semibold">آدرس</span>
                </div>

                <p
                  className="
                  text-sm
                  leading-6
                  text-gray-700
                  "
                >
                  {place.display_name}
                </p>
              </div>

              {/* Details */}
              <div className="space-y-3">
                {place.address?.road && (
                  <InfoItem
                    icon={<Map size={18} />}
                    title="خیابان"
                    value={place.address.road}
                  />
                )}

                {place.address?.city && (
                  <InfoItem
                    icon={<MapPin size={18} />}
                    title="شهر"
                    value={place.address.city}
                  />
                )}

                {place.address?.country && (
                  <InfoItem
                    icon={<Globe size={18} />}
                    title="کشور"
                    value={place.address.country}
                  />
                )}
              </div>

              {/* Coordinates */}
              <div
                className="
                rounded-2xl
                bg-black
                p-4
                text-sm
                text-white
                "
              >
                <p>
                  Latitude:
                  <span className="ml-2 text-gray-300">{location?.[0]}</span>
                </p>

                <p>
                  Longitude:
                  <span className="ml-2 text-gray-300">{location?.[1]}</span>
                </p>
              </div>
            </>
          ) : (
            <div
              className="
              flex
              flex-col
              items-center
              justify-center
              gap-3
              py-10
              text-gray-500
              "
            >
              <LoaderCircle
                className="
                animate-spin
                text-blue-500
                "
                size={32}
              />

              <p>در حال دریافت اطلاعات مکان...</p>
            </div>
          )}
          <button
            onClick={onRoute}
            disabled={!canRoute}
            className={`
    flex
    w-full
    items-center
    justify-center
    rounded-2xl
    py-4
    mx-1
    font-semibold
    transition
    ${
      canRoute
        ? "bg-blue-600 text-white hover:bg-blue-700"
        : "bg-gray-200 text-gray-500 cursor-not-allowed"
    }
  `}
          >
            مسیریابی
          </button>
          {!canRoute && (
            <p dir="rtl" className="m-3 text-center text-sm text-red-500">
              برای مسیریابی ابتدا موقعیت فعلی خود را مشخص کنید.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon, title, value }) {
  return (
    <div
      className="
      flex
      items-center
      gap-3
      rounded-xl
      border
      p-3
      "
    >
      <div
        className="
        text-blue-500
        "
      >
        {icon}
      </div>

      <div>
        <p className="text-xs text-gray-400">{title}</p>

        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}
