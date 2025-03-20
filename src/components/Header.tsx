"use client";
import React, { useEffect } from "react";
import { Menu } from "lucide-react";
import { useDispatch } from "react-redux";
import { fetchProfile } from "@/redux/slices/profileSlice";
import { AppDispatch } from "@/redux/store";

type headerProps = {
  setShowSidebar: (show: boolean) => void;
};

export default function Header({ setShowSidebar }: headerProps) {

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchProfile())
  },[])
  return (
    <div className="py-3 flex items-center justify-between w-full">
      <div className="lg:hidden" onClick={() => setShowSidebar(true)}>
        <Menu className="h-8 w-8"  />
      </div>
     
    </div>
  );
}
