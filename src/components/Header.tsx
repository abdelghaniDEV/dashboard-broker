"use client";
import React, { useEffect } from "react";
import { Input } from "./ui/input";
import { Bell, Menu, Search } from "lucide-react";

type headerProps = {
  setShowSidebar: (show: boolean) => void;
};

export default function Header() {
  return (
    <div className="py-3 flex items-center justify-between w-full">
      <div className="lg:hidden">
        <Menu className="h-8 w-8"  />
      </div>
      <div className="relative hidden md:block">
        <Input
          type="text"
          placeholder="Search Anything"
          className="pl-10 w-[400px] h-8  "
        />
        <Search className="absolute top-1 left-2 text-slate-300 " />
      </div>
      <div>
         <Bell className="bg-main-secondary text-white h-8 w-8 p-1 rounded-full"/>
      </div>
    </div>
  );
}
