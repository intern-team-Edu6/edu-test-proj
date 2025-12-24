"use client";
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

const JamkaPage = () => {
  const [selectedClass, setSelectedClass] = useState<string>("middle");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedSport, setSelectedSport] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<string>("sports");

  const classes = [
    { id: "junior", label: "Бага анги" },
    { id: "middle", label: "Дунд анги" },
    { id: "senior", label: "Ахлах анги" },
  ];

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

  cons
    { date: "2025-01-15", day: "Да", dayNum: "15" },
    { date: "2025-01-16", day: "Мя", dayNum: "16" },
    { date: "2025-01-17", day: "Лх", dayNum: "17" },
    { date: "2025-01-18", day: "Пү", dayNum: "18" },
    { date: "2025-01-19", day: "Ба", dayNum: "19" },
    { date: "2025-01-20", day: "Бя", dayNum: "20" },
    { date: "2025-01-21", day: "Ня", dayNum: "21" },
  ];

  const timeSlots = [
    "9:00 AM",
    "10:30 AM",
    "12:00 PM",
    "2:00 PM",
    "4:00 PM",
    "6:00 PM",
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
                  key={classItem.id}
                  onClick={() => setSelectedClass(classItem.id)}
                  className={`px-6 py-3 rounded-lg font-bold transition-all duration-200 ${
                    selectedClass === classItem.id
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
                  {availableDates.map((dateInfo) => (
                    <button
                      key={dateInfo.date}
                      onClick={() => setSelectedDate(dateInfo.date)}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${
                        selectedDate === dateInfo.date
                          ? "bg-orange-600 border-orange-600 text-white shadow-lg scale-105"
                          : "border-slate-200 hover:border-orange-600 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span className="text-xs font-bold mb-1">
                        {dateInfo.day}
                      </span>
                      <span className="text-2xl font-black">
                        {dateInfo.dayNum}
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
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-4 px-6 rounded-xl border-2 font-bold transition-all duration-200 ${
                        selectedTime === time
                          ? "bg-slate-900 border-slate-900 text-white shadow-lg"
                          : "border-slate-200 hover:border-orange-600 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {time}
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

          {selectedSport && (
            <div className="mt-16 max-w-6xl mx-auto">
              <div className="bg-white rounded-2xl p-8 border-2 border-slate-200 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="w-6 h-6 text-orange-600" />
                  <h3 className="text-2xl font-black text-navy-900">
                    {selectedSport} клубууд таны ойролцоо
                  </h3>
                </div>
                <div className="relative w-full h-96 rounded-xl overflow-hidden bg-slate-100">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30591910525!2d-74.25986548248684!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Спорт клубын байршил"
                  />
                </div>
                <p className="mt-4 text-slate-600 text-center">
                  Таны бүсэд байгаа {selectedSport} клубууд
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
export default JamkaPage;
