"use client";

import React from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export const MyUserButton = () => {
  return (
    <div className="flex items-center">
      <SignedOut>
        <div className="flex gap-5">
          <SignInButton>
            <Button className="rounded-full cursor-pointer">Нэвтрэх</Button>
          </SignInButton>
        </div>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};
