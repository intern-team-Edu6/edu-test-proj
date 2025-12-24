"use client";

import React from "react";
import { MyUserButton } from "./MyUserButton";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const { user } = useUser();
  const router = useRouter();

  const isAdmin = user?.publicMetadata?.role === "admin";

  return (
    <header className="w-full h-20 bg-blue-950 text-white flex justify-between items-center px-10">
      <div>LOGO</div>

      <div className="flex gap-5">
        {isAdmin && (
          <Button
            onClick={() => router.push("/club-admin/create-club")}
            className="bg-orange-500 rounded-full cursor-pointer"
          >
            Дугуйлан Бүртгүүлэх
          </Button>
        )}

        <MyUserButton />
      </div>
    </header>
  );
};
