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
    <header className="bg-blue-950">
      <div className=" h-20 flex justify-between items-center text-white px-10">
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
      </div>
    </header>
  );
};
