import type { Metadata } from "next";
import "./globals.css";
import UilibraryProvider from "@/providers/UilibraryProvider";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "BookMyEvent",
  description: "Get yourself your dream event",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <UilibraryProvider>{children}</UilibraryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
