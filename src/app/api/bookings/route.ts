import { getCurrentUserFromMongoDb } from "@/actions/users";
import { connectMongoDB } from "@/config/dbConfig";
import BookingModel from "@/models/booking-model";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

connectMongoDB();

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const mongoUserId = await getCurrentUserFromMongoDb();
    const reqBody = await request.json();
    reqBody.user = mongoUserId;
    await BookingModel.create(reqBody);
    return NextResponse.json(
      { message: "Event Booked successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
