"use client";

import React, { ChangeEvent, useState } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import MapSelector from "./main/MapSelector";

const recommendedClubCategoryNames = [
  "SPORT",
  "ART",
  "SCIENCE",
  "LANGUAGE",
  "MUSIC",
  "TECHNOLOGY",
];

const recommendedClubNames: Record<string, string[]> = {
  SPORT: [
    "Basketball Club",
    "Football Club",
    "Badminton Club",
    "Volleyball Club",
    "Chess Sport Club",
  ],
  ART: [
    "Art Club",
    "Drama Club",
    "Choir Club",
    "Dance Club",
    "Music Club",
    "Calligraphy",
  ],
  SCIENCE: [
    "STEM Club",
    "ICT / Computer Club",
    "Math Club",
    "Robotics Club",
    "Environmental Club",
    "Debate Club",
  ],
  LANGUAGE: [
    "English Club",
    "Mongolian Language Club",
    "Public Speaking Club",
    "Debate Club",
    "Literature Club",
    "New Language Learning Club",
  ],
  MUSIC: [
    "Piano Club",
    "Morin Khuur / Mongolian Traditional Music Club",
    "Choir Club",
    "Band / Ensemble",
    "Vocal Music Club",
    "Orchestra Club",
  ],
  TECHNOLOGY: [
    "Programming Club",
    "Web Development Club",
    "AI / ML Club",
    "Robotics Club",
    "Cybersecurity Club",
    "Mobile App Development Club",
  ],
};
const classLevels = ["Elementary", "Middle", "High"];

const weekDays = [
  { label: "Да", value: "MON" },
  { label: "Мя", value: "TUE" },
  { label: "Лх", value: "WED" },
  { label: "Пү", value: "THU" },
  { label: "Ба", value: "FRI" },
  { label: "Бя", value: "SAT" },
  { label: "Ня", value: "SUN" },
];

export const ClubRegisterBtnDialogContent = () => {
  const [clubName, setClubName] = useState<string>("");
  const [clubCategoryName, setClubCategoryName] = useState<string>("");
  const [selectedClassLevelNames, setSelectedClassLevelNames] = useState<
    string[]
  >([]);
  const [clubPrices, setClubPrices] = useState<Record<string, number>>({});
  const [clubImage, setClubImage] = useState<File | undefined>();
  const [clubImagePreview, setClubImagePreview] = useState<string>("");

  const [clubDescription, setClubDescription] = useState<string>("");
  const [selectedClubWorkingDays, setSelectedClubWorkingDays] = useState<
    string[]
  >([]);
  const [scheduledClubTimes, setScheduledClubTimes] = useState<
    Record<string, { startTime: string; endTime: string }>
  >({});
  const [clubAddress, setClubAddress] = useState<string>("");
  const [clubLat, setClubLat] = useState<number | null>(null);
  const [clubLong, setClubLong] = useState<number | null>(null);

  const handleSelectedClubWorkingDays = (days: string[]) => {
    setSelectedClubWorkingDays(days);

    setScheduledClubTimes((prev) => {
      const updated = { ...prev };

      days.forEach((day) => {
        if (!updated[day]) {
          updated[day] = { startTime: "", endTime: "" };
        }
      });

      Object.keys(updated).forEach((day) => {
        if (!day.includes(day)) {
          delete updated[day];
        }
      });

      return updated;
    });
  };

  const imageFileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setClubImage(e.target.files[0]);
      const filePreview = URL.createObjectURL(e.target.files[0]);
      setClubImagePreview(filePreview);
    }
  };

  const handleLocationSelectOnMap = (lat: number, lng: number) => {
    setClubLat(lat);
    setClubLong(lng);
  };

  console.log({ clubName });
  console.log({ clubCategoryName });
  console.log({ selectedClassLevelNames });
  console.log({ clubPrices });
  console.log({ clubImage });
  console.log({ clubImagePreview });
  console.log({ clubDescription });
  console.log({ selectedClubWorkingDays });
  console.log({ scheduledClubTimes });
  console.log({});
  console.log({});

  return (
    <DialogContent className="sm:max-w-230 max-h-[90vh] gap-10 overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Дугуйлангийн мэдээлэл оруулах</DialogTitle>
        <DialogDescription hidden />
      </DialogHeader>

      <div className="flex gap-10">
        <div className="w-110 flex flex-col gap-6">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="clubCategoryName">Ангилал:</Label>
            <Input
              id="clubCategoryName"
              list="recommendedClubCategoryNames"
              value={clubCategoryName}
              onChange={(e) => setClubCategoryName(e.target.value)}
              placeholder="Дугуйлангийн төрлийг оруулна уу..."
            />
            <datalist id="recommendedClubCategoryNames">
              {recommendedClubCategoryNames.map((category) => (
                <option key={category} value={category} />
              ))}
            </datalist>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="clubName">Нэр:</Label>
            <Input
              id="clubName"
              list="recommendedClubNames"
              value={clubName}
              onChange={(e) => setClubName(e.target.value)}
              placeholder="Дугуйлангийн нэрийг оруулна уу..."
            />
            <datalist id="recommendedClubNames">
              {clubCategoryName &&
                recommendedClubNames[clubCategoryName]?.map((name) => (
                  <option key={name} value={name} />
                ))}
            </datalist>
          </div>

          <div className="flex gap-30">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="selectedClassLevelName">Анги:</Label>
              <ToggleGroup
                id="selectedClassLevelName"
                type="multiple"
                value={selectedClassLevelNames}
                onValueChange={(values) => {
                  setSelectedClassLevelNames(values);
                  setClubPrices((prev) => {
                    const updated = { ...prev };
                    Object.keys(updated).forEach((key) => {
                      if (!values.includes(key)) delete updated[key];
                    });
                    return updated;
                  });
                }}
                className="flex flex-wrap gap-2"
              >
                <div className="flex flex-col gap-1.5">
                  {classLevels.map((level) => (
                    <ToggleGroupItem
                      key={level}
                      value={level}
                      className="w-fit px-4 py-2 rounded-full data-[state=on]:bg-blue-500 data-[state=on]:text-white"
                    >
                      {level}
                    </ToggleGroupItem>
                  ))}
                </div>
              </ToggleGroup>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>Үнэ:</Label>
              {selectedClassLevelNames.length > 0 && (
                <div className="flex flex-col gap-1.5">
                  {selectedClassLevelNames.map((level) => (
                    <div className="flex gap-1.5">
                      <Label>{level}: </Label>
                      <Input
                        type="number"
                        placeholder="Үнэ (₮)"
                        value={clubPrices[level] || ""}
                        onChange={(e) =>
                          setClubPrices((prev) => ({
                            ...prev,
                            [level]: Number(e.target.value),
                          }))
                        }
                        className="w-full"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="clubDescription">Товч танилцуулга:</Label>
            <Textarea
              id="clubDescription"
              className="min-h-18"
              value={clubDescription}
              onChange={(e) => setClubDescription(e.target.value)}
              placeholder="Дугуйлангийн товч танилцуулгыг оруулна уу..."
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="clubImage">Зураг:</Label>
            {clubImage ? (
              <div className="w-full h-35 rounded-md border border-border border-dashed relative overflow-hidden">
                <Image
                  src={clubImagePreview}
                  alt={"image preview"}
                  width={440}
                  height={140}
                  className="object-cover w-full h-full"
                  unoptimized
                />
                <Button
                  type="button"
                  variant={"secondary"}
                  onClick={() => setClubImage(undefined)}
                  className="absolute w-9 h-9 rounded-full right-1 top-1"
                >
                  <X />
                </Button>
              </div>
            ) : (
              <div className="w-full h-35 bg-gray-800/5 flex justify-center items-center p-4 rounded-md border border-border border-dashed relative">
                <input
                  id="clubImage"
                  type="file"
                  onChange={imageFileChangeHandler}
                  className="absolute inset-0 opacity-0 cursor-pointer border"
                />
                <div className="flex flex-col justify-center items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-background flex justify-center items-center">
                    <Upload className="text-muted-foreground" />
                  </div>
                  <Label className="text-muted-foreground">
                    Choose a file or drag & drop it here
                  </Label>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="selectedClubWorkingDays">Хичээллэх өдөр:</Label>
            <ToggleGroup
              id="selectedClubWorkingDays"
              type="multiple"
              value={selectedClubWorkingDays}
              onValueChange={handleSelectedClubWorkingDays}
              className="flex flex-wrap gap-2"
            >
              {weekDays.map((day) => (
                <ToggleGroupItem
                  key={day.value}
                  value={day.value}
                  className="px-4 py-2 rounded-full data-[state=on]:bg-blue-500 data-[state=on]:text-white"
                >
                  {day.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="scheduledClubTimes">Цаг:</Label>
            {selectedClubWorkingDays.map((day) => {
              const dayLabel = weekDays.find((d) => d.value === day)?.label;
              return (
                <div
                  key={day}
                  className="flex items-center gap-4 rounded-full p-1"
                >
                  <Label>{dayLabel}</Label>
                  <Input
                    type="time"
                    value={scheduledClubTimes[day]?.startTime || ""}
                    onChange={(e) =>
                      setScheduledClubTimes((prev) => ({
                        ...prev,
                        [day]: { ...prev[day], startTime: e.target.value },
                      }))
                    }
                  />
                  <span>-</span>
                  <Input
                    type="time"
                    value={scheduledClubTimes[day]?.endTime || ""}
                    onChange={(e) =>
                      setScheduledClubTimes((prev) => ({
                        ...prev,
                        [day]: { ...prev[day], endTime: e.target.value },
                      }))
                    }
                  />
                </div>
              );
            })}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Хаяг оруулах:</Label>
            <Input
              value={clubAddress}
              onChange={(e) => setClubAddress(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Байршил сонгох:</Label>
            <div className="flex gap-1.5">
              <Input
                type="number"
                name="clubLat"
                placeholder="Уртраг"
                value={clubLat || ""}
                onChange={(e) => setClubLat(Number(e.target.value))}
              />
              <Input
                type="number"
                name="clubLong"
                placeholder="Өргөрөг"
                value={clubLong || ""}
                onChange={(e) => setClubLong(Number(e.target.value))}
              />
            </div>
            <MapSelector
              lat={clubLat || 47.9215}
              lng={clubLong || 106.9186}
              setLat={setClubLat}
              setLng={setClubLong}
              onLocationSelect={handleLocationSelectOnMap}
            />
          </div>
        </div>

        <div className="w-110"></div>
      </div>
    </DialogContent>
  );
};
