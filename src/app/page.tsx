"use client";

import React, { useEffect, useState } from "react";
import FilteredClubs from "./jamka/page";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

const HomePage = () => {
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    if (!isLoaded) return;

    if (user?.publicMetadata?.role === "admin") {
      router.push("/club-admin");
      return;
    }

    setLoading(false);
  }, [isLoaded, user, router]);

  if (!isLoaded || loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="w-full h-screen">
      <FilteredClubs />
    </div>
  );
};
export default HomePage;
