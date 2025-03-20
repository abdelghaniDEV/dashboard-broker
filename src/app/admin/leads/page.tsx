"use client";
import ListLeads from "@/components/ListLeads";
import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store";
import { Boxes } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";
import { useSelector } from "react-redux";

export default function Leads() {
  const profile = useSelector((state: RootState) => state.profile);
  return (
    <div>
      <div className=" flex justify-between items-center mb-4 ">
        <div className="flex items-center gap-1 ">
          <Boxes className="h-10 w-10" />
          <h1 className="text-[25px] lg:text-[30px] font-[600] ">Leads</h1>
        </div>
        {profile.role === "superAdmin" && (
          <Link
            href={"/admin/leads/create-lead"}
            className="flex justify-end gap-5"
          >
            <Button className="flex items-center gap-1 ">
              <span className="text hidden md:block">Create Leads</span>
              <span className="text-[30px] font-[400]">+</span>
            </Button>
          </Link>
        )}
      </div>
      <Suspense>
        <ListLeads />
      </Suspense>
    </div>
  );
}
