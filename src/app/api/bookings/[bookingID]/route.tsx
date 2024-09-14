import { getCurrentUserFromMongoDb } from "@/actions/users";
import { connectMongoDB } from "@/config/dbConfig";
import BookingModel from "@/models/booking-model";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

connectMongoDB();

export async function PUT(
  request: NextRequest,
  { params }: { params: { bookingID: string } }
) {
  try {
    const { userId } = auth();
    if (!userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const reqBody = await request.json();

    await BookingModel.findByIdAndUpdate(params.bookingID, reqBody);

    return NextResponse.json(
      { message: "Booking updated successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { bookingID: string } }
) {
  try {
    const { userId } = auth();
    if (!userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    await BookingModel.findByIdAndDelete(params.bookingID);
    return NextResponse.json(
      { message: "Event deleted successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
