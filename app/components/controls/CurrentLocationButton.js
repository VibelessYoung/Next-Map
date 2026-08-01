"use client";

import { LocateFixed, LoaderCircle } from "lucide-react";

export default function CurrentLocationButton({ loading, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="
        absolute
        bottom-6
        right-6
        z-[1000]
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-full
        bg-white
        dark:bg-black
        dark:text-white
        shadow-xl
        transition
        hover:scale-105
        disabled:cursor-not-allowed
      "
    >
      {loading ? (
        <LoaderCircle className="h-6 w-6 animate-spin" />
      ) : (
        <LocateFixed className="h-6 w-6" />
      )}
    </button>
  );
}
