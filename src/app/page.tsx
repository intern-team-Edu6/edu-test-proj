"use client";

import React from "react";
import Map from "./_components/Map";
import FilteredClubs from "./jamka/page";

const HomePage = () => {
  return (
    <div className="h-screen w-full">
      <FilteredClubs />
      <Map />
    </div>
  );
};
export default HomePage;
