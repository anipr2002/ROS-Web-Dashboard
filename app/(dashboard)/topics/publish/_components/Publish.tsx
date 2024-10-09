"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useTopicStore from "@/store/topicStore";
import useRosStore from "@/store/rosStore";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { publishTopic, createNewTopic } from "@/roslib/topic";
import * as ROSLIB from "roslib";
import { Send, Plus, Radio, MessageSquare, Loader2 } from "lucide-react";

export default function ROSTopicPublisher() {
  const {
    defaultTopicData,
    setDefaultTopicData,
    selectedTopicType,
    setSelectedTopicType,
    viewType,
    setViewType,
  } = useTopicStore();

  const { isConnected, ros } = useRosStore();

  const [message, setMessage] = useState("");
  const [newTopic, setNewTopic] = useState({ name: "", type: "" });
  const [selectedTopic, setSelectedTopic] = useState<{
    name: string;
    type: string;
  } | null>(null);

  const handlePublish = (topicName: string, topicType: string) => {
    publishTopic({
      ros: ros!,
      topicName,
      topicType,
      message,
      throtle_rate: 10,
    });

    toast.success(`Published to ${topicName} of type ${topicType}`);
    // Reset message and close dialog
    setMessage("");
    setSelectedTopic(null);
  };

  const handleCreateTopic = () => {
    if (newTopic.name && newTopic.type && defaultTopicData) {
      const createdTopic = createNewTopic({
        ros: ros!,
        topicName: newTopic.name,
        topicType: newTopic.type,
      });

      setDefaultTopicData({
        topics: [...defaultTopicData.topics, createdTopic.name],
        types: [...defaultTopicData.types, newTopic.type],
      });

      setNewTopic({ name: "", type: "" });
    }
    toast.success(
      `Topic ${newTopic.name} of type ${newTopic.type} created successfully.`
    );
  };

  const filteredTopics = defaultTopicData
    ? defaultTopicData.topics.filter(
        (_, index) =>
          viewType === "All" ||
          defaultTopicData.types[index] === selectedTopicType
      )
    : [];

  return (
    <>
      {isConnected ? (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">ROS Topic Publisher</h1>

          <div className="mb-4 flex gap-2">
            <Button variant={"outline"} onClick={() => setViewType("All")}>
              View All
            </Button>
            <Button
              variant={"outline"}
              onClick={() => setViewType("TopicType")}
            >
              View by Type
            </Button>
            {viewType === "TopicType" && defaultTopicData && (
              <select
                value={selectedTopicType || ""}
                onChange={(e) => setSelectedTopicType(e.target.value)}
                className="ml-2 p-2 border rounded"
              >
                <option value="">Select Type</option>
                {Array.from(new Set(defaultTopicData.types)).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {filteredTopics.map((topic, index) => (
              <Card key={topic}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    {topic}
                  </CardTitle>
                  <CardDescription>
                    {defaultTopicData?.types[index]}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Dialog
                    open={selectedTopic?.name === topic}
                    onOpenChange={(open) => !open && setSelectedTopic(null)}
                  >
                    <DialogTrigger asChild>
                      <Button
                        className="flex items-center gap-2 w-full"
                        onClick={() =>
                          setSelectedTopic({
                            name: topic,
                            type: defaultTopicData!.types[index],
                          })
                        }
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Publish
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Publish to {topic}</DialogTitle>
                        <DialogDescription>
                          Enter the message to publish to this topic.
                        </DialogDescription>
                      </DialogHeader>
                      <Textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Enter your message here"
                      />
                      <DialogFooter>
                        <Button
                          onClick={() =>
                            selectedTopic &&
                            handlePublish(
                              selectedTopic.name,
                              selectedTopic.type
                            )
                          }
                        >
                          Publish
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Create New Topic</CardTitle>
              <CardDescription>
                Add a new topic to publish messages to.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="topicName">Topic Name</Label>
                  <Input
                    id="topicName"
                    placeholder="Enter topic name"
                    value={newTopic.name}
                    onChange={(e) =>
                      setNewTopic({ ...newTopic, name: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="topicType">Topic Type</Label>
                  <Input
                    id="topicType"
                    placeholder="Enter topic type"
                    value={newTopic.type}
                    onChange={(e) =>
                      setNewTopic({ ...newTopic, type: e.target.value })
                    }
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="flex items-center gap-2"
                onClick={handleCreateTopic}
              >
                <Plus className="w-4 h-4 " />
                Create Topic
              </Button>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <div className="container flex flex-col gap-4 p-4">
          <div className="flex gap-4">
            {[...Array(5)].map((_, index) => (
              <Skeleton
                key={index}
                className="w-[400px] h-[300px] shadow-md rounded-lg p-4 "
              />
            ))}
          </div>
          <Skeleton className="w-full h-96" />
        </div>
      )}
    </>
  );
}
