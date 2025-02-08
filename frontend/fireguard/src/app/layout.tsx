import type { Metadata } from "next";
import { Geist, Geist_Mono, EB_Garamond } from "next/font/google";
import "./globals.css";
import Header from "@/app/sections/header";
import Footer from "@/app/sections/footer";
import { UserProvider } from "@/app/context/UserContext"; // User context provider
import { AuthProvider } from "@/app/context/AuthContext"; // Auth context provider

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${ebGaramond.variable} antialiased flex flex-col min-h-screen pt-16 pb-16`}
      >
        <UserProvider>
          <AuthProvider>
            <Header />
            <main className="flex-grow">{children}</main>
          </AuthProvider>
        </UserProvider>
        <Footer />
      </body>
    </html>
  );
}