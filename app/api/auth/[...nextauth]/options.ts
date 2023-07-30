import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "../../../lib/mongodb";
import UserModel from "../../../models/users";

export const options: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email address: ",
          type: "email",
          placeholder: "johndoe@example.com",
        },
        password: {
          label: "Password: ",
          type: "password",
          placeholder: "Min 8 characters",
        },
      },
      async authorize(credentials, req) {
        // console.log(credentials);

        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        // console.log(email, password);

        await connectDB();

        const user = await UserModel.findOne({ email });
        if (!user) return null;

        const passwordMatch = await user.comparePassword(password);
        if (!passwordMatch) return null;

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    // error: '/login?error=invalid_credentials',
  },
};
