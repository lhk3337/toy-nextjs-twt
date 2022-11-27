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
        <div className="h-screen overflow-y-scroll scrollbar-hide w-[600px] border-[#2f3336] border-x-2">
          <div className="text-white font-bold text-lg m-6 mb-8">
            <span>{title}</span>
          </div>
          <div className=" mx-auto text-white">{children}</div>
        </div>
      </div>
    </main>
  );
}
