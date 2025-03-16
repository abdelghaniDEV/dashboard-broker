"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import axios from "axios";

import { useRouter, useSearchParams } from "next/navigation";

import Pagination from "./Pagination";
import UserCart, { userType } from "./UserCart";
import { getCookie } from "./ListLeads";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function ListUsers() {
  const [users, setusers] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const [page, setPage] = useState(searchParams.get("page") || "1");
  const [refresh, setRefresh] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [carentPage, setCarentPge] = useState(0);
  const [search , setSearch] = useState("");

  const router = useRouter();

  const limit = "10";

  useEffect(() => {
    router.push(`?page=${page}`);
  }, [page, router]);

  useEffect(() => {
    const fetchusers = async () => {
      try {
        setLoading(true);
        const token = getCookie("token-001");
        const response = await axios.get(`${apiUrl}/users`, {
          params: { page, limit , search},
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(loading);
        console.log(response.data);
        setusers(response.data.users);
        setTotalPages(response.data.totalPages);
        setCarentPge(response.data.c);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchusers();
  }, [page, refresh , search]);

  return (
    <div>
      <div className="relative">
          <Input
            type="text"
            value={search}
            placeholder="Search By FullName , Email Address , phone , country ..."
            className="px-10 border-b-[1px] md:w-[500px]"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute top-2 left-2  " />
        </div>
      <div className="py-4">
        <Table className="border text-[15px]">
          <TableHeader className="bg-[#F9F9F9]">
            <TableRow className="md:text-[14px] text-center text-[13px]">
              {/* <TableHead>Id-Lead</TableHead> */}
              <TableHead>FullName</TableHead>
              <TableHead className="hidden lg:table-cell">Email</TableHead>
              <TableHead className="">Phone</TableHead>
              <TableHead className="hidden lg:table-cell">Country</TableHead>
              <TableHead className="hidden lg:table-cell"> Created_at</TableHead>

              <TableHead>Balence</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-[14px]">
            {users.map((user: userType, index: number) => {
              return (
                <UserCart
                  user={user}
                  index={index}
                  key={user._id}
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
