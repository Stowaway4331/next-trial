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

  const navItems = [
    { label: "Dashboard", icon: DashboardIcon, active: true },
    { label: "Transactions", icon: TransactionIcon, active: false },
    { label: "Schedules", icon: ScheduleIcon, active: false },
    { label: "Users", icon: UserIcon, active: false },
    { label: "Settings", icon: SettingsIcon, active: false },
  ];

  return (
    // TODO: create toggle icon for showing and hiding dashboard menu
    <section
      id="sidebar"
      onClick={() => {
        document.getElementById("sidebar").style.left = "2rem";
        // console.log(document.getElementById("sidebar").style.left);
      }}
      className="bg-sidebar text-white rounded-3xl min-w-[16rem] h-[calc(100%-4rem)] fixed -left-[15rem] z-10 overflow-y-auto shadow-soft transition-all lg:static lg:left-0 lg:h-auto"
    >
      <div className="relative p-10 flex flex-col h-full">
        <h1 className={`${montserrat.className} text-2xl font-bold mb-12 tracking-tight`}>
          Board.
        </h1>
        <ul className="flex flex-col gap-1.5">
          {navItems.map(({ label, icon: Icon, active }) => (
            <li
              key={label}
              className={`flex items-center gap-4 px-4 py-3 rounded-2xl cursor-pointer transition-colors ${
                active
                  ? "bg-white/10 text-white"
                  : "text-white/55 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="shrink-0">
                <Icon />
              </span>
              <span className="text-sm font-medium">{label}</span>
            </li>
          ))}
        </ul>
        <ul className="mt-auto pt-8 border-t border-white/10">
          <li className="mt-2 px-4 py-2 text-sm text-white/50 hover:text-white hover:cursor-pointer transition-colors">
            Help
          </li>
          <li className="mt-1 px-4 py-2 text-sm text-white/50 hover:text-white hover:cursor-pointer transition-colors">
            Contact us
          </li>
        </ul>
      </div>
    </section>
  );
};

export default SideBar;
