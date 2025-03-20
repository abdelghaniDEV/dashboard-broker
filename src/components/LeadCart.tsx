"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { TableCell, TableRow } from "./ui/table";
import { Eye, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { LeadStatus } from "./LeadStatus";
import { getCookie } from "./ListLeads";
import { SelectAdmin } from "./SelectAdmin";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export type leadType = {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  status: string;
  createdAt: string;
  admin? : string
};

export type leadCartProps = {
  lead: leadType;
  index: number;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function LeadCart({ lead, setRefresh }: leadCartProps) {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    // delete lead from
    try {
      const token = getCookie("token-001");
      await axios.delete(`${apiUrl}/leads/${lead._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("deleted lead successfully");
      setRefresh((prev) => !prev);
      setOpen(false);
    } catch (err) {
      // handle error
      console.error(err);
    }

    // set the state to remove the lead from the cart
  };

  const profile = useSelector((state : RootState) => state.profile)
  return (
    <>
      <TableRow key={lead._id}>
        {/* <TableCell>#{index + 1}</TableCell> */}
        <TableCell className="ca capitalize">{lead.fullName}</TableCell>
        <TableCell className="hidden md:table-cell">{lead.email}</TableCell>
        <TableCell>{lead.phone}</TableCell>
        <TableCell>{lead.country}</TableCell>
        <TableCell className="hidden xl:table-cell">
          {new Date(lead.createdAt).toLocaleDateString()}
        </TableCell>
        <TableCell className="hidden md:table-cell">
          <LeadStatus
            status={lead.status}
            leadID={lead._id}
            setRefresh={setRefresh}
          />
        </TableCell>
        {profile.role === "superAdmin" && <TableCell><SelectAdmin sales={lead.admin} leadID={lead._id} setRefresh={setRefresh}  /></TableCell>}
        <TableCell className="item items-center">
          <div className="grid grid-cols-1 items-center gap-2">
            <Button
              className="flex items-center gap-1 bg-[#FDD8E0] text-[#F4164F] "
              onClick={() => setOpen(true)}
            >
              <Trash />
              {/* <span className="hidden xl:block">Delete</span> */}
            </Button>
            {/* <Button className="flex items-center gap-1 bg-[#94C0FF] text-[#0167F6]">
              <Eye />
              <span className="hidden xl:block">View</span>
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
