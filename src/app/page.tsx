"use client";

import JamkaPage from "@/components/jamka/page";
import React, { use, useEffect } from "react";
import Header from "./_components/Header";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const HomePage = () => {
  const { user, isSignedIn } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (user?.publicMetadata.role === "admin") {
      router.push("/redirect");
    }
  }, []);

  console.log("HomePage - User info:", user?.publicMetadata.role, isSignedIn);
  return (
    <div>
      <Header children={undefined} />
      <JamkaPage />
    </div>
  );
};
export default HomePage;
