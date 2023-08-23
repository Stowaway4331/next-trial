"use client";

import { useEffect } from "react";

import {
  DashboardIcon,
  TransactionIcon,
  ScheduleIcon,
  UserIcon,
  SettingsIcon,
} from "../../utils/icons";
import { montserrat } from "../../utils/fonts";

const SideBar = () => {
  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (!document.getElementById("sidebar").contains(e.target)) {
        document.getElementById("sidebar").style.left = "-15rem";
      }
    });

    let startX = 0;
    let startY = 0;

    window.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    });

    window.addEventListener("touchend", (e) => {
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;

      const deltaX = endX - startX;
      const deltaY = endY - startY;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 90) {
          document.getElementById("sidebar").style.left = "2rem";
          // console.log("Swiped right", deltaX);
        } else if (deltaX < -90) {
          document.getElementById("sidebar").style.left = "-15rem";
          // console.log("Swiped left", deltaX);
        }
      } else {
        // if (deltaY > 90) {
        //   console.log("Swiped down", deltaY);
        // } else if (deltaY < -90) {
        //   console.log("Swiped up", deltaY);
        // }
      }
    });
  }, []);

  return (
    // TODO: create toggle icon for showing and hiding dashboard menu
    <section
      id="sidebar"
      onClick={() => {
        document.getElementById("sidebar").style.left = "2rem";
        // console.log(document.getElementById("sidebar").style.left);
      }}
      className=" bg-black text-white rounded-3xl min-w-[16rem] h-[calc(100%-4rem)] fixed -left-[15rem] z-10 overflow-y-auto transition-all lg:static lg:left-0 lg:h-auto "
    >
      <div className="relative p-12 flex flex-col h-full ">
        {/* <div className=" absolute z-40 bg-red-500 w-4 h-8 -right-2 "></div> */}
        <h1 className={`${montserrat.className} text-3xl font-bold mb-12`}>
          Board.
        </h1>
        <ul className="">
          <li className="flex gap-8 mb-8 ">
            <span className="">
              <DashboardIcon />
            </span>
            Dashboard
          </li>
          <li className="flex gap-8 mb-8 ">
            <span className="">
              <TransactionIcon />
            </span>
            Transactions
          </li>
          <li className="flex gap-8 mb-8 ">
            <span className="">
              <ScheduleIcon />
            </span>
            Schedules
          </li>
          <li className="flex gap-8 mb-8 ">
            <span className="">
              <UserIcon />
            </span>
            Users
          </li>
          <li className="flex gap-8 mb-8 ">
            <span className="">
              <SettingsIcon />
            </span>
            Settings
          </li>
        </ul>
        <ul className="mt-auto">
          <li className="mt-4 text-white/80 hover:text-white hover:cursor-pointer">
            Help
          </li>
          <li className="mt-4 text-white/80 hover:text-white hover:cursor-pointer">
            Contact us
          </li>
        </ul>
      </div>
    </section>
  );
};

export default SideBar;
