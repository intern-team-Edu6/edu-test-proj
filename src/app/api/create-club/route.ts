import connectDB from "@/lib/mongodb";
import { verifyToken } from "@clerk/backend";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const result = await checkAuth();

    if (!result) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { userClerkId, role } = result;

    const formNewData = await req.formData();
  } catch (error) {
    console.error("Error while", error);
  }

  return NextResponse.json({ message: "Club info saved successfully!" });
}
