"use server";
import { connectMongoDB } from "@/config/dbConfig";
import UserModel from "@/models/user-model";
import { currentUser } from "@clerk/nextjs/server";

connectMongoDB();

export const handleNewUserRegistration = async () => {
  try {
    const clerkUserDetails = await currentUser();

    // check user if user already exists

    const userExists = await UserModel.findOne({
      clerkUserID: clerkUserDetails?.id,
    });
    if (userExists) return userExists;

    const newUser = new UserModel({
      userName:
        clerkUserDetails?.username ||
        `${clerkUserDetails?.firstName} ${clerkUserDetails?.lastName} `,
      email: clerkUserDetails?.emailAddresses[0]?.emailAddress,
      clerkUserID: clerkUserDetails?.id,
      isActive: true,
      isAdmin: false,
    });

    await newUser.save();

    return newUser;
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getCurrentUserFromMongoDb = async () => {
  try {
    const clerkUserDetails = await currentUser();

    const user = await UserModel.findOne({ clerkUserID: clerkUserDetails?.id });

    if (user) {
      return user._id;
    }
  } catch (error: any) {
    throw new Error(error);
  }
};
