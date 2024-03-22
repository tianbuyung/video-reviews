import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { getGlobalPageData, getGlobalPageMetadata } from "@/data/loaders";
import { Header } from "@/components/customs/Header";
import { Footer } from "@/components/customs/Footer";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await getGlobalPageMetadata();

  return {
    title: metadata?.title,
    description: metadata?.description,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalData = await getGlobalPageData();
  console.dir(globalData, { depth: null });

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header data={globalData.header} />
        <div>{children}</div>
        <Footer data={globalData.footer} />
      </body>
    </html>
  );
}
