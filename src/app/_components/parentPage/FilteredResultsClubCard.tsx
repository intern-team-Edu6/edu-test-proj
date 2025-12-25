import { Club } from "@/lib/mock-data";
import { Calendar, Clock, MapPin } from "lucide-react";
import React from "react";
import Map from "../Map";

type FilteredClubsCardProps = {
  filteredClubs: Club[];
  isFiltered: boolean;
  resetFilters: () => void;
};

const FilteredResultsClubCard = ({
  filteredClubs,
  isFiltered,
  resetFilters,
}: FilteredClubsCardProps) => {
  return (
    <div>
      <div className="mt-16 max-w-6xl mx-auto">
        <div className="bg-white/50 rounded-2xl p-8 border-2 border-slate-200 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-orange-600" />
              <h3 className="text-2xl font-black text-slate-900">Үр дүн</h3>
            </div>
            {isFiltered ? (
              <div className="text-sm text-slate-600">
                <span className="font-bold text-orange-600 mr-1">
                  {filteredClubs.length}
                </span>
                клуб олдлоо
              </div>
            ) : (
              ""
            )}
          </div>

          {filteredClubs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500 text-lg">
                Таны сонголтод тохирох клуб олдсонгүй
              </p>
              <p className="text-slate-400 text-sm mt-2">
                Өөр сонголт хийж үзнэ үү
              </p>
              {/* Reset Filter Button */}
              <div className="flex justify-center mt-6">
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-slate-300 rounded-xl font-bold text-slate-700 hover:bg-slate-100 hover:border-slate-400 transition-all duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                    <path d="M21 3v5h-5" />
                    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                    <path d="M3 21v-5h5" />
                  </svg>
                  Шүүлтүүр арилгах
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-6 ">
              {!isFiltered ? (
                <p className="text-center text-gray-500">Төрлөө сонгоно уу</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredClubs.map((club) => (
                    <div
                      key={club._id}
                      className="border-2 border-slate-200 rounded-xl p-6 hover:border-orange-400 hover:shadow-lg transition-all duration-300"
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

                      {/* <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                        {club.clubDescription}
                      </p> */}

                      <div className="flex justify-between gap-3 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-orange-600" />
                          <span className="text-slate-700 font-medium">
                            {club.clubWorkingDays.join(", ")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-orange-600" />
                          <span className="text-slate-700 font-medium">
                            {club.clubTime}
                          </span>
                        </div>
                      </div>

                      <div className="border-t pt-4 mt-4">
                        <div className="flex items-center justify-between">
                          {/* <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 font-bold">
                              {club.teacherName.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-slate-900">
                                {club.teacherName}
                              </p>
                              <p className="text-xs text-slate-500">
                                {club.teacherProfession}
                              </p>
                            </div>
                          </div> */}
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
              )}
            </div>
          )}
        </div>
        {isFiltered && (
          <div className="mt-10" data-scroll-point="map">
            <Map filteredClubs={filteredClubs} />
          </div>
        )}
      </div>
    </div>
  );
};

export default FilteredResultsClubCard;
