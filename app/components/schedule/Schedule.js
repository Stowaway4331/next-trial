"use client";

import { useState, useEffect, useCallback } from "react";

import { montserrat } from "../../utils/fonts";

const Schedule = () => {
  const COLORS = ["#EE8484", "#F6DC7D", "#98D89E"];

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
    <div className="p-8 pb-4 bg-white rounded-xl w-full">
      <div className="flex justify-between mb-4">
        <h3 className={`${montserrat.className} text-xl`}>
          Today&apos;s schedule
        </h3>
        <span
          className="text-black/60 hover:text-black hover:cursor-pointer"
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
      <ul className="h-60 overflow-y-auto">
        {schedules.map((data, index) => {
          return (
            <li
              className="p-4 mb-4 bg-[#f5f5f5] border-l-4 text-black text-opacity-60 last:mb-0"
              key={index}
              style={{ borderColor: COLORS[index % COLORS.length] }}
            >
              <h4 className={`${montserrat.className}`}>{data.subject}</h4>
              <p>{data.time}</p>
              <p>{data.location}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Schedule;
