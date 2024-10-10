"use client";
import React from "react";
import useTopicStore from "@/store/topicStore";
import PublishCard from "./PublishCard";
import { Button } from "@/components/ui/button";

const PublishPage = () => {
  const { defaultTopicData } = useTopicStore();

  return (
    <>
      <div className="flex flex-col w-full h-full">
        <div className="my-4 border-dashed">
          <Button variant={"outline"} className="w-full">
            Create New Topic
          </Button>
        </div>
        <div className="flex flex-wrap gap-10 w-full justify-stretch">
          {defaultTopicData &&
            defaultTopicData.map((topic, index) => (
              <PublishCard
                key={index}
                topicName={topic.topicName}
                topicType={topic.topicType}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default PublishPage;
