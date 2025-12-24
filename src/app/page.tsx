"use client";

import React from "react";
import Map from "./_components/Map";
import { useEffect } from "react";
import Header from "./_components/Header";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import FilteredClubs from "./jamka/page";

const HomePage = () => {
  return (
    <div className="h-screen w-full">
      <Header children={undefined} />
      <FilteredClubs />
      <Map />
    </div>
  );
};
export default HomePage;
