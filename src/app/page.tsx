import JamkaPage from "@/components/jamka/page";
import React from "react";
import Map from "./_components/Map";

export default function HomePage() {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <JamkaPage />
      <Map />
    </div>
  );
}
