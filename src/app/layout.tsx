import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "@/LayoutWrapper";


export const metadata: Metadata = {
  title: "dashboard Al A-NSARI-TRADING",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
