"use client";

export default function SavedPlacesDrawer({ open }) {
  if (!open) return null;

  return (
    <div
      className="
      absolute
      left-0
      top-0
      z-[2000]
      h-full
      w-96
      bg-white
      shadow-2xl
      "
    >
      Drawer
    </div>
  );
}
