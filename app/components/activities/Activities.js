"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { montserrat } from "../../utils/fonts";
import { Dropdown } from "../../utils/icons";

const Activities = () => {
  const { data: session } = useSession();

  const year = new Date().getFullYear();
  const [data, setData] = useState([[]]);
  const months = ["january", "february", "march"];

  const [monthIndex, setMonthIndex] = useState(0);
  const [currentMonth, setCurrentMonth] = useState("january");

  useEffect(() => {
    async function getActivity() {
      const res = await fetch(
        "https://my-json-server.typicode.com/stowaway4331/next-trial-db/activity"
      );
      const data = await res.json();
      setData(data);
      // console.log(data);
    }

    if (session?.user) {
      getActivity();
    }
  }, [session]);

  const maxY = 600;

  return (
    <div className="bg-surface p-6 md:p-8 rounded-card shadow-soft-sm mb-8">
      <div className="flex mb-6">
        <div className="">
          <h3 className={`${montserrat.className} text-xl`}>Activities</h3>
          <div className="text-ink-muted">
            <span
              className="flex items-center hover:cursor-pointer text-sm"
              onClick={() => {
                let ele = document.getElementById("line-dropdown");
                // console.log(ele.style.height);
                if (ele.style.height === "0px" || ele.style.height === "")
                  ele.style.height = "auto";
                else ele.style.height = "0px";
              }}
            >
              <span id="line-selected" className="capitalize">
                {currentMonth}
              </span>
              &nbsp;
              {year}&nbsp;&nbsp;
              <Dropdown fillColor="#9CA3AF" />
            </span>
            <ul
              id="line-dropdown"
              className="absolute h-0 z-10 bg-surface shadow-soft rounded-xl overflow-hidden mt-1"
            >
              {months.map((month, index) => {
                return (
                  <li
                    id={month}
                    key={index}
                    className="px-3 py-2 hover:bg-accent-soft hover:cursor-pointer capitalize text-sm border-b border-line last:border-b-0"
                    onClick={() => {
                      setMonthIndex(index);
                      setCurrentMonth(month);
                      document.getElementById("line-selected").innerHTML =
                        month;
                      document.getElementById("line-dropdown").style.height =
                        "0px";
                    }}
                  >
                    {month + " " + year}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="ml-auto text-sm">
          <div className="flex items-center justify-end gap-2">
            <div className="w-2.5 h-2.5 bg-[#9BDD7C] rounded-full"></div>
            <span className="text-ink-muted">User</span>
          </div>
          <div className="flex items-center justify-end gap-2 mt-1.5">
            <div className="w-2.5 h-2.5 bg-[#E9A0A0] rounded-full"></div>
            <span className="text-ink-muted">Guest</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="99%" height={300}>
        <LineChart
          width={600}
          height={300}
          data={session?.user ? data[monthIndex] : []}
          margin={{
            // top: 50,
            // right: 20,
            left: -20,
          }}
        >
          <CartesianGrid vertical={false} stroke="#EEEFF5" />
          <Tooltip
            contentStyle={{
              borderRadius: "0.75rem",
              border: "1px solid #E9EAF2",
              boxShadow: "0 8px 24px -8px rgba(20,22,31,0.16)",
            }}
          />
          <XAxis
            axisLine={false}
            dataKey="name"
            tickSize={0}
            tickMargin={10}
            tick={{ fill: "#9CA3AF", fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            domain={[0, maxY]}
            tickCount={maxY / 100 + 1}
            tickSize={0}
            tickMargin={10}
            tick={{ fill: "#9CA3AF", fontSize: 12 }}
          />
          <Line
            type="monotone"
            dataKey="user"
            strokeWidth={2}
            stroke="#9BDD7C"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="guest"
            strokeWidth={2}
            stroke="#E9A0A0"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Activities;
