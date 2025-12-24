"use client";

import React from "react";
import Map from "./_components/Map";
<<<<<<< HEAD
import { Filter } from "lucide-react";
=======
import { useEffect } from "react";
import Header from "./_components/Header";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import FilteredClubs from "./jamka/page";
>>>>>>> 81545b71db1cfec32e9d34f1c3a0a0c1cb340975

const HomePage = () => {
  return (
    <div className="h-screen w-full">
<<<<<<< HEAD
      <Filter />
=======
      <Header children={undefined} />
      <FilteredClubs />
>>>>>>> 81545b71db1cfec32e9d34f1c3a0a0c1cb340975
      <Map />
    </div>
  );
};
export default HomePage;
