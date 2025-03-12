"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import axios from "axios";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import SelectCountry from "@/components/SelectCountry";

export type regesterData = {
  email: string;
  password: string;
  country: string;
  balance: string;
  fullName: string;
  phone: string;
  confirmPassword: string;
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function CreateUser() {
  const [data, setData] = useState<regesterData>({
    email: "",
    password: "",
    country: "",
    fullName: "",
    phone: "",
    confirmPassword: "",
    balance: "0",
  });

  const [errors, setErrors] = useState<regesterData>({
    email: "",
    password: "",
    country: "",
    fullName: "",
    phone: "",
    confirmPassword: "",
    balance: "",
  });

  const [country, setCountry] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  useEffect(() => {
    console.log("data", data);
  }, [data]);

  const validateForm = () => {
    let isValid: boolean = true;
    const newErrors: regesterData = {
      email: "",
      password: "",
      country: "",
      fullName: "",
      phone: "",
      confirmPassword: "",
      balance: "",
    };

    // check full name
    if (!data.fullName) {
      newErrors.fullName = "Full name is required";
      isValid = false;
    }

    // check email
    if (!data.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)) {
      newErrors.email = "Invalid email address";
      isValid = true;
    }

    // check password
    if (!data.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (data.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
      isValid = false;
    }

    // check country
    if (!country) {
        console.log("Checking country", country)
      newErrors.country = "Country is required";
      isValid = false;
    }

    // check confirm password
    if (!data.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
      isValid = false;
    } else if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    // check phone
    if (!data.phone) {
      newErrors.phone = "Phone is required";
      isValid = false;
    } else if (!/^[0-9]{10}$/.test(data.phone)) {
      newErrors.phone = "Invalid phone number";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  useEffect(() => {
    console.log("country",country)
  },[country])

  const handelSubmit = async (e: any) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Registering user...");
      console.log("Data before sending:", data);
  
      try {
        const response = await axios.post(
          `${apiUrl}/auth/register`,
          { ...data, country }, // دمج `country` مع البيانات قبل الإرسال
          {
            headers: { "Content-Type": "application/json" },
          }
        );
  
        if (response.status === 201 || response.status === 200) {
          console.log("User registered successfully:", response.data);
        } else {
          console.error("Registration failed:", response.data);
        }
      } catch (error) {
        console.error("Failed to register user", error);
      }
    }
  };
  

  return (
    <div className="">
      <div className=" lg:flex justify-between items-center mb-4 ">
        <div className="flex items-start gap-1 md:gap-2 pb-3 lg:pb-0 ">
          <Link href={"/admin/users"} className="border p-2 md:p-3  ">
            <ArrowLeft className="h-8 w-8" />
          </Link>
          <div className=" items-center gap-2 mt-[-5px] lg:mt-0 ">
            <span className="text-[12px] ">Back To Users list</span>
            <h1 className="text-[25px] lg:text-[30px] font-[600] leading-4 ">
              Create User
            </h1>
          </div>
        </div>
        <div className="flex justify-end gap-5">
          <Button>
            <span>Create Lead</span>
          </Button>
        </div>
      </div>
      <div className="">
        <Card className=" p-4 relative overflow-hidden">
          <form onSubmit={handelSubmit} className="flex flex-col gap-4  ">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-4 relative">
                <Label>Full name</Label>
                <Input
                  type="text"
                  name="fullName"
                  placeholder="John Doe"
                  onChange={handleInputChange}
                  className={`${
                    errors.fullName && "border-[1px] border-red-500"
                  }`}
                />
                {errors.fullName && (
                  <p className="text-[11px] text-red-500 absolute bottom-[-17px]">
                    {errors.fullName}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-4 relative">
                <Label>Balance</Label>
                <Input
                  type="Number"
                  name="balance"
                  placeholder="0.00 $"
                  onChange={handleInputChange}
                  className={`${
                    errors.fullName && "border-[1px] border-red-500"
                  }`}
                />
                {errors.fullName && (
                  <p className="text-[11px] text-red-500 absolute bottom-[-17px]">
                    {errors.fullName}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 relative">
              <Label>Email</Label>
              <Input
                type="text"
                name="email"
                placeholder="entre Your email"
                onChange={handleInputChange}
                className={`${errors.email && "border-[1px] border-red-500"}`}
              />
              {errors.email && (
                <p className="text-[11px] text-red-500 absolute bottom-[-17px]">
                  {errors.email}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2 relative">
                <Label>Phone</Label>
                <Input
                  type="text"
                  name="phone"
                  placeholder="entre phone number"
                  onChange={handleInputChange}
                  className={`${errors.phone && "border-[1px] border-red-500"}`}
                />
                {errors.phone && (
                  <p className="text-[11px] text-red-500 absolute bottom-[-17px]">
                    {errors.phone}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2 relative">
                <SelectCountry setCountry={setCountry} />
                {errors.country && (
                  <p className="text-[11px] text-red-500 absolute bottom-[-17px]">
                    {errors.country}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 relative">
              <Label>Password</Label>
              <Input
                type="text"
                name="password"
                placeholder="entre a strong password"
                onChange={handleInputChange}
                className={`${
                  errors.password && "border-[1px] border-red-500"
                }`}
              />
              {errors.password && (
                <p className="text-[11px] text-red-500 absolute bottom-[-17px]">
                  {errors.password}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 relative">
              <Label>Confirm Password</Label>
              <Input
                type="text"
                name="confirmPassword"
                placeholder="confirm password"
                onChange={handleInputChange}
                className={`${
                  errors.confirmPassword && "border-[1px] border-red-500"
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-[11px] text-red-500 absolute bottom-[-17px]">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
            <Button type="submit">Create User</Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
