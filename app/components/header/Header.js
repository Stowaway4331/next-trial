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
    <div className="flex items-center mb-12 mt-4">
      <h2 className={`${montserrat.className} text-2xl`}>Dashboard</h2>
      <div className="ml-auto flex items-center gap-8">
        <div className="md:bg-white flex md:block px-3 py-1 rounded-full">
          <input
            className="hidden md:inline-block focus:outline-none pr-2"
            type="text"
            // name="search"
            placeholder="Search..."
          />
          <button type="submit">
            <SearchIcon />
          </button>
        </div>
        <NotificationIcon />
        <div className="">
          <Image
            id="profile-pic"
            src="/256x256.jpg"
            alt="profile-pic"
            width={28}
            height={28}
            // onMouseEnter={handleToggle}
            // onMouseEnter={() => {
            //   document.getElementById("profile-info").style.display = "block";
            // }}
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
            className="rounded-full hover:cursor-pointer"
          />
          <div
            className="z-20 hidden rtl rounded-lg absolute right-6 top-20 overflow-hidden shadow-md box-shadow-0,0,0.5em,black/20"
            id="profile-info"
            // onMouseLeave={handleToggle}
            // onMouseLeave={() => {
            //   document.getElementById("profile-info").style.display = "none";
            // }}
          >
            <div className="ltr bg-white p-6 flex flex-col gap-6">
              {session?.user && (
                <p>
                  <Link href="#">Edit profile</Link>
                </p>
              )}
              <p>
                Subscription date{" "}
                <span className="block text-black/40">
                  {session?.user ? `01/01/2023` : `--`}
                </span>
              </p>
              <p>
                Duration{" "}
                <span className="block text-black/40">
                  {session?.user ? `6 months` : `--`}
                </span>
              </p>
              <p>
                Subscription status{" "}
                <span className="block text-black/40">
                  {session?.user ? `Active` : `--`}
                </span>
              </p>
              {session?.user.email && (
                <p className="text-black/40">{session?.user.email}</p>
              )}
              {(session?.user.email && (
                <button
                  onClick={() => {
                    setDisabled(true);
                    signOut({ callbackUrl: "/login" });
                  }}
                  className={`${
                    disabled ? `bg-black/60` : `bg-black`
                  } w-max py-2 px-4 rounded-md text-white`}
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
                    disabled ? `bg-black/60` : `bg-black`
                  } w-max py-2 px-4 rounded-md text-white`}
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
