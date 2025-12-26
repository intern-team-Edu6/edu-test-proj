"use client";

import React, { useState } from "react";
import { MyUserButton } from "./MyUserButton";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ClubRegisterBtnDialogContent } from "./ClubRegisterBtnDialogContent";
import { useRouter } from "next/navigation";

export const Header = () => {
  // const { user } = useUser();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // const isAdmin = user?.publicMetadata?.role === "admin";

  return (
    <header className="bg-blue-950">
      <div className=" h-20 flex justify-between items-center text-white px-10">
        <div onClick={() => router.push("/")} className="cursor-pointer">
          LOGO
        </div>

        <div className="flex gap-5">
          {/* {isAdmin && ( */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-orange-500 rounded-full cursor-pointer">
                Дугуйлан Бүртгүүлэх
              </Button>
            </DialogTrigger>
            <ClubRegisterBtnDialogContent />
          </Dialog>
          {/* )} */}

          <MyUserButton />
        </div>
      </div>
    </header>
  );
};
