import ListUsers from "@/components/ListUsers";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";

export default function User() {
  return (
    <div>
      <div className=" flex justify-between items-center mb-4 ">
        <div className="flex items-center gap-1 ">
          <Users className="h-10 w-10" />
          <h1 className="text-[25px] lg:text-[30px] font-[600] ">Users</h1>
        </div>
        <Link href={"/admin/users/create-user"} className="flex justify-end gap-5">
          <Button className="flex items-center gap-1 ">
            <span className="text hidden md:block">Create User</span>
            <span className="text-[30px] font-[400]">+</span>
          </Button>
        </Link>
      </div>
      <Suspense>
         <ListUsers />
      </Suspense>
    </div>
  );
}
