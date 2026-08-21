import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../lib/mongodb";
import UserModel from "../../../models/users";

interface NewUserRequest {
  email: string;
  password: string;
}

interface NewUserResponse {
  id: string;
  email: string;
}

type NewResponse = NextResponse<{ user?: NewUserResponse; error?: string }>;

export const POST = async (req: NextRequest): Promise<NewResponse> => {
  let body: NewUserRequest;
  try {
    body = (await req.json()) as NewUserRequest;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  try {
    await connectDB();

    const oldUser = await UserModel.findOne({ email: body.email });

    if (oldUser) {
      return NextResponse.json(
        { error: "Email is already in use" },
        { status: 422 }
      );
    }

    const user = await UserModel.create({ ...body });

    return NextResponse.json({
      user: {
        id: user._id.toString(),
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Failed to create user:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
};
