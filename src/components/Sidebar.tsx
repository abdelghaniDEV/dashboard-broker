"use client";
import React from "react";
import { Boxes, User, X } from "lucide-react";
import Link from "next/link";
import { Users } from "lucide-react";
import logo from "../assets/Al-Ansari-Exchange-Logo.png";
import Image from "next/image";

type SidebarProps = {
  showSidebar: boolean;
  setShowSidebar: (value: boolean) => void;
};

export default function Sidebar() {
  const [showSidebar, setShowSidebar] = React.useState(false);

  return (
    <div
      className={`bg-main-primary text-white px-5 w-[250px] min-h-screen absolute z-[1000] lg:z-[10] 
      transform ${showSidebar ? "translate-x-0" : "-translate-x-full"} 
      lg:translate-x-0 transition-transform duration-300 ease-in-out lg:relative py-4`}
    >
      <div>
        <div
          className="flex items-center justify-between px-2 lg:hidden py-3 text-gray-800"
          onClick={() => setShowSidebar(false)}
        >
          <X />
        </div>
        {/* Sidebar content */}
        <div className="pb-5 flex items-center justify-center">
          <Image src={logo} alt="logo" unoptimized className="w-[200px]" />
        </div>

        <nav>
          <ul className="flex flex-col gap-7">
            <Link href={"/admin/users"} className="flex gap-3 items-center">
              <Users />
              <span>Users</span>
            </Link>
            <Link href={"/admin/leads"} className="flex gap-3 items-center">
              <Boxes />
              <span>Leads</span>
            </Link>
            <Link
              href={"/admin/categories"}
              className="flex gap-3 items-center"
            >
              <User />
              <span>Profile</span>
            </Link>
          </ul>
        </nav>
      </div>
    </div>
  );
}
