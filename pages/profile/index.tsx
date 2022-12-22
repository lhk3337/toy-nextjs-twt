import Layout from "@components/layout";
import TwtList from "@components/twt-list";
import { cls } from "@libs/client/util";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
export default function Profile() {
  const router = useRouter();
  const onMoveClick = () => {
    router.push("/profile/edit");
  };
  const [method, setMethod] = useState<"twt" | "likes">("twt");
  const onTwtListClick = () => {
    setMethod("twt");
  };
  const onLikesListClick = () => {
    setMethod("likes");
  };

  const { data } = useSWR("/api/users/twtlist");
  const { data: twtLike } = useSWR("/api/users/likedlist");

  return (
    <Layout title="Profile" canGoBack>
      <div className="px-10 py-10 flex mb-3 items-center justify-between">
        <div className="flex items-center">
          <div className="h-24 w-24 rounded-full bg-slate-300 p-12" />
          <span className="ml-10 text-2xl">holim</span>
        </div>
        <button
          onClick={onMoveClick}
          className="rounded-3xl border border-white px-4 py-2 hover:bg-[#eff3f41a] hover:transition hover:duration-300"
        >
          Edit Profile
        </button>
      </div>
      <div className="flex justify-center">
        <div className="grid w-full grid-cols-2 border-b  border-[#2f3336]">
          <button
            className={cls(
              "pb-2 transition duration-500",
              method === "twt"
                ? "font-bold border-b-4 border-b-[#1d9bf0] text-white"
                : "border-transparent text-gray-500"
            )}
            onClick={onTwtListClick}
          >
            Tweets
          </button>
          <button
            className={cls(
              "pb-2 transition duration-500 ",
              method === "likes"
                ? "border-b-4 border-b-[#1d9bf0] text-white font-bold"
                : "border-transparent text-gray-500"
            )}
            onClick={onLikesListClick}
          >
            Likes
          </button>
        </div>
      </div>
      <div className="my-2 p-3">
        {method === "twt" && <TwtList data={data?.tweetList} />}
        {method === "likes" && <TwtList data={twtLike?.tweetList} />}
      </div>
    </Layout>
  );
}
