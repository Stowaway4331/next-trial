"use client";

import { useState, useEffect, useCallback } from "react";

import { montserrat } from "../../utils/fonts";

const Schedule = () => {
  const COLORS = ["#F08787", "#F7CE68", "#7FD696"];

  const [data, setData] = useState([]);

  const [schedules, setSchedules] = useState([
    {
      subject: "Loading...",
      time: "",
      location: "",
    },
  ]);

  const getSchedules = useCallback(async function () {
    // console.log("Executed");
    const res = await fetch(
      "https://my-json-server.typicode.com/stowaway4331/next-trial-db/schedules"
    );
    // const data = limit ? res?.data.slice(0, 2) : res?.data;
    const data = await res.json();
    setData(data);
    // console.log(data);
    if (
      (typeof data == "object" && Object.keys(data).length === 0) ||
      data.length == 0
    ) {
      setSchedules([
        {
          subject: "No new notifications",
          time: "",
          location: "",
        },
      ]);
    } else {
      setSchedules(data?.slice(0, 2));
    }
  }, []);

  useEffect(() => {
    getSchedules();
  }, []);

  const [toggle, setToggle] = useState(true);

  return (
    <div className="p-6 md:p-8 pb-4 bg-surface rounded-card shadow-soft-sm w-full">
      <div className="flex justify-between mb-4">
        <h3 className={`${montserrat.className} text-xl`}>
          Today&apos;s schedule
        </h3>
        <span
          className="text-ink-muted hover:text-accent hover:cursor-pointer text-sm transition-colors"
          onClick={(e) => {
            if (!toggle) {
              // getSchedules(toggle);
              setSchedules((schedules) => schedules.slice(0, 2));
              e.target.innerText = "See All >";
              // e.target.parentElement.nextElementSibling.style.overflow = "hidden";
            } else {
              setSchedules(data);
              e.target.innerText = "Close";
              // e.target.parentElement.nextElementSibling.style.overflow = "auto";
            }
            setToggle(!toggle);
          }}
        >
          See All &gt;
        </span>
      </div>
      <ul className="h-60 overflow-y-auto flex flex-col gap-3 pb-4">
        {schedules.map((data, index) => {
          return (
            <li
              className="p-4 rounded-xl bg-bg border-l-4 text-ink/70"
              key={index}
              style={{ borderColor: COLORS[index % COLORS.length] }}
            >
              <h4 className={`${montserrat.className} text-ink text-sm`}>
                {data.subject}
              </h4>
              <p className="text-sm mt-0.5">{data.time}</p>
              <p className="text-sm">{data.location}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Schedule;
