"use client";
import React, { useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import ConnectionButton from "./_components/ConnectionButton/ConnectionStatusButton";
import useRosStore from "@/store/rosStore";
import Image from "next/image";

import { CommandDialogDemo } from "./_components/Cmndk/CommandK";

function Layout({ children }: { children: React.ReactNode }) {
  const links = [
    {
      label: "Service",
      href: "/service",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Topics",
      href: "/topics/subscribe",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Params",
      href: "/params",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);

  const { rosUrl, connect, setRosUrl } = useRosStore();

  useEffect(() => {
    if (rosUrl === "ws://localhost:9090") {
      setRosUrl("ws://localhost:9090");
      connect();
    }
  }, []);

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row  dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>

          <div className="w-full h-fit flex justify-center">
            {/* <ModeToggle /> */}
          </div>
        </SidebarBody>
      </Sidebar>
      <ConnectionButton />
      <CommandDialogDemo />
      <div className="flex flex-1">
        <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 overflow-y-scroll dark:border-neutral-700 dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
          {children}
        </div>
      </div>
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <Image
        src="/logo.svg"
        alt="ROSUI logo"
        width={40}
        height={40}
        className="rounded-sm"
      />
      {/* <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" /> */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-bold text-6xl dark:text-white whitespace-pre font-animal"
      >
        RosUI
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="/dashboard"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      {/* <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" /> */}
      <Image
        src="/logo.svg"
        className="rounded-sm"
        alt="RoboPig Logo"
        width={24}
        height={20}
      />
    </Link>
  );
};

export default Layout;
