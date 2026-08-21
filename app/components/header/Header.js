"use client";

import { useEffect, useState } from "react";

import { SearchIcon, NotificationIcon } from "../../utils/icons";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut, signIn } from "next-auth/react";

import { montserrat } from "../../utils/fonts";

const Header = () => {
  const { data: session } = useSession();
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (
        document.getElementById("profile-info").style.display === "block" &&
        !document.getElementById("profile-info").contains(e.target) &&
        !(e.target == document.getElementById("profile-pic"))
      ) {
        // console.log("big bruh");
        document.getElementById("profile-info").style.display = "none";
      }
    });
  });

  return (
    <div className="flex items-center mb-8 mt-2">
      <h2 className={`${montserrat.className} text-2xl`}>Dashboard</h2>
      <div className="ml-auto flex items-center gap-4 md:gap-6">
        <div className="md:bg-surface md:shadow-soft-sm flex md:block px-4 py-2.5 rounded-full">
          <input
            className="hidden md:inline-block bg-transparent focus:outline-none pr-2 text-sm placeholder:text-ink-faint"
            type="text"
            // name="search"
            placeholder="Search..."
          />
          <button
            type="submit"
            className="bg-surface shadow-soft-sm p-2 rounded-full md:bg-transparent md:shadow-none md:p-0"
          >
            <SearchIcon />
          </button>
        </div>
        <button className="bg-surface shadow-soft-sm p-2.5 rounded-full hover:shadow-soft transition-shadow">
          <NotificationIcon />
        </button>
        <div className="relative">
          <Image
            id="profile-pic"
            src="/256x256.jpg"
            alt="profile-pic"
            width={36}
            height={36}
            onClick={() => {
              let ele = document.getElementById("profile-info");
              // console.log(ele.style.display);
              if (ele.style.display == "block") {
                // console.log("bruh");
                ele.style.display = "none";
              } else {
                // console.log("no bruh");
                ele.style.display = "block";
              }
            }}
            className="rounded-full ring-2 ring-surface shadow-soft-sm hover:cursor-pointer"
          />
          <div
            className="z-20 hidden rtl rounded-2xl absolute right-0 top-14 overflow-hidden shadow-soft w-64"
            id="profile-info"
          >
            <div className="ltr bg-surface p-6 flex flex-col gap-4">
              {session?.user && (
                <p>
                  <Link href="#">Edit profile</Link>
                </p>
              )}
              <p className="text-sm">
                Subscription date{" "}
                <span className="block text-ink-muted">
                  {session?.user ? `01/01/2023` : `--`}
                </span>
              </p>
              <p className="text-sm">
                Duration{" "}
                <span className="block text-ink-muted">
                  {session?.user ? `6 months` : `--`}
                </span>
              </p>
              <p className="text-sm">
                Subscription status{" "}
                <span className="block text-ink-muted">
                  {session?.user ? `Active` : `--`}
                </span>
              </p>
              {session?.user.email && (
                <p className="text-ink-muted text-sm truncate">{session?.user.email}</p>
              )}
              {(session?.user.email && (
                <button
                  onClick={() => {
                    setDisabled(true);
                    signOut({ callbackUrl: "/login" });
                  }}
                  className={`${
                    disabled ? `bg-ink-faint` : `bg-accent hover:bg-accent-dark`
                  } w-max py-2 px-4 rounded-xl text-white text-sm transition-colors`}
                >
                  Sign Out
                </button>
              )) || (
                <button
                  onClick={() => {
                    setDisabled(true);
                    signIn();
                  }}
                  className={`${
                    disabled ? `bg-ink-faint` : `bg-accent hover:bg-accent-dark`
                  } w-max py-2 px-4 rounded-xl text-white text-sm transition-colors`}
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
