"use client";

import React, { useEffect } from "react";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export const MyUserButton = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  console.log({ user });

  useEffect(() => {
    if (!isLoaded || !user) return;

    const role = user?.publicMetadata?.role;

    if (role === "admin") {
      router.push("/admin/create-club");
    }
  }, [isLoaded, user, router]);

  return (
    <div className="flex items-center">
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};
