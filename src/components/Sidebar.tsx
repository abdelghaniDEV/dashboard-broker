"use client";
import React from "react";
import { Boxes, ShieldUser, X } from "lucide-react";
import Link from "next/link";
import { Users } from "lucide-react";
import logo from "../assets/Al-Ansari-Exchange-Logo.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type SidebarProps = {
  showSidebar: boolean;
  setShowSidebar: (value: boolean) => void;
};
export default function Sidebar({ showSidebar, setShowSidebar }: SidebarProps) {
  const router = useRouter();

  const handelLogout = () => {
    document.cookie = "token-001=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/login");
  };

  const profile = useSelector((state : RootState) => state.profile)

  return (
    <div
      className={`bg-main-primary text-white px-5 w-[250px] min-h-screen absolute z-[1000] lg:z-[10] 
      transform ${showSidebar ? "translate-x-0" : "-translate-x-full"} 
      lg:translate-x-0 transition-transform duration-300 ease-in-out lg:relative py-4`}
    >
      <div>
        <div
          className="flex items-center justify-between px-2 lg:hidden py-3 text-white"
          onClick={() => setShowSidebar(false)}
        >
          <X />
        </div>
        {/* Sidebar content */}
        <div
          className="pb-5 flex items-center justify-center"
          onClick={() => setShowSidebar(false)}
        >
          <Image src={logo} alt="logo" unoptimized className="w-[200px]" />
        </div>

        <nav>
          <ul
            className="flex flex-col gap-7"
            onClick={() => setShowSidebar(false)}
          >
            {profile.role === "superAdmin" && <Link href={"/admin/users"} className="flex gap-3 items-center">
              <Users />
              <span>Retention</span>
            </Link>}
            
            <Link href={"/admin/leads"} className="flex gap-3 items-center">
              <Boxes />
              <span>Leads</span>
            </Link>
             {profile.role === "superAdmin" &&  <Link href={"/admin/sales"} className="flex gap-3 items-center">
              <ShieldUser />
              <span>Admins</span>
            </Link>}
            <li
              className="flex gap-3 items-center cursor-pointer"
              onClick={() => handelLogout()}
            >
              <X />
              <span>Logout</span>
            </li>
            {/* <Link
              href={"/admin/categories"}
              className="flex gap-3 items-center"
            >
              <User />
              <span>Profile</span>
            </Link> */}
          </ul>
        </nav>
      </div>
    </div>
  );
}
