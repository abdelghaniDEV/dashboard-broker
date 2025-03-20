"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { TableCell, TableRow } from "./ui/table";
import { Edit, Eye, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import Link from "next/link";
import { getCookie } from "./ListLeads";

export type userType = {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  password: string;
  balance: string;
  createdAt: string;
};

export type userCartProps = {
  user: userType;
  index: number;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function UserCart({ user, setRefresh }: userCartProps) {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    // delete user from
    try {
      const token = getCookie("token-001");
       await axios.delete(`${apiUrl}/users/${user._id}` , {
        headers: { Authorization: `Bearer ${token}` },
       });
      console.log("deleted user successfully");
      setRefresh((prev) => !prev);
      setOpen(false);
    } catch (err) {
      // handle error
      console.error(err);
    }

    // set the state to remove the user from the cart
  };
  return (
    <>
      <TableRow key={user._id}>
        {/* <TableCell>#{index + 1}</TableCell> */}
        <TableCell className="ca capitalize">{user.fullName}</TableCell>
        <TableCell className="hidden md:table-cell">{user.email}</TableCell>
        <TableCell className="hidden lg:table-cell">{user.phone}</TableCell>
        <TableCell>{user.country}</TableCell>
        <TableCell className="hidden lg:table-cell">{new Date(user.createdAt).toLocaleDateString()}</TableCell>
        <TableCell className=" font-[600] ">{user.balance}$</TableCell>

        <TableCell className="item items-center">
          <div className="grid grid-cols-3 items-center gap-2">
            <Button
              className="flex items-center gap-1 bg-[#A3EEA7] text-[#0D8215] "
              
            >
              <Link href={`/admin/users/edit-user/${user._id}`}>
              <Edit />
              </Link>
              
            </Button>
            <Button
              className="flex items-center gap-1 bg-[#FDD8E0] text-[#F4164F] "
              onClick={() => setOpen(true)}
            >
              <Trash />
              
            </Button>
            {/* <Button className="flex items-center gap-1 bg-[#94C0FF] text-[#0167F6]">
              <Eye />
              
            </Button> */}
          </div>
        </TableCell>
      </TableRow>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild></DialogTrigger>

        {/* Dialog Content */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
          </DialogHeader>
          <p>
            This action cannot be undone. This will permanently delete this
            product and remove its data from our servers.
          </p>
          <DialogFooter className="flex gap-4">
            <button
              onClick={() => setOpen(false)}
              className="p-2 bg-secondary rounded-[8px]"
            >
              Close
            </button>
            <button
              onClick={handleDelete}
              className="bg-[#FDD8E0] p-2 text-[#F4164F] rounded-[8px] text-center hover:bg-[#FDD8E0]"
            >
              Delete
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
