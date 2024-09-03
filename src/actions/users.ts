"use server";
import UserModel from "@/models/user-model";
import { currentUser } from "@clerk/nextjs/server";

export const handleNewUserRegistration = async () => {
  try {
    const clerkUserDetails = await currentUser();

    // check user if user already exists

    const mongoDbUserPayload = {
      firstName: clerkUserDetails?.firstName + " " + clerkUserDetails?.lastName,
      email: clerkUserDetails?.emailAddresses[0].emailAddress,
      clerkUserID: clerkUserDetails?.id,
      isActive: true,
      isAdmin: false,
    };

    const newUser = new UserModel(mongoDbUserPayload);
    await newUser.save();

    return {
      success: true,
      message: "user saved to mongoDb",
      data: JSON.parse(JSON.stringify(newUser)),
    };
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
      return {
        success: true,
        data: JSON.parse(JSON.stringify(user)),
      };
    }

    const saveUserResponse = await handleNewUserRegistration();
    if (saveUserResponse) {
      return {
        success: true,
        data: saveUserResponse.data,
      };
    }

    return {
      success: false,
      message: "User not found in MongoDB",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
