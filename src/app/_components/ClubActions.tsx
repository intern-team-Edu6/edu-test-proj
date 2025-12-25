"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Calendar } from "lucide-react";
import type { Club } from "@/lib/mock-data";

interface Props {
  club: Club;
}

export default function ClubActions({ club }: Props) {
  const [active, setActive] = useState<
    "register" | "contact" | "meeting" | null
  >(null);

  return (
    <div className="mt-8">
      {/* Buttons */}
      <div className="flex flex-wrap gap-3.5">
        <Button
          variant={active === "register" ? "default" : "outline"}
          onClick={() => setActive(active === "register" ? null : "register")}
        >
          Бүртгүүлэх
        </Button>

        <Button
          variant={active === "contact" ? "default" : "outline"}
          onClick={() => setActive(active === "contact" ? null : "contact")}
        >
          Холбоо барих
        </Button>

        <Button
          variant={active === "meeting" ? "default" : "outline"}
          onClick={() => setActive(active === "meeting" ? null : "meeting")}
        >
          Уулзалтын цаг товлох
        </Button>
      </div>

      {/* Content */}
      {active && (
        <div className="mt-6 bg-slate-50 border-2 border-slate-200 rounded-xl p-5 space-y-3">
          {active === "register" && (
            <>
              <p className="font-semibold text-slate-800">Бүртгүүлэх байршил</p>
              <div className="flex items-center gap-2 text-slate-600">
                <MapPin className="w-4 h-4 text-orange-600" />
                <span>{club.clubAddress}</span>
              </div>
            </>
          )}

          {active === "contact" && (
            <>
              <p className="font-semibold text-slate-800">Холбоо барих</p>
              <div className="flex items-center gap-2 text-slate-600">
                <Phone className="w-4 h-4 text-orange-600" />
                <a
                  href={`tel:${club.teacherPhoneNumber}`}
                  className="font-medium hover:underline"
                >
                  {club.teacherPhoneNumber}
                </a>
              </div>
            </>
          )}

          {active === "meeting" && (
            <>
              <p className="font-semibold text-slate-800">
                Уулзалтын боломжит цаг
              </p>
              <div className="flex items-center gap-2 text-slate-600">
                <Calendar className="w-4 h-4 text-orange-600" />
                <span>
                  {club.clubWorkingDays.join(", ")} – {club.clubTime}
                </span>
              </div>
              <p className="text-sm text-slate-500">
                Багштай биечлэн уулзах боломжтой
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
