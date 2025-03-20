import ListSales from "@/components/ListeSales";
import { Button } from "@/components/ui/button";
import { ShieldUser } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";

export default function Sales() {
  return (
    <div>
      <div className=" flex justify-between items-center mb-4 ">
        <div className="flex items-center gap-1 ">
          <ShieldUser className="h-10 w-10" />
          <h1 className="text-[25px] lg:text-[30px] font-[600] ">Sales</h1>
        </div>
        <Link href={"/admin/sales/create-admin"} className="flex justify-end gap-5">
          <Button className="flex items-center gap-1 ">
            <span className="text hidden md:block">Create Sales</span>
            <span className="text-[30px] font-[400]">+</span>
          </Button>
        </Link>
      </div>
      <Suspense>
          <ListSales />
      </Suspense>
    </div>
  );
}
