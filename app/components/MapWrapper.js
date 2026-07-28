"use client";

import dynamic from "next/dynamic";

const GlobalMap = dynamic(() => import("./Map"), {
  ssr: false,
});

export default function MapWrapper() {
  return <GlobalMap />;
}
