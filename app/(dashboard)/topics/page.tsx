"use client";
import React, { useEffect, useState } from "react";
import useRosStore from "@/store/rosStore";
import TopicPage from "./_components/TopicPage";

import useTopicStore from "@/store/topicStore";

const Topics = () => {
  const { ros, isConnected } = useRosStore();

  const { defaultTopicData, setDefaultTopicData } = useTopicStore();

  const ignoreTopics = ["/rosout", "/parameter_events"];

  useEffect(() => {
    if (ros) {
      ros.getTopics((result: { topics: string[]; types: string[] }) => {
        setDefaultTopicData(result);
      });
    }

    if (!isConnected) {
      setDefaultTopicData(null);
    }
  }, [ros, isConnected]);

  return (
    <>
      <TopicPage topicsData={defaultTopicData} />;
    </>
  );
};

export default Topics;
