import Head from "next/head";

import { ReactNode } from "react";
import LeftNav from "@components/leftNav";
interface LayoutProps {
  title: string;
  children: ReactNode;
}
export default function Layout({ title, children }: LayoutProps) {
  return (
    <main>
      <Head>
        <title>{`${title} | Tweet`}</title>
      </Head>
      <div className="flex justify-center">
        <LeftNav />
        <div className="h-screen overflow-y-scroll scrollbar-hide w-[600px]">
          <div className="bg-black  max-w-2xl mx-auto border-[#2f3336] border-x-2 text-white py-4">
            <h1 className="text-white mt-5 ml-8 font-bold text-lg">{title}</h1>
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
