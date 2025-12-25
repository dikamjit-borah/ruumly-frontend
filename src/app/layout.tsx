import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ruumly - Modern & Minimalist",
  description: "A beautiful, modern, and minimalist Next.js application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
