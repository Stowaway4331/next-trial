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
    { icon: <RevenueIcon />, bgcolor: "#E4F3E7", prefix: "$" },
    {
      icon: <TransactionIcon fillColor="black" />,
      bgcolor: "#FBF0DD",
      prefix: "",
    },
    { icon: <LikeIcon />, bgcolor: "#FBE3E3", prefix: "" },
    { icon: <UsersIcon />, bgcolor: "#E3E5FB", prefix: "" },
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

    if (session?.user) {
      getStats();
    } else {
      setStats([
        {
          id: 1,
          name: "revenues",
          data: "--",
        },
        {
          id: 2,
          name: "transactions",
          data: "--",
        },
        {
          id: 3,
          name: "likes",
          data: "--",
        },
        {
          id: 4,
          name: "users",
          data: "--",
        },
      ]);
    }
  }, [session]);

  return (
    <div className="mb-8 grid md:grid-cols-4 grid-cols-2 gap-4 md:gap-6">
      {stats.map((card, index) => {
        return (
          <div
            className="p-5 rounded-card shadow-soft-sm hover:shadow-soft hover:-translate-y-0.5 transition-all grid"
            style={{ backgroundColor: `${cards[index].bgcolor}` }}
            key={index}
          >
            <div className="place-self-end bg-white/50 p-2 rounded-full">
              {cards[index].icon}
            </div>
            <p className="capitalize text-sm text-ink/70 mt-3">
              total{" " + card.name}
            </p>
            <h2 className={`${montserrat.className} text-xl mt-0.5`}>
              {(session?.user &&
                cards[index].prefix + card.data.toLocaleString()) ||
                card.data}
            </h2>
          </div>
        );
      })}
    </div>
  );
};

export default Total;
