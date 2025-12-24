"use client";

import dynamic from "next/dynamic";
import { Club, mockClubs } from "@/lib/mock-data";
import { useEffect, useState } from "react";

const MapContent = dynamic(() => import("./MapContent"), { ssr: false });

export default function Map({ filteredClubs }: { filteredClubs: Club[] }) {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([
            position.coords.latitude,
            position.coords.longitude,
          ]);
        },
        (error) => {
          console.error("Failed to get user location", error);
        }
      );
    }
  }, []);

  function getDistanceFromLatLonInKm(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) {
    const radius = 6371;
    const distanceLat = ((lat2 - lat1) * Math.PI) / 180;
    const distanceLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(distanceLat / 2) * Math.sin(distanceLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(distanceLon / 2) *
        Math.sin(distanceLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return radius * c;
  }

  const nearbyClubs = userLocation
    ? filteredClubs.filter((club) => {
        const distance = getDistanceFromLatLonInKm(
          userLocation[0],
          userLocation[1],
          club.lat,
          club.lon
        );
        return distance <= 5;
      })
    : [];

  return (
    <MapContent
      clubs={filteredClubs}
      userLocation={userLocation}
      nearbyClubs={nearbyClubs}
    />
  );
}
