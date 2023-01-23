import Layout from "@components/layout";
import TwtList from "@components/twt-list";
import usePagination from "@libs/client/usePagination";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Bookmarks() {
  // const { data } = useSWR("/api/bookmark");
  const { mutate } = usePagination("/api/tweets/");
  const { data, isReachedEnd, setSize, page } = usePagination(`/api/bookmark`);
  useEffect(() => {
    setSize(page);
  }, [setSize, page]);
  return (
    <Layout title="Bookmark" mutate={mutate}>
      {!data ? (
        <>
          {Array.from(Array(20).keys()).map((_, i) => {
            return <div key={i} className=" h-[10vh] bg-gray-600 mx-5 my-7  rounded-md animate-pulse" />;
          })}
        </>
      ) : (
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
      )}
    </Layout>
  );
}
