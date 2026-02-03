import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Curated News",
  description: "Your personalized, politics-free news feed",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        {children}
      </body>
    </html>
  );
}
