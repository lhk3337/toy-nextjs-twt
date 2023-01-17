import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "@components/layout";
import TwtList from "@components/twt-list";
import TweetWrite from "@components/tweet";

import InfiniteScroll from "react-infinite-scroll-component";
import usePagination from "@libs/client/usePagination";

export default function Home() {
  const router = useRouter();

  const { data, isReachedEnd, mutate, error, setSize, page } = usePagination("/api/tweets/");

  useEffect(() => {
    if (error) {
      router.replace("/");
    }
  }, [router, error]);

  useEffect(() => {
    setSize(page);
  }, [setSize, page]);

  return (
    <Layout title="Home" mutate={mutate}>
      <TweetWrite isModal={false} mutate={mutate} />
      <div className="border-b-2 border-[#2f3336]" />
      <InfiniteScroll
        next={() => setSize(page)}
        dataLength={data?.length ?? 0}
        hasMore={!isReachedEnd}
        loader={
          <div className="flex justify-center py-5">
            <div className="border-b-transparent border-solid animate-spin rounded-full border-blue-400 border-4 h-8 w-8" />
          </div>
        }
      >
        {data?.map((value, i) => (
          <TwtList twtList={value.tweetList} key={i} />
        ))}
      </InfiniteScroll>
    </Layout>
  );
}
