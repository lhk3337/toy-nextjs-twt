import LayoutProfile from "@components/layoutProfile";
import TwtList from "@components/twt-list";
import usePagination from "@libs/client/usePagination";
import { TweetResponse } from "@pages/tweet/[id]";
import { User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useSWR from "swr";

export interface userTweets {
  ok: boolean;
  user: User;
  tweetsCount: { _count: number };
  tweetList: TweetResponse[];
}

export default function TweetList() {
  const router = useRouter();
  const { data, isReachedEnd, setSize, page } = usePagination(`/api/users/${router.query.id}/`);
  const { data: layoutData } = useSWR<userTweets>(
    router.query.id ? `/api/users/${router.query.id}/layoutProfile` : null
  );
  useEffect(() => {
    setSize(page);
  }, [setSize, page]);

  return (
    <LayoutProfile profileUser={layoutData?.user} tweetsCount={layoutData?.tweetsCount?._count} layoutData={layoutData}>
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
    </LayoutProfile>
  );
}
