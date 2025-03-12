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
import { EllipsisIcon, Eye, Trash } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import LeadCart, { leadCartProps, leadType } from "./LeadCart";
import Pagination from "./Pagination";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function ListLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const [page, setPage] = useState(searchParams.get("page") || "1");
  const [refresh , setRefresh] = useState(false)
  const [totalPages , setTotalPages] = useState(0)
  const [carentPage , setParentPage] = useState(0)

  const router = useRouter();

  const limit = "10";

  useEffect(() => {
    router.push(`?page=${page}`);
  }, [page, router]);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${apiUrl}/leads`, {
          params: { page, limit },
        });

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
  }, [page , refresh]);

  return (
    <div>
      <div className="py-4">
        <Table className="border text-[15px]">
          <TableHeader className="bg-[#F9F9F9]">
            <TableRow className="md:text-[14px] text-center text-[13px]">
              {/* <TableHead>Id-Lead</TableHead> */}
              <TableHead>FullName</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="">Phone</TableHead>
              <TableHead>Country</TableHead>
              <TableHead> Created_at</TableHead>
              <TableHead className="">Status</TableHead>
              <TableHead className="">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead : leadType, index : number ) => {
              return (
                <LeadCart lead={lead} index={index} key={lead._id} setRefresh={setRefresh} />
              );
            })}
          </TableBody>
        </Table>
        <div>
            <Pagination totalPages={totalPages} currentPage={carentPage} page={Number(page)} setPage={setPage}/>
        </div>
      </div>
    </div>
  );
}
