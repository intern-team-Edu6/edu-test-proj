import connectDB from "@/lib/mongodb";
import { verifyToken } from "@clerk/backend";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function checkAuth() {
  const headersList = await headers();
  const auth = headersList.get("Authorization");
  const authToken = auth?.split(" ")[1];

  if (!authToken) {
    return false;
  }

  try {
    const { sub, role } = await verifyToken(authToken, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });

    return { userClerkId: sub, role };
  } catch (e) {
    console.error(e);
    return false;
  }
}

export const POST = async () => {
  await connectDB();
  const result = await checkAuth();

  if (!result) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { userClerkId, role } = result;

  let user = await User.findOne({});
};
