"use client";

import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function ClubAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    if (!isLoaded) return;

    if (!user) {
      router.push("/");
      return;
    }

    const role = user.publicMetadata?.role;

    if (role !== "admin") {
      router.push("/");
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

  return <>{children}</>;
}
