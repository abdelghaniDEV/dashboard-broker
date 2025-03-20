"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import axios from "axios";

import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "./Pagination";
import { Input } from "./ui/input";
import { Search, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { getCookie } from "./ListLeads";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;



export default function ListSales() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const [page, setPage] = useState(searchParams.get("page") || "1");
  const [refresh, setRefresh] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [carentPage, setCarentPage] = useState(0);
  const [search, setSearch] = useState("");


  const router = useRouter();



  const limit = "10";

  useEffect(() => {
    router.push(`?page=${page}`);
  }, [page, router]);

  useEffect(() => {
    const fetchadmins = async () => {
      try {
        setLoading(true);
        const token = getCookie("token-001");
        const response = await axios.get(`${apiUrl}/admins`, {
          params: { page, limit, search, status },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCarentPage(response.data.totalPages);
        console.log(loading);
        console.log(response.data);
        setAdmins(response.data.admins);
        setTotalPages(response.data.totalPages);

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchadmins();
  }, [page, refresh, search]);

  const handeleDelete = async (id : string) => {
    console.log(id)
   
    try {
      const token = getCookie("token-001");
      await axios.delete(`${apiUrl}/admins/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRefresh((prev) =>!prev);
    } catch (err) {
      console.error(err);
    }
  }


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
      </div>
      <div className="py-4">
        <Table className="border text-[15px]">
          <TableHeader className="bg-[#F9F9F9]">
            <TableRow className="md:text-[14px] text-center text-[13px]">
              {/* <TableHead>Id-Lead</TableHead> */}
              <TableHead>FullName</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead>Password</TableHead>
              <TableHead className="">Role</TableHead>
              <TableHead className="hidden xl:table-cell">
                {" "}
                Created_at
              </TableHead>
              <TableHead className="">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {admins.map((admin) => {
              if(admin.role == 'superAdmin'){
                return null
              }
              return (
                <TableRow key={admin._id}>
                  <TableCell className="ca capitalize">
                    {admin.fullName}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {admin.email}
                  </TableCell>
                  <TableCell>{admin.password}</TableCell>
                  <TableCell>{admin.role}</TableCell>
                  <TableCell className="hidden xl:table-cell">
                    {new Date(admin.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="item items-center">
                    <div className="grid grid-cols-1 items-center gap-2">
                      
                      <Button
                        className="flex items-center gap-1 bg-[#FDD8E0] text-[#F4164F] "
                          onClick={() => handeleDelete(admin._id)}
                      >
                        <Trash />
                        <span className="hidden xl:block">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
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
