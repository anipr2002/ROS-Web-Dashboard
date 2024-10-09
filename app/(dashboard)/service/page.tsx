"use client";
import React from "react";
import useRosStore from "@/store/rosStore";
import useServiceStore from "@/store/serviceStore";
import { getAllServices } from "@/roslib/service";

const Page = () => {
  const { ros, isConnected } = useRosStore();

  const { defaultServiceList, setDefaultServiceList } = useServiceStore();

  React.useEffect(() => {
    if (ros) {
      ros.getServices((services: string[]) => {
        setDefaultServiceList(services);
      });
    }
  }, [ros, isConnected]);

  console.log(defaultServiceList);

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">ROS Service</h1>
      </div>
    </>
  );
};

export default Page;
