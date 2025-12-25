//app/club/[id]/page.tsx

import { notFound } from "next/navigation";
import { mockClubs } from "@/lib/mock-data";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import ClubActions from "@/app/_components/ClubActions";

interface PageProps {
  params: {
    id: string;
  };
}

export default function ClubDetailPage({ params }: PageProps) {
  const club = mockClubs.find((c) => c._id === params.id);

  if (!club) {
    notFound();
  }

  return (
    <div className="container flex flex-col mx-auto px-4 py-12 max-w-4xl">
      <div className="bg-white border-2 border-slate-200 rounded-2xl p-8 shadow-lg gap-3">
        <h1 className="text-3xl font-black text-slate-900 mb-4">
          {club.clubCategoryName}
        </h1>

        <div className="flex items-center gap-2 text-slate-600 mb-6">
          <MapPin className="w-5 h-5 text-orange-600" />
          <span>{club.clubAddress}</span>
        </div>

        <p className="text-slate-700 mb-6">{club.clubDescription}</p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-orange-600" />
            <span>{club.clubWorkingDays.join(", ")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-600" />
            <span>{club.clubTime}</span>
          </div>
        </div>

        <div className="border-t pt-6 flex justify-between items-center">
          <div>
            <p className="font-semibold">{club.teacherName}</p>
            <p className="text-sm text-slate-500">{club.teacherProfession}</p>
          </div>
          <p className="text-2xl font-black text-orange-600">
            {club.clubPrice.toLocaleString()}₮
          </p>
        </div>
      </div>

      <div>
        <ClubActions club={club} />
      </div>
    </div>
  );
}
