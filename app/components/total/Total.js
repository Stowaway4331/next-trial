"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import {
  RevenueIcon,
  TransactionIcon,
  LikeIcon,
  UsersIcon,
} from "../../utils/icons";
import { montserrat } from "../../utils/fonts";

const Total = () => {
  const { data: session } = useSession();

  const cards = [
    { icon: <RevenueIcon />, bgcolor: "#DDEFE0", prefix: "$" },
    {
      icon: <TransactionIcon fillColor="black" />,
      bgcolor: "#F4ECDD",
      prefix: "",
    },
    { icon: <LikeIcon />, bgcolor: "#EFDADA", prefix: "" },
    { icon: <UsersIcon />, bgcolor: "#DEE0EF", prefix: "" },
  ];

  const [stats, setStats] = useState([]);

  useEffect(() => {
    async function getStats() {
      const res = await fetch(
        "https://my-json-server.typicode.com/stowaway4331/next-trial-db/stats"
      );
      const data = await res.json();
      setStats(data);
    }

    getStats();
  }, []);

  return (
    <div className="mb-12 grid md:grid-cols-4 grid-cols-2 gap-8 ">
      {stats.map((card, index) => {
        return (
          <div
            className="p-4 rounded-xl grid "
            style={{ backgroundColor: `${cards[index].bgcolor}` }}
            key={index}
          >
            <div className="place-self-end">{cards[index].icon}</div>
            <p className="capitalize">total{" " + card.name}</p>
            <h2 className={`${montserrat.className} text-xl`}>
              {(session?.user &&
                cards[index].prefix + card.data.toLocaleString()) ||
                "--"}
            </h2>
          </div>
        );
      })}
    </div>
  );
};

export default Total;
