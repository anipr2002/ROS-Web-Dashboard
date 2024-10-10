"use client";
import React, { useEffect, useState } from "react";
import useRosStore from "@/store/rosStore";
import { getTopicsFromRos } from "@/roslib/topic";
import useTopicStore, { ITopic } from "@/store/topicStore";
import SubscribePage from "./SubscribePage";

const Topics = () => {
  return (
    <>
      <SubscribePage />
    </>
  );
};

export default Topics;
