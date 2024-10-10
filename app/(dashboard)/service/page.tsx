"use client";
import React from "react";
import ServicePage from "./ServicePage";

const Page = () => {
  return (
    <>
      <div className="w-full h-full flex flex-col">
        <div className="flex w-full justify-between items-center border-b-2 py-2">
          <h1 className="text-2xl font-bold">ROS Service</h1>
        </div>

        <ServicePage />
      </div>
    </>
  );
};

export default Page;
