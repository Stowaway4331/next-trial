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
  const COLORS = ["#EE8484", "#F6DC7D", "#98D89E"];
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
    <div className="@container bg-white p-8 rounded-2xl">
      <div className="flex flex-col items-center @sm:block">
        <div className="@sm:flex @sm:justify-around">
          <h3 className={`${montserrat.className} text-xl`}>Top Products</h3>
          <div className="text-black/60">
            <span
              className="flex items-center hover:cursor-pointer"
              onClick={() => {
                let ele = document.getElementById("pie-dropdown");
                console.log(typeof ele.style.height);
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
              <Dropdown fillColor="#00000050" />
            </span>
            <ul
              id="pie-dropdown"
              className="absolute h-0 z-10 bg-white shadow-md overflow-hidden rounded-md"
            >
              {months.map((month, index) => {
                return (
                  <li
                    // id={month}
                    key={index}
                    className="pr-2 hover:bg-black/10 hover:cursor-pointer capitalize border-b-2 border-bottom-black/60"
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
            <ul>
              {monthlyProducts[monthIndex].map((product, index) => {
                return (
                  <li key={index} className="">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      ></div>
                      <h5 className={`${montserrat.className}`}>
                        {product.name}
                      </h5>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full"></div>
                      <span className="text-black/50">{product.value}%</span>
                    </div>
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
