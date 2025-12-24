"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Plus, Upload } from "lucide-react";

const CLASS_CATEGORIES = ["SPORT", "ART", "SCIENCE", "LANGUAGE"];

export default function InterestClubAdminPage() {
  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const [form, setForm] = useState({
    clubCategoryName: "",
    classCategoryName: "",
    clubDescription: "",
    clubDate: "",
    clubTime: "",
    clubPrice: 0,
    clubAddress: "",
    lat: 0,
    lon: 0,
    clubImage: "",
    teacherName: "",
    teacherImage: "",
    teacherProfession: "",
    teacherAchievement: "",
    teacherExperience: "",
    teacherPhoneNumber: "",
  });

  console.log("form", form);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "clubImage" | "teacherImage"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setForm((prev) => ({ ...prev, [field]: base64 }));
      if (field === "clubImage") setImagePreview(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/interest-club", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      alert("Алдаа гарлаа");
      return;
    }

    alert("Амжилттай хадгалагдлаа");
    setOpen(false);
  };

  return (
    <div className="container mx-auto py-10">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Interest Club
          </Button>
        </DialogTrigger>

        <DialogContent className="max-h-[90vh] overflow-y-auto ">
          <DialogHeader>
            <DialogTitle>Create Interest Club</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="grid gap-4">
            {/* Club image */}
            <div>
              <Label>Club Image</Label>

              <div className="relative mt-2 h-40 w-full overflow-hidden rounded border border-dashed flex items-center justify-center">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="preview"
                    fill
                    className="object-cover cursor-pointer"
                  />
                ) : (
                  <Upload className="text-muted-foreground h-8 w-8" />
                )}
              </div>

              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, "clubImage")}
              />
            </div>

            <Input
              name="clubCategoryName"
              placeholder="Club name"
              value={form.clubCategoryName}
              onChange={handleChange}
              required
            />

            <Select
              value={form.classCategoryName}
              onValueChange={(v) => setForm({ ...form, classCategoryName: v })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Class category" />
              </SelectTrigger>
              <SelectContent>
                {CLASS_CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Textarea
              name="clubDescription"
              placeholder="Description"
              value={form.clubDescription}
              onChange={handleChange}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                type="date"
                name="clubDate"
                value={form.clubDate}
                onChange={handleChange}
              />
              <Input
                type="time"
                name="clubTime"
                value={form.clubTime}
                onChange={handleChange}
              />
            </div>

            <Input
              type="number"
              name="clubPrice"
              placeholder="Price"
              value={form.clubPrice}
              onChange={handleChange}
            />

            <Input
              name="clubAddress"
              placeholder="Address"
              value={form.clubAddress}
              onChange={handleChange}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                type="number"
                name="lat"
                placeholder="Latitude"
                onChange={handleChange}
              />
              <Input
                type="number"
                name="lon"
                placeholder="Longitude"
                onChange={handleChange}
              />
            </div>

            <hr />

            <Input
              name="teacherName"
              placeholder="Teacher name"
              value={form.teacherName}
              onChange={handleChange}
            />

            <Input
              name="teacherProfession"
              placeholder="Teacher profession"
              value={form.teacherProfession}
              onChange={handleChange}
            />

            <Input
              name="teacherExperience"
              placeholder="Teacher experience"
              value={form.teacherExperience}
              onChange={handleChange}
            />

            <Input
              name="teacherAchievement"
              placeholder="Teacher achievement"
              value={form.teacherAchievement}
              onChange={handleChange}
            />

            <Input
              name="teacherPhoneNumber"
              placeholder="Teacher phone number"
              value={form.teacherPhoneNumber}
              onChange={handleChange}
            />

            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
