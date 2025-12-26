import connectDB from "@/lib/mongodb";
import { NewClubType } from "@/lib/utils/types";
import { uploadImageToCloudinary } from "@/lib/utils/uploadImage";
import { verifyToken } from "@clerk/backend";
import { error } from "console";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    // const result = await checkAuth();

    // if (!result) {
    //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    // }
    // const { userClerkId, role } = result;

    const formNewData = await req.formData();

    const clubName = formNewData.get("clubName") as string;
    const clubCategoryName = formNewData.get("clubCategoryName") as string;

    const selectedClassLevelNames = formNewData.get(
      "selectedClassLevelNames"
    ) as string;

    const clubPrices = formNewData.get("clubPrices") as string;
    const clubImage = formNewData.get("clubImage") as File;
    const clubDescription = formNewData.get("clubDescription") as string;
    const selectedClubWorkingDays = formNewData.get(
      "selectedClubWorkingDays"
    ) as string;
    const scheduledClubTimes = formNewData.get("scheduledClubTimes") as string;
    const clubAddress = formNewData.get("clubAddress") as string;
    const clubLat = formNewData.get("clubLat") as string;
    const clubLong = formNewData.get("clubLong") as string;
    const teacherImage = formNewData.get("teacherImage") as File;
    const teacherName = formNewData.get("teacherName") as string;
    const teacherPhone = formNewData.get("teacherPhone") as string;
    const teacherEmail = formNewData.get("teacherEmail") as string;
    const teacherProfession = formNewData.get("teacherProfession") as string;
    const teacherExperience = formNewData.get("teacherExperience") as string;
    const teacherAchievement = formNewData.get("teacherAchievement") as string;

    console.log({
      clubName,
      clubCategoryName,
      selectedClassLevelNames,
      clubPrices,
      clubImage,
      clubDescription,
      selectedClubWorkingDays,
      scheduledClubTimes,
      clubAddress,
      clubLat,
      clubLong,
      teacherImage,
      teacherName,
      teacherPhone,
      teacherEmail,
      teacherProfession,
      teacherExperience,
      teacherAchievement,
    });

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
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let clubImageUrl = "";
    if (clubImage) {
      clubImageUrl = await uploadImageToCloudinary(clubImage);
    }

    let teacherImageUrl = "";
    if (teacherImage) {
      teacherImageUrl = await uploadImageToCloudinary(teacherImage);
    }

    const newClubData: NewClubType = {
      clubName,
      clubCategoryName,
      selectedClassLevelNames,
      clubPrices: parseFloat(clubPrices),
      clubImage: clubImageUrl,
      clubDescription,
      selectedClubWorkingDays,
      scheduledClubTimes,
      clubAddress,
      clubLat: parseFloat(clubLat),
      clubLong: parseFloat(clubLong),
      teacherImage: teacherImageUrl,
      teacherName,
      teacherPhone,
      teacherEmail,
      teacherProfession,
      teacherExperience,
      teacherAchievement,
    };

    await createNewClub(newClubData);

    return NextResponse.json(
      { message: "Club info saved successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while", error);
    return NextResponse.json(
      {
        message: "Failed to process new food data",
      },
      { status: 500 }
    );
  }
}
