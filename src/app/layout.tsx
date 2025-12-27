import type { Metadata } from "next";
import { Lexend_Deca } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { AuthProvider } from "@/lib/auth-context";

const lexendDeca = Lexend_Deca({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ruumly - Property Management System",
  description: "Rental property management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={lexendDeca.className}>
      <body className="antialiased bg-gray-50">
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
