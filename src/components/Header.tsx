"use client";
import React from "react";
import { Menu } from "lucide-react";

type headerProps = {
  setShowSidebar: (show: boolean) => void;
};

export default function Header({ setShowSidebar }: headerProps) {
  return (
    <div className="py-3 flex items-center justify-between w-full">
      <div className="lg:hidden" onClick={() => setShowSidebar(true)}>
        <Menu className="h-8 w-8"  />
      </div>
     
    </div>
  );
}
