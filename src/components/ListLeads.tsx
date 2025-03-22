"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import axios from "axios";

import { useRouter, useSearchParams } from "next/navigation";
import LeadCart, { leadType } from "./LeadCart";
import Pagination from "./Pagination";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getCookie = (name: string) => {
  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((row) => row.startsWith(name));
  return tokenCookie ? tokenCookie.split("=")[1] : null;
};

const statusColors: Record<string, string> = {
  new: "bg-[#F7E5CC] text-[#F2800D] border-[#F2800D]",
  interested: "bg-[#E6EAFB] text-[#204FC9] border-[#204FC9]",
  shipped: "bg-[#F0FBFE] text-[#13BBE1] border-[#13BBE1]",
  fullInformation: "bg-[#F0FBF4] text-[#13B458] border-[#13B458]",
  noInterested: "bg-[#FCF0EF] text-[#EA6B6D] border-[#EA6B6D]",
  all: "bg-main-secondry",
};

export default function ListLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const [page, setPage] = useState(searchParams.get("page") || "1");
  const [refresh, setRefresh] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [carentPage, setCarentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all"); //
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const router = useRouter();

  const limit = "10";

  useEffect(() => {
    router.push(`?page=${page}`);
  }, [page, router]);

  useEffect(() => {
    console.log("status", status);
    const fetchLeads = async () => {
      try {
        setLoading(true);
        const token = getCookie("token-001");
        const response = await axios.get(`${apiUrl}/leads`, {
          params: { page, limit, search, status },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCarentPage(response.data.totalPages);
        console.log(loading);
        console.log(response.data);
        setLeads(response.data.leads);
        setTotalPages(response.data.totalPages);

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchLeads();
  }, [page, refresh, search, status]);

  const statusOptions = [
    "new",
    "interested",
    "fullInformation",
    "noInterested",
  ];
  const profile = useSelector((state: RootState) => state.profile);

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-center md:justify-between">
        <div className="relative">
          <Input
            type="text"
            value={search}
            placeholder="Search By FullName , Email Address"
            className="px-10 border-b-[1px] w-full md:w-[500px]"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute top-2 left-2  " />
        </div>
        <div className=" md:grid md:grid-cols-2 pt-2">
          <div className="hidden lg:block">
            <span className="text-[13px]">Select Status : </span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full outline-none">
              <div
                className={`flex capitalize items-center justify-center gap-1 border-[1px] ${statusColors[status]} w-[100px] h-8 rounded-[6px]`}
              >
                <span className=" text-[13px] font-[600]">{status}</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setStatus("all")}>
                <div
                  className={`flex cursor-pointer capitalize w-full items-center justify-center gap-1 border-[1px]   py-[6px] px-[2px] rounded-[6px]`}
                >
                  <span className=" text-[13px] font-[600]">all</span>
                </div>
              </DropdownMenuItem>
              {statusOptions.map((status) => {
                return (
                  <DropdownMenuItem
                    key={status}
                    onClick={() => setStatus(status)}
                  >
                    <div
                      className={`flex cursor-pointer capitalize w-full items-center justify-center gap-1 border-[1px] ${statusColors[status]}  py-[6px] px-[2px] rounded-[6px]`}
                    >
                      <span className=" text-[13px] font-[600]">{status}</span>
                    </div>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="py-4">
        <Table className="border text-[15px]">
          <TableHeader className="bg-[#F9F9F9]">
            <TableRow className="md:text-[14px] text-center text-[13px]">
              {/* <TableHead>Id-Lead</TableHead> */}
              <TableHead>FullName</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="">Phone</TableHead>
              <TableHead>Country</TableHead>
              <TableHead className="hidden xl:table-cell">
                {" "}
                Created_at
              </TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              {isClient && profile.role === "superAdmin" && (
                <TableHead className="hidden md:table-cell">
                  Sales Man
                </TableHead>
              )}
              <TableHead className="">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead: leadType, index: number) => {
              return (
                <LeadCart
                  lead={lead}
                  index={index}
                  key={lead._id}
                  setRefresh={setRefresh}
                />
              );
            })}
          </TableBody>
        </Table>
        <div className="py-6">
          <Pagination
            totalPages={totalPages}
            currentPage={carentPage}
            page={Number(page)}
            setPage={setPage}
          />
        </div>
      </div>
    </div>
  );
}
