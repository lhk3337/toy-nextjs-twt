import Head from "next/head";

import { ReactNode, useState } from "react";
import LeftNav from "@components/leftNav";
import { useRouter } from "next/router";
import { cls } from "lib/util";
interface LayoutProps {
  title: string;
  children: ReactNode;
  canGoBack?: boolean;
}
export default function Layout({ title, children, canGoBack }: LayoutProps) {
  const [isTwt, setIsTwt] = useState<boolean>(true);
  const onModalTwt = () => {
    setIsTwt((prev) => !prev);
  };
  const router = useRouter();

  const onClick = () => {
    router.back();
  };
  return (
    <main>
      <Head>
        <title>{`${title} | Tweet`}</title>
      </Head>
      <div className="flex justify-center">
        <LeftNav onModalTwt={onModalTwt} />
        <div className="h-screen overflow-y-scroll scrollbar-hide w-[600px]  border-[#2f3336] border-x-2 ">
          <div
            className={cls(
              "text-white font-bold items-center flex text-lg py-3 sticky top-0 bg-black/90 z-30",
              canGoBack ? "pl-2" : "pl-4"
            )}
          >
            {canGoBack && (
              <button
                onClick={onClick}
                className="mr-2 flex justify-center transition-shadow items-center h-10 w-10 hover:rounded-full hover:bg-[#eff3f41a] hover:transition hover:duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
              </button>
            )}
            <span>{title}</span>
          </div>
          <div className="text-white">{children}</div>
        </div>
      </div>
    </main>
  );
}
