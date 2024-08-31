import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
