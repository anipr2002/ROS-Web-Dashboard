import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Link from "next/link";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-4 mt-5 justify-evenly items-stretch">
      <div className="flex w-full justify-between items-center border-b-2 py-2">
        <div className="text-2xl font-bold">ROS Topics</div>
        <div className="flex gap-2 items-center">
          <Tabs defaultValue="subscribe" className="flex gap-2 items-center">
            <TabsList className="flex gap-2 items-center">
              <TabsTrigger value="subscribe">
                <Link href="/topics/subscribe">Subscribe</Link>
              </TabsTrigger>
              <TabsTrigger value="publish">
                <Link href="/topics/publish">Publish</Link>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="subscribe">
              {/* This can be left empty if the content is handled by the linked page */}
            </TabsContent>
            <TabsContent value="publish">
              {/* This can also be left empty */}
            </TabsContent>
          </Tabs>
        </div>
      </div>
      {children}
    </div>
  );
};

export default layout;
