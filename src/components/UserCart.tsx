"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { TableCell, TableRow } from "./ui/table";
import { Edit, NotebookPen, Trash } from "lucide-react";
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
import { UserStatus } from "./UserStatus";
import { Label } from "./ui/label";

export type userType = {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  password: string;
  balance: string;
  status: string;
  createdAt: string;
  notes: string;
};

export type userCartProps = {
  user: userType;
  index: number;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function UserCart({ user, setRefresh }: userCartProps) {
  const [open, setOpen] = useState(false);
  const [openNote, setOpenNote] = useState(false);
  const [notes , setNotes] = useState("");

  useEffect(() => {
    setNotes(user.notes);
  },[user])

  const handleDelete = async () => {
    // delete user from
    try {
      const token = getCookie("token-001");
      await axios.delete(`${apiUrl}/users/${user._id}`, {
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

  const handleUpdateNotes = async () => {
    try {
      const token = getCookie("token-001");
      await axios.put(`${apiUrl}/users/${user._id}`, {
        notes,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("updated notes successfully");
      setRefresh((prev) =>!prev);
      setOpenNote(false);
    }catch (err) {
      console.error("Failed to update notes", err);
    }
  } 

  useEffect(() => {
    console.log(notes)
  },[notes])
  return (
    <>
      <TableRow key={user._id}>
        {/* <TableCell>#{index + 1}</TableCell> */}
        <TableCell className="ca capitalize">{user.fullName}</TableCell>
        <TableCell className="hidden md:table-cell">{user.email}</TableCell>
        <TableCell className="hidden lg:table-cell">{user.phone}</TableCell>
        <TableCell>{user.country}</TableCell>
        <TableCell className="hidden lg:table-cell">
          {new Date(user.createdAt).toLocaleDateString()}
        </TableCell>
        <TableCell className=" font-[600] ">{user.balance}$</TableCell>
        <TableCell>
          <UserStatus
            status={user.status}
            userID={user._id}
            setRefresh={setRefresh}
          />
        </TableCell>
        <TableCell className="item items-center">
          <div className="grid grid-cols-3 items-center gap-2">
            <Button className="flex items-center gap-1 bg-[#A3EEA7] text-[#0D8215] ">
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
            <Button
              className="flex items-center gap-1 bg-[#94C0FF] text-[#0167F6]"
              onClick={() => setOpenNote(true)}
            >
              <NotebookPen />
            </Button>
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
      <Dialog open={openNote} onOpenChange={setOpenNote}>
        <DialogTrigger asChild></DialogTrigger>

        {/* Dialog Content */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Your Notes</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <Label>Notes</Label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="border-input file:text-foreground placeholder:text-[13px] placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-[100px] w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" />
          </div>
          <DialogFooter className="flex gap-4">
            <button
              onClick={() => setOpenNote(false)}
              className="p-2 bg-secondary rounded-[8px]"
            >
              Close
            </button>
            <button
              onClick={handleUpdateNotes}
              className="bg-[#94C0FF] text-[#0167F6] rounded-[8px] text-center text-[14px] px-4"
            >
              Applay Note
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
