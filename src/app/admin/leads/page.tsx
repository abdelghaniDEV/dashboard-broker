import ListLeads from "@/components/ListLeads";
import { Button } from "@/components/ui/button";
import { Boxes } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";

export default function Leads() {
  return (
    <div>
      <div className=" lg:flex justify-between items-center mb-4 ">
        <div className="flex items-center gap-1 ">
          <Boxes className="h-10 w-10" />
          <h1 className="text-[25px] lg:text-[30px] font-[600] ">Leads</h1>
        </div>
        <Link href={"/admin/leads/create-lead"} className="flex justify-end gap-5">
          <Button className="flex items-center gap-1 ">
            <span className="text ">Create Leads</span>
            <span className="text-[30px] font-[400]">+</span>
          </Button>
        </Link>
      </div>
      <Suspense>
        <ListLeads />
      </Suspense>
    </div>
  );
}
