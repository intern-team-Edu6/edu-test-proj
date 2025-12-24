"use client";

import React from "react";

import Header from "./_components/Header";

import FilteredClubs from "./jamka/page";

const HomePage = () => {
  return (
    <div className="h-screen w-full">
      <Header children={undefined} />
      <FilteredClubs />
    </div>
  );
};
export default HomePage;
