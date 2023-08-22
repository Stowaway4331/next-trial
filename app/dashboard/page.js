"use client";

import SideBar from "../components/sidebar/SideBar";
import Header from "../components/header/Header";
import Total from "../components/total/Total";
import Activities from "../components/activities/Activities";
import Products from "../components/products/Products";
import Schedule from "../components/schedule/Schedule";

import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session } = useSession();

  return (
    <main className="p-8 md:flex">
      <SideBar />
      <div className="md:ml-8 w-full">
        <Header />
        <Total />
        <Activities />
        {session?.user && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 ">
            <Products />
            <Schedule />
          </div>
        )}
      </div>
    </main>
  );
};

export default Dashboard;
