"use client";

import { useState, useEffect } from "react";

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

    getActivity();
  }, []);

  const maxY = 600;

  return (
    <div className="bg-white p-8 rounded-2xl mb-12">
      <div className="flex mb-4">
        <div className="">
          <h3 className={`${montserrat.className} text-xl`}>Activities</h3>
          <div className="text-black/60">
            <span
              className="flex items-center hover:cursor-pointer"
              onClick={() => {
                let ele = document.getElementById("line-dropdown");
                console.log(ele.style.height);
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
              <Dropdown fillColor="#00000050" />
            </span>
            <ul
              id="line-dropdown"
              className="absolute h-0 z-10 bg-white shadow-md overflow-hidden"
            >
              {months.map((month, index) => {
                return (
                  <li
                    id={month}
                    key={index}
                    className="pr-2 hover:bg-black/10 hover:cursor-pointer capitalize border-b-2 border-bottom-black/60"
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
        <div className="ml-auto">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#9BDD7C] rounded-full"></div>
            <span className="">User</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#E9A0A0] rounded-full"></div>
            <span className="">Guest</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="99%" height={300}>
        <LineChart
          width={600}
          height={300}
          data={data[monthIndex]}
          margin={{
            // top: 50,
            // right: 20,
            left: -20,
          }}
        >
          <CartesianGrid vertical={false} />
          <Tooltip />
          <XAxis axisLine={false} dataKey="name" tickSize={0} tickMargin={10} />
          <YAxis
            axisLine={false}
            domain={[0, maxY]}
            tickCount={maxY / 100 + 1}
            tickSize={0}
            tickMargin={10}
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
