import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Header } from "./_components";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "After School Activity Clubs",
  description: "After School Activity Clubs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <div className="w-full bg-blue-950">
            <div className="max-w-\[1440px]\ mx-auto">
              <Header />
            </div>
          </div>

          <div className="max-w-\[1440px]\ mx-auto">{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
