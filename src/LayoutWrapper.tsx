"use client"
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import Sidebar from './components/Sidebar';
import Header from './components/Header';

export default function LayoutWrapper({children}: {children: React.ReactNode;}) {
    const pathname = usePathname(); //
    const isLoginPage = pathname === "/login"; //
    const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="min-h-screen">
        <div className="flex ">
          {!isLoginPage && (
            <Sidebar
            setShowSidebar={setShowSidebar}
            showSidebar={showSidebar}
            />
          )}

          <div className="flex flex-col px-3 md:px-8 w-full">
            {!isLoginPage && <Header  setShowSidebar={setShowSidebar} />}
            <main className="flex-1 py-4">{children}</main>
          </div>
        </div>
      </div>
  )
}
