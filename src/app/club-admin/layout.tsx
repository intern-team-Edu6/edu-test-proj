"use client";

import { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function ClubAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    // if (!isLoaded) return;
    // const role = user?.publicMetadata?.role;
    // if (!user || role !== "admin") {
    //   router.push("/");
    // }
  }, [isLoaded, user, router]);

  if (!isLoaded || user)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  return <div>{children}</div>;
}
