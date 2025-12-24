import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  // энд MongoDB / Prisma / Mongoose save хийнэ
  console.log("/interest-club path ruu irj bgaa zuil", body);

  return NextResponse.json({ success: true });
}
