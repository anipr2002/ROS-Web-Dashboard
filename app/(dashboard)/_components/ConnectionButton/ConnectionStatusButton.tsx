"use client";
import React from "react";
import {
  FloatingPanelBody,
  FloatingPanelCloseButton,
  FloatingPanelContent,
  FloatingPanelFooter,
  FloatingPanelRoot,
  FloatingPanelTrigger,
} from "@/components/magicui/floatingTabs";
import { RosConnection } from "./RosConnection";
import { IconCloud, IconCloudOff } from "@tabler/icons-react";
import useRosStore from "@/store/rosStore";

const ConnectionButton = () => {
  const { isConnected } = useRosStore();
  return (
    <div className="fixed left-[60px] right-0 top-0  mx-auto w-fit px-4 py-4 z-50">
      <FloatingPanelRoot>
        <FloatingPanelTrigger
          title="Connection Status"
          className="flex items-center space-x-2 px-2 py-2 bg-background text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors"
        >
          <span>
            {isConnected ? (
              <IconCloud className="text-green-500" />
            ) : (
              <IconCloudOff className="text-red-500" />
            )}
          </span>
        </FloatingPanelTrigger>

        <FloatingPanelContent className="w-96">
          <FloatingPanelBody className="">
            <RosConnection />
          </FloatingPanelBody>
          <FloatingPanelFooter>
            <FloatingPanelCloseButton />
          </FloatingPanelFooter>
        </FloatingPanelContent>
      </FloatingPanelRoot>
    </div>
  );
};

export default ConnectionButton;
