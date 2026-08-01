"use client";

import { Heart } from "lucide-react";

export default function SavedPlacesButton({ count, onClick }) {
  return (
    <button
      onClick={onClick}
      className="
      absolute
      bottom-6
      left-6
      z-[1000]
      flex
      h-14
      w-14
      items-center
      justify-center
      rounded-full
      bg-white
      dark:bg-black
      dark:text-red-500
      shadow-xl
      transition
      hover:scale-105
      "
    >
      <Heart className="text-red-500" />

      {count > 0 && (
        <span
          className="
          absolute
          -right-1
          -top-1
          flex
          h-6
          w-6
          items-center
          justify-center
          rounded-full
          bg-red-500
          text-xs
          text-white
          "
        >
          {count}
        </span>
      )}
    </button>
  );
}
