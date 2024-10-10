"use client";

import useTopicStore from "@/store/topicStore";
import TopicCard from "./SubscribeCard";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

const SubscribePage = () => {
  const { defaultTopicData } = useTopicStore();
  const [selectedTopicTypes, setSelectedTopicTypes] = React.useState<string[]>(
    []
  );
  const [viewType, setViewType] = React.useState<"All" | "TopicType">("All");

  const topicTypeList = defaultTopicData
    ? Array.from(new Set(defaultTopicData.map((topic) => topic.topicType)))
    : [];

  const handleTopicTypeToggle = (topicType: string) => {
    setSelectedTopicTypes((prev) =>
      prev.includes(topicType)
        ? prev.filter((type) => type !== topicType)
        : [...prev, topicType]
    );
    setViewType("TopicType");
  };

  const filteredTopics =
    viewType === "All"
      ? defaultTopicData
      : defaultTopicData?.filter((topic) =>
          selectedTopicTypes.includes(topic.topicType)
        );

  console.log(viewType, selectedTopicTypes);

  return (
    <>
      <div className="w-full h-full flex flex-col">
        <div className="my-4 flex gap-3">
          <Button
            variant={viewType === "All" ? "default" : "outline"}
            onClick={() => {
              setViewType("All");
              setSelectedTopicTypes([]);
            }}
          >
            View All
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={viewType === "TopicType" ? "default" : "outline"}
              >
                View Topic Types
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit">
              <DropdownMenuLabel>Topic Type</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {topicTypeList.map((topicType) => (
                <DropdownMenuCheckboxItem
                  key={topicType}
                  onSelect={() => handleTopicTypeToggle(topicType)}
                  checked={selectedTopicTypes.includes(topicType)}
                >
                  {topicType}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex flex-wrap gap-10 w-full justify-stretch">
          {filteredTopics &&
            filteredTopics.map((topic, index) => (
              <TopicCard
                key={index}
                topicName={topic.topicName}
                topicType={topic.topicType}
                onTypeSelect={() => handleTopicTypeToggle(topic.topicType)}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default SubscribePage;
