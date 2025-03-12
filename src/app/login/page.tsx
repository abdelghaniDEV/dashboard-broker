"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useRouter } from 'next/navigation';
import React, { useState } from "react";

type loginData = {
  email: string;
  password: string;
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState<loginData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [errorServer, setErrorServer] = useState<string>("");

  const checkData = () => {
    let isValid: boolean = true;
    const tempErrors = { ...errors };

    // check email
    if (!formData.email) {
      setErrors({ ...errors, email: "Email is required" });
      isValid = false;
    } else if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setErrors({ ...errors, email: "Invalid email address" });
      isValid = false;
    } else {
      setErrors({ ...errors, email: "" });
    }

    // check password
    if (!formData.password) {
      tempErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 8) {
      tempErrors.password = "Password must be at least 8 characters long";
      isValid = false;
    } else {
      tempErrors.password = "";
    }

    setErrors(tempErrors);

    return isValid;
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (checkData()) {
      try {
        setLoading(true);
        const response = await axios.post(
          `${apiUrl}/admins/login`,
          formData,
         
        );
        setLoading(false);
        document.cookie = `token-001=${response.data.token}; path=/; max-age=86400`; 
        if (response.status === 200) {
          console.log("Logged in successfully");
          router.push('/admin/leads');
        }
      } catch (e) {
        console.log("Error connecting to server" , e);
        setLoading(false);
        setErrorServer("Invalid credentials");
        return;
      }
    }
  };
  return (
    <Card className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-3 w-[320px]">
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-2xl font-bold">Welcom Back</h2>
        <p className="text-center">
          Please enter your email and password to sign in.
        </p>
       
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 relative">
          <Label>Email</Label>
          <Input
            type="text"
            value={formData.email}
            className="h-8"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {errors.email && (
            <p className="text-red-400 text-[13px] absolute bottom-[-20px]">
              {errors.email}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 relative">
          <Label>Password</Label>
          <Input
            type="text"
            value={formData.password}
            className="h-8"
            onChange={(e) =>
              setFormData((prev) => {
                return { ...prev, password: e.target.value };
              })
            }
          />
          {errors.password && (
            <p className="text-red-500 text-[13px] absolute bottom-[-20px]">
              {errors.password}
            </p>
          )}
        </div>

        {errorServer && <p className="text-red-500">{errorServer}</p>}

        <Button type="submit" className="my-2" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </Button>
      </form>
    </Card>
  );
}
