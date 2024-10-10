"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Cog, Wrench, Maximize2, AlertCircle, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ServiceCard({
  serviceName,
  serviceType,
  isAvailable = true,
}: {
  serviceName: string;
  serviceType: string;
  isAvailable?: boolean;
}) {
  const [request, setRequest] = useState("");
  const [params, setParams] = useState({});

  const handleCall = () => {
    // Simulating a service call
    const newCall = {
      timestamp: new Date().toISOString(),
      request,
      params,
      response: "Service response would appear here",
    };
    setRequest("");
    setParams({});
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="bg-gray-100 dark:from-blue-900 dark:to-indigo-950 shadow-lg rounded-lg p-6 max-w-sm w-full border border-blue-200 dark:border-blue-800"
    >
      <div className="flex flex-col justify-between items-start mb-4 w-full">
        <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 flex items-center text-wrap max-w-fit">
          <Cog className="mr-2 h-6 w-6" />
          {serviceName}
        </h2>
        <Badge
          variant="outline"
          className="text-sm cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-800"
        >
          {serviceType}
        </Badge>
      </div>
      <Accordion type="single" collapsible className="mb-4">
        <AccordionItem value="params">
          <AccordionTrigger className="text-blue-700 dark:text-blue-300">
            Parameters
          </AccordionTrigger>
          <AccordionContent>
            <ScrollArea className="h-32 w-full rounded-md border p-2">
              <pre className="text-xs font-mono break-all whitespace-pre-wrap text-blue-700 dark:text-blue-300">
                {JSON.stringify(params, null, 2)}
              </pre>
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="bg-white dark:bg-blue-900 rounded-md p-4 mb-4 border border-blue-200 dark:border-blue-700">
        <ScrollArea className="h-32 w-full">
          <Textarea
            value={request}
            onChange={(e) => setRequest(e.target.value)}
            placeholder="Enter service request..."
            className="text-xs font-mono break-all whitespace-pre-wrap text-blue-700 dark:text-blue-300"
          />
        </ScrollArea>
      </div>
      <div className="flex justify-between items-center mb-4">
        <Button
          onClick={handleCall}
          disabled={!isAvailable || request.trim() === ""}
          className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white"
        >
          <PlayCircle className="mr-2 h-4 w-4" />
          Call Service
        </Button>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div
            className={`w-3 h-3 rounded-full mr-2 ${
              isAvailable ? "bg-green-500" : "bg-red-500"
            }`}
          ></div>
          <p className="text-sm text-blue-600 dark:text-blue-400 flex items-center">
            <Wrench className="mr-1 h-4 w-4" />
            {isAvailable ? "Available" : "Unavailable"}
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center">
              <Maximize2 className="mr-2 h-4 w-4" />
              History
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <AlertCircle className="mr-2 h-5 w-5 text-blue-500" />
                Service Call History for {serviceName}
              </DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-[400px] w-full rounded-md border p-4">
              {/* {callHistory.map((call, index) => (
                <div key={index} className="mb-4 p-2 border-b border-blue-200 dark:border-blue-700">
                  <p className="text-sm text-blue-600 dark:text-blue-400">{call.timestamp}</p>
                  <pre className="text-xs font-mono break-all whitespace-pre-wrap text-blue-700 dark:text-blue-300 mt-2">
                    Request: {call.request}
                    {'\n'}
                    Params: {JSON.stringify(call.params, null, 2)}
                    {'\n'}
                    Response: {call.response}
                  </pre>
                </div>
              ))} */}
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
    </motion.div>
  );
}
