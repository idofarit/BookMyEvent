import "remixicon/fonts/remixicon.css";
import { connectMongoDB } from "@/config/dbConfig";
import LayoutProvider from "@/providers/LayoutProvider";
import UilibraryProvider from "@/providers/UilibraryProvider";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { raleway } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "BookMyEvent",
  description: "Get yourself your dream event",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await connectMongoDB();

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${raleway.className}tracking-normal font-semibold`}>
          <UilibraryProvider>
            <LayoutProvider>{children}</LayoutProvider>
          </UilibraryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
