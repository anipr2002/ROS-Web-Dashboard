"use client";

import { useState, useEffect } from "react";
import { getTopic } from "@/roslib/topic";
import useTopicStore from "@/store/topicStore";
import useRosStore from "@/store/rosStore";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Zap, AlertCircle, Maximize2 } from "lucide-react";

interface TopicCardProps {
  topicName: string;
  topicType: string;
}

export default function TopicCard({ topicName, topicType }: TopicCardProps) {
  const [lastMessage, setLastMessage] = useState("Waiting for message...");
  const { ros, isConnected } = useRosStore();
  const { setSelectedTopicType, selectedTopicType, setViewType, viewType } =
    useTopicStore();

  useEffect(() => {
    if (ros) {
      const topic = getTopic({
        ros,
        topicName,
        topicType,
        throtle_rate: 10,
      });
      topic.subscribe((message) => {
        if (typeof message === "string") {
          setLastMessage(message);
        } else {
          setLastMessage(JSON.stringify(message, null, 2));
        }
      });
      return () => {
        topic.unsubscribe();
      };
    }
  }, [ros, topicName, topicType]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const handleTopicTypeClick = () => {
    if (viewType === "All" || selectedTopicType !== topicType) {
      // Set to topic type if viewType is "All" or a new topic is clicked
      setViewType("TopicType");
      setSelectedTopicType(topicType);
    } else {
      // Reset to "All" if the same topicType badge is clicked again
      setViewType("All");
      setSelectedTopicType(null);
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 shadow-lg rounded-lg p-6 max-w-sm w-full border border-gray-200 dark:border-gray-700"
    >
      <div className="flex flex-col justify-between items-start mb-4 w-full">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center text-wrap max-w-fit">
          {topicName}
        </h2>
        <Badge
          variant="outline"
          className="text-sm cursor-pointer hover:bg-gray-200"
          onClick={handleTopicTypeClick}
        >
          {topicType}
        </Badge>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-md p-4 mb-4 border border-gray-200 dark:border-gray-700">
        <ScrollArea className="h-32 w-full">
          <pre className="text-xs font-mono break-all whitespace-pre-wrap text-gray-700 dark:text-gray-300">
            {lastMessage}
          </pre>
        </ScrollArea>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div
            className={`w-3 h-3 rounded-full mr-2 ${
              isConnected ? "bg-green-500" : "bg-red-500"
            }`}
          ></div>
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
            <Zap className="mr-1 h-4 w-4" />
            {isConnected ? "Connected" : "Disconnected"}
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center">
              <Maximize2 className="mr-2 h-4 w-4" />
              Expand
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <AlertCircle className="mr-2 h-5 w-5 text-blue-500" />
                Message History for {topicName}
              </DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-[400px] w-full rounded-md border p-4">
              <pre className="text-md font-mono break-all whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                {lastMessage}
              </pre>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
    </motion.div>
  );
}
