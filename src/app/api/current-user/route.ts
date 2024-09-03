import { connectMongoDB } from "@/config/dbConfig";
import UserModel from "@/models/user-model";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

connectMongoDB();

export async function GET(request: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) throw new Error("Unauthorized request");

    const userInMongoDB = await UserModel.findOne({ clerkUserID: userId });
    return NextResponse.json({ user: userInMongoDB }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
