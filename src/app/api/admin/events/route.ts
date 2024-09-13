import { getCurrentUserFromMongoDb } from "@/actions/users";
import { connectMongoDB } from "@/config/dbConfig";
import EventModel from "@/models/event-model";
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
    await EventModel.create(reqBody);
    return NextResponse.json(
      { message: "Event created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
