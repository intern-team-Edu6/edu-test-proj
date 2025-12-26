import { mockClubs } from "@/lib/mock-data";
import { MapPin } from "lucide-react";
import Link from "next/link";
import React from "react";

const AllClubsCard = () => {
  const duplicatedClubs = [...mockClubs, ...mockClubs];

  return (
    <div className="mb-16 w-screen mx-auto">
      <div
        className="overflow-hidden
        [&::-webkit-scrollbar]:hidden
        [-ms-overflow-style:none]
        [scrollbar-width:none]"
      >
        <div
          className="flex gap-4 w-max animate-[scroll_100s_linear_infinite] hover:paused"
          style={{ willChange: "transform" }}
        >
          {duplicatedClubs.map((club, index) => (
            <Link
              key={`${club._id}-${index}`}
              href={`/club/${club._id}`}
              className="block"
            >
              <div className="snap-start bg-indigo-200/40 w-70 border-2 border-slate-200 rounded-xl p-6 hover:border-orange-400 hover:shadow-lg transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">
                      {club.clubCategoryName}
                    </h4>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <MapPin className="w-4 h-4" />
                      <span>{club.clubAddress}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4 mt-4 border-indigo-700">
                  <div className="flex items-center justify-between">
                    <div className="text-right">
                      <p className="text-lg font-bold text-orange-600">
                        {club.clubPrice.toLocaleString()}₮
                      </p>
                      <p className="text-xs text-slate-500">
                        {club.classCategoryName}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllClubsCard;
