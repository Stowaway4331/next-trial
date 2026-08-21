"use client";

import { useState, useEffect } from "react";

import { Tooltip, PieChart, Pie, Cell } from "recharts";

import { montserrat } from "../../utils/fonts";
import { Dropdown } from "../../utils/icons";

const Products = () => {
  const year = new Date().getFullYear();

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    // index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#0005"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const [monthlyProducts, setMonthlyProducts] = useState([[]]);

  const RADIAN = Math.PI / 180;
  const COLORS = ["#F08787", "#F7CE68", "#7FD696"];
  const months = ["january", "february", "march"];

  const [monthIndex, setMonthIndex] = useState(0);
  // const [currentMonth, setCurrentMonth] = useState("january");

  useEffect(() => {
    async function getProducts() {
      const res = await fetch(
        "https://my-json-server.typicode.com/stowaway4331/next-trial-db/products"
      );
      const data = await res.json();
      // console.log(data);
      setMonthlyProducts(data);
    }
    getProducts();
  }, []);

  return (
    <div className="@container bg-surface p-6 md:p-8 rounded-card shadow-soft-sm">
      <div className="flex flex-col items-center @sm:block">
        <div className="@sm:flex @sm:justify-between">
          <h3 className={`${montserrat.className} text-xl`}>Top Products</h3>
          <div className="text-ink-muted">
            <span
              className="flex items-center hover:cursor-pointer text-sm"
              onClick={() => {
                let ele = document.getElementById("pie-dropdown");
                // console.log(typeof ele.style.height);
                if (ele.style.height === "0px" || ele.style.height === "")
                  ele.style.height = "auto";
                else ele.style.height = "0px";
              }}
            >
              <span id="pie-selected" className="capitalize">
                {months[monthIndex]}
              </span>
              &nbsp;
              {year}&nbsp;&nbsp;
              <Dropdown fillColor="#9CA3AF" />
            </span>
            <ul
              id="pie-dropdown"
              className="absolute h-0 z-10 bg-surface shadow-soft overflow-hidden rounded-xl mt-1"
            >
              {months.map((month, index) => {
                return (
                  <li
                    // id={month}
                    key={index}
                    className="px-3 py-2 hover:bg-accent-soft hover:cursor-pointer capitalize text-sm border-b border-line last:border-b-0"
                    onClick={() => {
                      setMonthIndex(index);
                      // setCurrentMonth(month);
                      document.getElementById("pie-selected").innerHTML = month;
                      document.getElementById("pie-dropdown").style.height =
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
        {/* </div> */}
        <div className="flex items-center justify-around">
          <div className="">
            {/* <ResponsiveContainer width={163} height={200}> */}
            <PieChart
              width={163}
              height={200}
              margin={{
                top: 0,
                left: -20,
              }}
            >
              <Pie
                data={monthlyProducts[monthIndex]}
                cx={100}
                cy={100}
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                legendType="circle"
              >
                {monthlyProducts[monthIndex].map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
            {/* </ResponsiveContainer> */}
          </div>
          <div className="hidden @sm:block">
            <ul className="flex flex-col gap-3">
              {monthlyProducts[monthIndex].map((product, index) => {
                return (
                  <li
                    key={index}
                    className="flex items-center justify-between gap-8"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      ></div>
                      <h5 className={`${montserrat.className} text-sm`}>
                        {product.name}
                      </h5>
                    </div>
                    <span className="text-ink-muted text-sm">
                      {product.value}%
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
