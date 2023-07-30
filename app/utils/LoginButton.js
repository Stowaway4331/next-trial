"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

export const LoginButton = () => {
  const { data: session } = useSession();
  const [disabled, setDisabled] = useState(false);

  console.log(session);

  return session?.user ? (
    <p className="text-center">
      You are logged in as&nbsp;
      <code>{"@" + session?.user.email.split("@")[0]}</code>
      <button
        disabled={disabled}
        className={` ${
          disabled ? "bg-gray-500" : "bg-blue-500"
        } text-white p-2 rounded-md ml-2`}
        onClick={() => {
          setDisabled(true);
          signOut();
        }}
      >
        Sign Out
      </button>
    </p>
  ) : (
    <button
      onClick={() => {
        setDisabled(true);
        signIn();
      }}
      className={`${
        disabled ? "bg-gray-500" : "bg-blue-500"
      } text-white p-2 rounded-md ml-2`}
    >
      Sign In
    </button>
  );
};
