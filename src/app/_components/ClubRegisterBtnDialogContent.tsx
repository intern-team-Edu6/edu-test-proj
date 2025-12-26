"use client";

import React, { ChangeEvent, useState } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";

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

  const [teacherImage, setTeacherImage] = useState<File | undefined>();
  const [teacherImagePreview, setTeacherImagePreview] = useState<string>("");
  const [teacherName, setTeacherName] = useState<string>("");
  const [teacherPhone, setTeacherPhone] = useState<number>();
  const [teacherEmail, setTeacherEmail] = useState<string>("");
  const [teacherProfession, setTeacherProfession] = useState<string>("");
  const [teacherExperience, setTeacherExperience] = useState<string>("");
  const [teacherAchievement, setTeacherAchievement] = useState<string>("");
  // const { getToken } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

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

  const clubImageFileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
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

  const teacherImageFileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setTeacherImage(e.target.files[0]);
      const filePreview = URL.createObjectURL(e.target.files[0]);
      setTeacherImagePreview(filePreview);
    }
  };

  const handleSaveClubInfo = async () => {
    // const token = await getToken();

    if (
      !clubName ||
      !clubCategoryName ||
      !selectedClassLevelNames ||
      !clubPrices ||
      !clubImage ||
      !clubDescription ||
      !selectedClubWorkingDays ||
      !scheduledClubTimes ||
      !clubAddress ||
      !clubLat ||
      !clubLong ||
      !teacherImage ||
      !teacherName ||
      !teacherPhone ||
      !teacherEmail ||
      !teacherProfession ||
      !teacherExperience ||
      !teacherAchievement
      // !token
    ) {
      toast.warning("All fields are required!");
      return;
    }

    setLoading(true);
    const newForm = new FormData();

    newForm.append("clubName", clubName);
    newForm.append("clubCategoryName", clubCategoryName);
    newForm.append(
      "selectedClassLevelNames",
      JSON.stringify(selectedClassLevelNames)
    );
    newForm.append("clubPrices", JSON.stringify(clubPrices));
    newForm.append("clubImage", clubImage as File);
    newForm.append("clubDescription", clubDescription);
    newForm.append(
      "selectedClubWorkingDays",
      JSON.stringify(selectedClubWorkingDays)
    );
    newForm.append("scheduledClubTimes", JSON.stringify(scheduledClubTimes));
    newForm.append("clubAddress", clubAddress);
    newForm.append("clubLat", String(clubLat));
    newForm.append("clubLong", String(clubLong));
    newForm.append("teacherImage", teacherImage as File);
    newForm.append("teacherName", teacherName);
    newForm.append("teacherPhone", String(teacherPhone));
    newForm.append("teacherEmail", teacherEmail);
    newForm.append("teacherProfession", teacherProfession);
    newForm.append("teacherExperience", teacherExperience);
    newForm.append("teacherAchievement", teacherAchievement);

    await fetch("/api/create-club", {
      method: "POST",
      body: newForm,
    });

    setLoading(false);
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
  console.log({ clubAddress });
  console.log({ clubLat });
  console.log({ clubLong });
  console.log({ teacherImage });
  console.log({ teacherImagePreview });
  console.log({ teacherName });
  console.log({ teacherPhone });
  console.log({ teacherEmail });
  console.log({ teacherProfession });
  console.log({ teacherExperience });
  console.log({ teacherAchievement });

  return (
    <DialogContent className="sm:max-w-260 max-h-[90vh] gap-10 overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="font-bold">Дугуйлан бүртгүүлэх</DialogTitle>
        <DialogDescription hidden />
      </DialogHeader>

      <div className="flex justify-between">
        <div className="w-125 flex flex-col gap-6">
          <Label className="text-base font-semibold">
            Дугуйлангийн мэдээлэл оруулах хэсэг:
          </Label>
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
              value={clubDescription}
              onChange={(e) => setClubDescription(e.target.value)}
              placeholder="Дугуйлангийн товч танилцуулгыг оруулна уу..."
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="clubImage">Зураг:</Label>
            {clubImage ? (
              <div className="w-full h-65 rounded-md border border-border border-dashed relative overflow-hidden">
                <Image
                  src={clubImagePreview}
                  alt={"image preview"}
                  width={440}
                  height={260}
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
              <div className="w-full h-65 bg-gray-800/5 flex justify-center items-center p-4 rounded-md border border-border border-dashed relative">
                <input
                  id="clubImage"
                  type="file"
                  onChange={clubImageFileChangeHandler}
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
              placeholder="Дугуйлангийн хаягаа оруулна уу..."
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

        <div className="w-100 flex flex-col gap-6">
          <Label className="text-base font-semibold">
            Багшийн мэдээлэд оруулах хэсэг:
          </Label>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="teacherImage">Багш зураг:</Label>
            {teacherImage ? (
              <div className="w-full h-55 rounded-md border border-border border-dashed relative overflow-hidden">
                <Image
                  src={teacherImagePreview}
                  alt={"image preview"}
                  width={440}
                  height={220}
                  className="object-cover w-full h-full"
                  unoptimized
                />
                <Button
                  type="button"
                  variant={"secondary"}
                  onClick={() => setTeacherImage(undefined)}
                  className="absolute w-9 h-9 rounded-full right-1 top-1"
                >
                  <X />
                </Button>
              </div>
            ) : (
              <div className="w-full h-55 bg-gray-800/5 flex justify-center items-center p-4 rounded-md border border-border border-dashed relative">
                <input
                  id="teacherImage"
                  type="file"
                  onChange={teacherImageFileChangeHandler}
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
            <Label htmlFor="teacherName">Багшийн нэр:</Label>
            <Input
              id="teacherName"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              placeholder="Багшийн нэрийг оруулна уу..."
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="teacherPhone">Утас:</Label>
            <Input
              id="teacherPhone"
              type="number"
              value={teacherPhone}
              onChange={(e) => setTeacherPhone(Number(e.target.value))}
              placeholder="Багшийн холбоо барих утсыг оруулна уу..."
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="teacherEmail">Имэйл:</Label>
            <Input
              id="teacherEmail"
              value={teacherEmail}
              onChange={(e) => setTeacherEmail(e.target.value)}
              placeholder="Багшийн имэйл хаягийг оруулна уу..."
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="teacherProfession">Мэргэжил:</Label>
            <Input
              id="teacherProfession"
              value={teacherProfession}
              onChange={(e) => setTeacherProfession(e.target.value)}
              placeholder="Багшийн мэргэжлийг оруулна уу..."
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="teacherExperience">Туршлага:</Label>
            <Textarea
              id="teacherExperience"
              value={teacherExperience}
              onChange={(e) => setTeacherExperience(e.target.value)}
              placeholder="Багшийн туршлагыг оруулна уу..."
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="teacherAchievement">Гаргасан амжилт:</Label>
            <Textarea
              id="teacherAchievement"
              value={teacherAchievement}
              onChange={(e) => setTeacherAchievement(e.target.value)}
              placeholder="Багшийн ололт амжилтыг оруулна уу..."
            />
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button onClick={handleSaveClubInfo} className="cursor-pointer">
          Мэдээлэл хадгалах
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
