"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { getCookie } from "./ListLeads";
import { useEffect, useState } from "react";


const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const SelectAdmin = ({
  sales,
  leadID,
  setRefresh,
}: {
  sales: any;
  leadID: string;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const token = getCookie("token-001");
        const response = await axios.get(`${apiUrl}/admins/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAdmins(response.data.admins);
      } catch (err) {
        console.error("fetch admins error", err);
      }
    };
    fetchAdmins();
  }, []);

  const handelChangeSales = async (id: string) => {
    try {
      const token = getCookie("token-001");
      const response = await axios.put(
        `${apiUrl}/leads/${leadID}/admin`,
        { admin: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("change status success", response);
      setRefresh((prev) => !prev);
    } catch (err) {
      console.error("change status error", err);
    }
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className=" outline-none">
          <div
            className={`flex capitalize items-center justify-center gap-1   rounded-[6px]`}
          >
            <span className=" font-[600] text-center">{sales?.fullName ? sales?.fullName : "select Admin"}</span>
          </div>
        </DropdownMenuTrigger>  
        <DropdownMenuContent>
          <DropdownMenuLabel>Sales</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {admins?.map((admin) => {
            if(admin.role === 'superAdmin') {
              return null; // Hide the superAdmin from the dropdown menu.
            }
            return (
              <DropdownMenuItem
                key={admin._id}
                onClick={() => handelChangeSales(admin._id)}
              >
                <span>{admin.fullName}</span>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
