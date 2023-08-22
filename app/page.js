import { options } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(options);

  session ? redirect("/dashboard") : redirect("/login");

  return <p className="mt-8 text-center">Redirecting...</p>;
}
