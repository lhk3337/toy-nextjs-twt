import Head from "next/head";

import { ReactNode, useState } from "react";
import LeftNav from "@components/leftNav";
import { useRouter } from "next/router";
import { cls } from "@libs/client/util";
import TweetWrite, { TweetsResponse } from "./tweet";
import { KeyedMutator } from "swr";
interface LayoutProps {
  title: string;
  children: ReactNode;
  canGoBack?: boolean;
  tweetCount?: number;
  mutate?: KeyedMutator<TweetsResponse[]>;
}
export default function Layout({ title, children, canGoBack, tweetCount, mutate }: LayoutProps) {
  const [isTwt, setIsTwt] = useState<boolean>(false);
  const onModalTwt = () => {
    document.body.style.overflow = "hidden";
    setIsTwt((prev) => !prev);
  };
  const router = useRouter();

  const onClick = () => {
    router.back();
  };
  return (
    <>
      <Head>
        <title>{`${title} | Howitter`}</title>
      </Head>
      <LeftNav onModalTwt={onModalTwt} />
      {isTwt && <TweetWrite setIsTwt={setIsTwt} isModal mutate={mutate} />}
      <div className="border-[#2f3336] border-x-2 w-[90%] sm:w-[550px]">
        <div
          className={cls(
            "text-white font-bold items-center flex text-lg pt-3 sticky top-0 z-40 bg-black",
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
          <div className="flex flex-col pb-2">
            <span>{title}</span>
            <div className="top-0 mt-[-4px] font-normal text-[#71767B] text-sm tracking-tight">
              {tweetCount !== undefined &&
                `${tweetCount > 1000 ? `${(tweetCount / 1000).toFixed(1)}K Tweets` : `${tweetCount} Tweets`}`}
            </div>
          </div>
        </div>
        <div className="text-white">{children}</div>
      </div>
    </>
  );
}
