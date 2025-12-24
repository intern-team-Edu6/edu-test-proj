"use client";

import JamkaPage from "@/components/jamka/page";
import React from "react";
import Map from "./_components/Map";
import { use, useEffect } from "react";
import Header from "./_components/Header";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function HomePage() {
  const { user, isSignedIn } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (user?.publicMetadata.role === "admin") {
      router.push("/redirect");
    }
  }, []);
  console.log("HomePage - User info:", user?.publicMetadata.role, isSignedIn);

  return (
    <div className="h-screen w-full">
      <Header children={undefined} />
      <JamkaPage />
      <Map />
    </div>
  );
}
