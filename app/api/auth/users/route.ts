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
  // console.log("reached Post");
  // console.log(typeof req);

  const body = (await req.json()) as NewUserRequest;
  // console.log("made const body");

  await connectDB();
  // console.log("connected to db");

  const oldUser = await UserModel.findOne({ email: body.email });
  // console.log("old user: ", oldUser);

  if (oldUser) {
    return NextResponse.json(
      { error: "Email is already in use" },
      { status: 422 }
    );
  }

  const user = await UserModel.create({ ...body });

  // console.log("reached end of Post");

  return NextResponse.json({
    user: {
      id: user._id.toString(),
      email: user.email,
    },
  });
};
