"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";

// interface User {
//   id: number;
//   email: string;
//   password: string;
//   fullName: string;
//   phone: string;
//   balance: string;
// }

export default function EditUser() {
  const { id } = useParams();
  const [data, setData] = useState({
    email: "",
    password: "",
    fullName: "",
    phone: "",
    balance: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    fullName: "",
    phone: "",
    balance: "",
  });
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${apiUrl}/users/${id}`);
        console.log(response);
        setData({
          email: response.data.user.email,
          password: response.data.user.password,
          fullName: response.data.user.fullName,
          phone: response.data.user.phone,
          balance: response.data.user.balance,
        });
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    };
    if (id) fetchUser();
  }, [id , apiUrl]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const checkData = () => {
    const { email, password, fullName, phone, balance } = data;
    let isValid = true;
    const errors = {
        email: "",
      password: "",
      fullName: "",
      phone: "",
      balance: "",
    };

    if (!email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      errors.email = "Invalid email format";
      isValid = false;
    }

    if (!password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
      isValid = false;
    }

    if (!fullName) {
      errors.fullName = "Full name is required";
      isValid = false;
    } else if (fullName.length < 3) {
      errors.fullName = "Full name must be at least 3 characters long";
      isValid = false;
    }

    if (!phone) {
      errors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(phone)) {
      errors.phone = "Invalid phone number format";
      isValid = false;
    }

    if (!balance) {
      errors.balance = "Balance is required";
      isValid = false;
    } else if (!/^\d+(\.\d{1,2})?$/.test(balance)) {
      errors.balance = "Invalid balance format";
      isValid = false;
    }
    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (checkData()) {
      try {
        setLoading(true);
        await axios.put(`${apiUrl}/users/${id}`, data, {
          headers: { "Content-Type": "application/json" },
        });
        setLoading(false);
        console.log("success");
      } catch (error) {
        setLoading(false);
        console.error("Failed to update user", error);
      }
    }
  };

  return (
    <div>
      <div className=" lg:flex justify-between items-center mb-4 ">
        <div className="flex items-start gap-1 md:gap-2 pb-3 lg:pb-0 ">
          <Link href={"/admin/users"} className="border p-2 md:p-3  ">
            <ArrowLeft className="h-8 w-8" />
          </Link>
          <div className=" items-center gap-2 mt-[-5px] lg:mt-0 ">
            <span className="text-[12px] ">Back To Users list</span>
            <h1 className="text-[25px] lg:text-[30px] font-[600] leading-4 ">
              Edit User
            </h1>
          </div>
        </div>
        <div className="flex justify-end gap-5">
          <Button>
            <span>Edit Lead</span>
          </Button>
        </div>
      </div>
      <Card className="p-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-4 relative">
              <Label>Full Name</Label>
              <Input
                type="text"
                name="fullName"
                value={data.fullName}
                onChange={handleInputChange}
                className={`${errors.fullName && "border-[1px] border-red-500"}`}
              />
              {errors.fullName && <p className="text-[12px] text-red-500 absolute bottom-[-20px]">{errors.fullName}</p>}
            </div>
            <div className="flex flex-col gap-4 relative">
              <Label>Balance</Label>
              <Input
                type="number"
                name="balance"
                value={data.balance}
                onChange={handleInputChange}
                className={`${errors.balance && "border-[1px] border-red-500"}`}
              />
              {errors.balance && <p className="text-[12px] text-red-500 absolute bottom-[-20px]">{errors.balance}</p>}
            </div>
          </div>
          <div className="flex flex-col gap-4 relative">
            <Label>Phone</Label>
            <Input
              type="text"
              name="phone"
              value={data.phone}
              onChange={handleInputChange}
              className={`${errors.phone && "border-[1px] border-red-500"}`}
            />
            {errors.phone && <p className="text-[12px] text-red-500 absolute bottom-[-20px]">{errors.phone}</p>}
          </div>
          <div className="flex flex-col gap-4 relative">
            <Label>Email</Label>
            <Input
              type="text"
              name="email"
              value={data.email}
              onChange={handleInputChange}
              className={`${errors.email && "border-[1px] border-red-500"}`}
            />
            {errors.email && <p className="text-[12px] text-red-500 absolute bottom-[-20px]">{errors.email}</p>}
          </div>
          <div className="flex flex-col gap-4 relative">
            <Label>Password</Label>
            <Input
              type="text"
              name="password"
              value={data.password}
              onChange={handleInputChange}
              className={`${errors.password && "border-[1px] border-red-500"}`}
            />
            {errors.password && <p className="text-[12px] text-red-500 absolute bottom-[-20px]">{errors.password}</p>}
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update User"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
