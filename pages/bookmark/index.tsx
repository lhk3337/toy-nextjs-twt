import Layout from "@components/layout";
import TwtList from "@components/twt-list";
import useSWR from "swr";
export default function Bookmarks() {
  const { data } = useSWR("/api/bookmark");

  return (
    <Layout title="Bookmark">
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
