"use client";

import React from "react";
import Map from "./_components/Map";
import { Filter } from "lucide-react";

const HomePage = () => {
  return (
    <div className="h-screen w-full">
      <Filter />
      <Map />
    </div>
  );
};
export default HomePage;
