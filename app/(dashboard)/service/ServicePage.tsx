"use client";
import React from "react";
import useServiceStore from "@/store/serviceStore";
import ServiceCard from "./ServiceCard";
const ServicePage = () => {
  const { defaultServiceList } = useServiceStore();
  console.log(defaultServiceList);
  return (
    <>
      <div className="w-full h-full flex flex-col">
        <div className="flex flex-wrap gap-10 w-full justify-stretch my-5">
          {defaultServiceList &&
            defaultServiceList.map((service, index) => (
              <ServiceCard
                key={index.toString()}
                serviceName={service.serviceName}
                serviceType={service.serviceType}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default ServicePage;
