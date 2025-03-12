"use client";
import SelectCountry from "@/components/SelectCountry";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { FormEvent, useState } from "react";

export type dataLead = {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  balanes?: string
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function CreateLead() {
  const [data, setData] = useState<dataLead>({
    fullName: "",
    email: "",
    phone: "",
    country: "",
  });
  const [errors, setErrors] = useState<dataLead>({
    fullName: "",
    email: "",
    phone: "",
    country: "",
  });

  const [country , setCountry] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const checkData = () => {
    let isValid = true;
    const errors: dataLead = {
      fullName: "",
      email: "",
      phone: "",
      country: "",
    };

    if (data.fullName.trim() === "") {
      errors.fullName = "Full Name is required";
      isValid = false;
    }

    if (data.email.trim() === "") {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (data.phone.trim() === "") {
      errors.phone = "Phone is required";
      isValid = false;
    }

    if (country.trim() === "") {
      errors.country = "Country is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handelSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (checkData()) {
      // Send form data to server
      try {
        setData({...data, country: country }); // Set initial balance to 0
        const response = await axios.post(`${apiUrl}/leads`, data);
        console.log("Form submitted successfully", response);
      } catch (e) {
        console.error("Error sending form data", e);
      }
    }
  };

  return (
    <div>
      <div className=" lg:flex justify-between items-center mb-4 ">
        <div className="flex items-start gap-1 md:gap-2 pb-3 lg:pb-0 ">
          <Link href={"/admin/leads"} className="border p-2 md:p-3  ">
            <ArrowLeft className="h-8 w-8" />
          </Link>
          <div className=" items-center gap-2 mt-[-5px] lg:mt-0 ">
            <span className="text-[12px] ">Back To Leads list</span>
            <h1 className="text-[25px] lg:text-[30px] font-[600] leading-4 ">
              Create Lead
            </h1>
          </div>
        </div>
        <div className="flex justify-end gap-5">
          <Button>
            <span>Create Lead</span>
          </Button>
        </div>
      </div>
      <div className="py-6">
        <Card className="flex flex-col gap-5 p-4">
          <form onSubmit={handelSubmit} className="flex flex-col gap-5 p-4">
            <div className="flex flex-col gap-2 relative">
              <Label>
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="fullName"
                placeholder="Enter Full Name"
                onChange={handleChange}
                className={`${errors.fullName && "border-red-500"}`}
              />
              {errors.fullName && (
                <p className="text-[12px] text-red-500 absolute bottom-[-18px]">
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2 relative">
              <Label>
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                type="email"
                name="email"
                placeholder="Enter Email Address"
                onChange={handleChange}
                className={`${errors.email && "border-red-500"}`}
              />
              {errors.email && (
                <p className="text-[12px] text-red-500 absolute bottom-[-18px]">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2 relative">
              <SelectCountry setCountry={setCountry} />
              {errors.country && (
                <p className="text-[12px] text-red-500 absolute bottom-[-18px]">
                  {errors.country}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2 relative">
              <Label>
                Phone <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="phone"
                placeholder="Enter phone Number"
                onChange={handleChange}
                className={`${errors.phone && "border-red-500"}`}
              />
              {errors.phone && (
                <p className="text-[12px] text-red-500 absolute bottom-[-18px]">
                  {errors.phone}
                </p>
              )}
            </div>
            <Button type="submit" className=" cursor-pointer">
              Create Lead
            </Button>
          </form>

          {/* Address */}

          {/* City & ZIP Code */}
        </Card>
      </div>
    </div>
  );
}
