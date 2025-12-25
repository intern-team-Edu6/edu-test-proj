"use client";
import { Calendar, Clock, MapPin } from "lucide-react";
import { useState, useMemo } from "react";
import { mockClubs } from "@/lib/mock-data";
import Map from "../_components/Map";

const FilteredClubs = () => {
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedSport, setSelectedSport] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<string>("");

  // Reset all filters
  const resetFilters = () => {
    setSelectedClass("");
    setSelectedDate("");
    setSelectedTime("");
    setSelectedSport("");
    setSelectedGenre("");
  };

  const classes = [
    { label: "Бага анги", value: "ELEMENTARY" },
    { label: "Дунд анги", value: "MIDDLESCHOOL" },
    { label: "Ахлах анги", value: "HIGHSCHOOL" },
  ];

  // Map genre to clubCategoryType
  const genreTypeMap: Record<string, string> = {
    sports: "SPORTS",
    arts: "ARTS",
    education: "EDUCATION",
    entertainment: "FUN",
  };

  // Map course names to club category names
  const courseNameMap: Record<string, string[]> = {
    Бөх: ["Wrestling Club"],
    Хөлбөмбөг: ["Football Club", "Soccer Club"],
    "Сагсан бөмбөг": ["Basketball Club"],
    "Тулаан спорт": ["Martial Arts Club", "Karate Club"],
    Теннис: ["Tennis Club"],
    Волейбол: ["Volleyball Club"],
    Бадминтон: ["Badminton Club"],
    Бокс: ["Boxing Club"],
    Гимнастик: ["Gymnastics Club"],
    "Хөнгөн атлетик": ["Athletics Club", "Track Club"],
    "Дугуйн спорт": ["Cycling Club"],
    "Усан сэлэлт": ["Swimming Club"],
    "Хөлөг онгоц": ["Rowing Club"],
    "Уран бүжиг": ["Dance Club"],
    Хөгжим: ["Music Club"],
    "Дуу хөгжим": ["Singing Club", "Music Club"],
    Зураг: ["Art Club", "Drawing Club", "Photography Club"],
    "Гар урлал": ["Craft Club", "Art Club"],
    "Англи хэл": ["English Speaking Club", "English Club"],
    Математик: ["Math Club"],
    Програмчлал: ["Coding Club", "Programming Club"],
    Робот: ["Robotics Club", "Robot Club"],
    Шатар: ["Chess Club"],
    "Хүүхдийн тоглоом": ["Gaming Club", "Fun Club", "Cooking Club"],
  };

  const timeSlots = [
    { label: "Үдээс өмнө", value: "morning", range: [8, 12] },
    { label: "Үдээс хойш", value: "afternoon", range: [12, 18] },
    { label: "Орой", value: "evening", range: [18, 22] },
  ];

  // Filter clubs based on selected criteria
  const filteredClubs = useMemo(() => {
    let filtered = [...mockClubs];

    // Filter by class
    if (selectedClass) {
      filtered = filtered.filter(
        (club) => club.classCategoryName === selectedClass
      );
    }

    // Filter by date
    if (selectedDate) {
      filtered = filtered.filter((club) =>
        club.clubWorkingDays.includes(selectedDate)
      );
    }

    // Filter by time
    if (selectedTime) {
      // Find the time range for the selected period
      const timeSlot = timeSlots.find((slot) => slot.value === selectedTime);
      if (timeSlot) {
        const [startHour, endHour] = timeSlot.range;
        filtered = filtered.filter((club) => {
          const clubHour = parseInt(club.clubTime.split(":")[0]);
          return clubHour >= startHour && clubHour < endHour;
        });
      }
    }

    // Filter by genre
    const genreType = genreTypeMap[selectedGenre];
    if (genreType) {
      filtered = filtered.filter((club) => club.clubCategoryType === genreType);
    }

    // Filter by specific sport/course
    if (selectedSport) {
      const possibleNames = courseNameMap[selectedSport] || [selectedSport];
      filtered = filtered.filter((club) =>
        possibleNames.some((name) =>
          club.clubCategoryName.toLowerCase().includes(name.toLowerCase())
        )
      );
    }

    return filtered;
  }, [selectedClass, selectedDate, selectedTime, selectedGenre, selectedSport]);

  const coursesByGenre = {
    sports: [
      { name: "Бөх", icon: "🤼" },
      { name: "Хөлбөмбөг", icon: "⚽" },
      { name: "Сагсан бөмбөг", icon: "🏀" },
      { name: "Тулаан спорт", icon: "🥋" },
      { name: "Теннис", icon: "🎾" },
      { name: "Волейбол", icon: "🏐" },
      { name: "Бадминтон", icon: "🏸" },
      { name: "Бокс", icon: "🥊" },
      { name: "Гимнастик", icon: "🤸" },
      { name: "Хөнгөн атлетик", icon: "🏃" },
      { name: "Дугуйн спорт", icon: "🚴" },
      { name: "Усан сэлэлт", icon: "🏊" },
      { name: "Хөлөг онгоц", icon: "🚣" },
    ],
    arts: [
      { name: "Уран бүжиг", icon: "💃" },
      { name: "Хөгжим", icon: "🎵" },
      { name: "Дуу хөгжим", icon: "🎤" },
      { name: "Зураг", icon: "🎨" },
      { name: "Гар урлал", icon: "✂️" },
    ],
    education: [
      { name: "Англи хэл", icon: "🇬🇧" },
      { name: "Математик", icon: "🔢" },
      { name: "Програмчлал", icon: "💻" },
      { name: "Робот", icon: "🤖" },
      { name: "Шатар", icon: "♟️" },
    ],
    entertainment: [{ name: "Хүүхдийн тоглоом", icon: "�" }],
  };

  const genres = [
    { id: "sports", label: "Спорт", icon: "⚽" },
    { id: "arts", label: "Урлаг", icon: "🎨" },
    { id: "education", label: "Боловсрол", icon: "📚" },
    { id: "entertainment", label: "Зугаа цэнгэл", icon: "🎮" },
  ];

  const availableDays = [
    { day: "Monday", label: "Даваа" },
    { day: "Tuesday", label: "Мягмар" },
    { day: "Wednesday", label: "Лхагва" },
    { day: "Thursday", label: "Пүрэв" },
    { day: "Friday", label: "Баасан" },
    { day: "Saturday", label: "Бямба" },
    { day: "Sunday", label: "Ням" },
  ];

  const clubs = [
    {
      name: "Elite Wrestling Academy",
      sport: "Wrestling",
      location: "Downtown District",
      rating: 4.9,
      students: 120,
      image: "/wrestling-training-confident-teenagers.jpg",
    },
    {
      name: "Champions Football Club",
      sport: "Football",
      location: "North Stadium",
      rating: 4.8,
      students: 200,
      image: "/football-training-young-athletes.jpg",
    },
    {
      name: "Warriors Martial Arts",
      sport: "Martial Arts",
      location: "Central Gym",
      rating: 5.0,
      students: 85,
      image: "/martial-arts-training-kids-discipline.jpg",
    },
    {
      name: "Victory Basketball Team",
      sport: "Basketball",
      location: "West Arena",
      rating: 4.7,
      students: 150,
      image: "/basketball-training-young-players.jpg",
    },
  ];
  return (
    <div>
      {/* Sports Categories */}
      <section id="sports" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-white rounded-xl p-2 gap-2 border-2 border-slate-200 shadow-sm">
              {classes.map((classItem) => (
                <button
                  key={classItem.value}
                  onClick={() => setSelectedClass(classItem.value)}
                  className={`px-6 py-3 rounded-lg font-bold transition-all duration-200 ${
                    selectedClass === classItem.value
                      ? "bg-slate-900 text-white shadow-lg"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {classItem.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-16 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 border-2 border-slate-200 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-6 h-6 text-orange-600" />
                <h3 className="text-2xl font-black text-navy-900">
                  Огноо ба цаг сонгох
                </h3>
              </div>

              {/* Date Selector */}
              <div className="mb-8">
                <p className="text-sm font-bold text-slate-600 mb-4 uppercase tracking-wide">
                  Өдөр сонгох
                </p>
                <div className="grid grid-cols-7 gap-3">
                  {availableDays.map((dayInfo) => (
                    <button
                      key={dayInfo.day}
                      onClick={() => setSelectedDate(dayInfo.day)}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${
                        selectedDate === dayInfo.day
                          ? "bg-orange-600 border-orange-600 text-white shadow-lg scale-105"
                          : "border-slate-200 hover:border-orange-600 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span className="text-xs font-bold text-center">
                        {dayInfo.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selector */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-orange-600" />
                  <p className="text-sm font-bold text-slate-600 uppercase tracking-wide">
                    Цаг сонгох
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {timeSlots.map((timeSlot) => (
                    <button
                      key={timeSlot.value}
                      onClick={() => setSelectedTime(timeSlot.value)}
                      className={`py-4 px-6 rounded-xl border-2 font-bold transition-all duration-200 ${
                        selectedTime === timeSlot.value
                          ? "bg-slate-900 border-slate-900 text-white shadow-lg"
                          : "border-slate-200 hover:border-orange-600 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <div className="text-center">
                        <div className="mb-1">{timeSlot.label}</div>
                        <div className="text-xs opacity-70">
                          {timeSlot.range[0]}:00 - {timeSlot.range[1]}:00
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              Хичээл сонгох
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Ангилалаас хичээлээ сонгоорой
            </p>
          </div>

          {/* Genre Tabs */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {genres.map((genre) => (
                <button
                  key={genre.id}
                  onClick={() => setSelectedGenre(genre.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all duration-200 ${
                    selectedGenre === genre.id
                      ? "bg-orange-600 text-white shadow-lg"
                      : "bg-white text-slate-700 border-2 border-slate-200 hover:border-orange-400"
                  }`}
                >
                  <span className="text-xl">{genre.icon}</span>
                  <span>{genre.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Courses List - Scrollable */}
          {selectedGenre && (
            <div className="max-w-6xl mx-auto mb-16">
              <div className="bg-white rounded-2xl p-6 border-2 border-slate-200 shadow-lg">
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  {genres.find((g) => g.id === selectedGenre)?.label}
                </h3>
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-slate-100">
                  {coursesByGenre[
                    selectedGenre as keyof typeof coursesByGenre
                  ].map((item) => (
                    <button
                      key={item.name}
                      onClick={() => setSelectedSport(item.name)}
                      className={`shrink-0 w-32 p-5 rounded-xl border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                        selectedSport === item.name
                          ? "border-orange-500 bg-orange-50 shadow-md"
                          : "border-slate-200 bg-white hover:border-orange-300"
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div
                          className={`text-4xl transition-transform duration-300 ${
                            selectedSport === item.name
                              ? "scale-110"
                              : "group-hover:scale-110"
                          }`}
                        >
                          {item.icon}
                        </div>
                        <span
                          className={`font-semibold text-xs text-center transition-colors ${
                            selectedSport === item.name
                              ? "text-orange-600"
                              : "text-slate-700"
                          }`}
                        >
                          {item.name}
                        </span>
                      </div>
                      {selectedSport === item.name && (
                        <div className="mt-2 w-full h-1 bg-orange-500 rounded-full"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Filtered Results */}
          <div className="mt-16 max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl p-8 border-2 border-slate-200 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-orange-600" />
                  <h3 className="text-2xl font-black text-slate-900">Үр дүн</h3>
                </div>
                <div className="text-sm text-slate-600">
                  <span className="font-bold text-orange-600">
                    {filteredClubs.length}
                  </span>{" "}
                  клуб олдлоо
                </div>
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

                      <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                        {club.clubDescription}
                      </p>

                      <div className="grid grid-cols-2 gap-3 mb-4">
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
                          <div className="flex items-center gap-3">
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
                          </div>
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
          </div>
          <div className="mt-10">
            {filteredClubs ? <Map filteredClubs={filteredClubs}></Map> : ""}
          </div>
        </div>
      </section>
    </div>
  );
};
export default FilteredClubs;
