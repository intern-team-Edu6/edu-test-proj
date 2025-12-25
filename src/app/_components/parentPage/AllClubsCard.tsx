import { mockClubs } from "@/lib/mock-data";
import { MapPin } from "lucide-react";
import React from "react";

const AllClubsCard = () => {
  return (
    <div className="mb-16 w-screen mx-auto">
      <div
        className="overflow-x-auto
      [&::-webkit-scrollbar]:hidden
      [-ms-overflow-style:none]
      [scrollbar-width:none]"
      >
        <div
          className="flex gap-4 w-max snap-x snap-mandatory snap-always"
          // style={{
          //   animation: "scroll 19s linear infinite",
          // }}
        >
          {mockClubs.map((club) => (
            <div
              key={club._id}
              className="snap-start w-80 border-2 border-slate-200 rounded-xl p-6 hover:border-orange-400 hover:shadow-lg transition-all duration-300"
            >
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
                <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">
                  {club.clubCategoryType}
                </span>
              </div>

              <div className="border-t pt-4 mt-4">
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
          ))}
        </div>
        {/* <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-1100px);
            }
          }
        `}</style> */}
      </div>
    </div>
  );
};

export default AllClubsCard;
