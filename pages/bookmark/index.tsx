import Layout from "@components/layout";
import TwtList from "@components/twt-list";
import usePagination from "@libs/client/usePagination";
import useSWR from "swr";
export default function Bookmarks() {
  const { data } = useSWR("/api/bookmark");
  const { mutate } = usePagination("/api/tweets/");
  return (
    <Layout title="Bookmark" mutate={mutate}>
      {!data ? (
        <>
          {Array.from(Array(20).keys()).map((_, i) => {
            return <div key={i} className=" h-[10vh] bg-gray-600 mx-5 my-7  rounded-md animate-pulse" />;
          })}
        </>
      ) : (
        <TwtList twtList={data?.tweetList} />
      )}
    </Layout>
  );
}
