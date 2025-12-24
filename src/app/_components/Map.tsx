"use client";

import dynamic from "next/dynamic";
import { mockClubs } from "@/lib/mock-data";

const MapContent = dynamic(() => import("./MapContent"), { ssr: false });

export default function Map() {
  const filteredClubs = mockClubs.filter(
    (c) => c.clubCategoryType === "EDUCATION"
  );

  return <MapContent clubs={filteredClubs} />;
}
