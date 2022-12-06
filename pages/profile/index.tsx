import Layout from "@components/layout";
import TwtList from "@components/twt-list";
import { cls } from "@libs/client/util";
import { useRouter } from "next/router";
import { useState } from "react";
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

  const twtFakeData = [
    { id: 1, name: "holim", date: "22.11.25. 오후 4:31", text: "hello world" },
    { id: 2, name: "martin", date: "22.11.20. 오후 4:31", text: "before and after being denied dino" },
    { id: 3, name: "katie", date: "22.10.02. 오전 4:31", text: "A Few Humble Cinema Lovers" },
    { id: 4, name: "Saltydkdan", date: "22.12.25. 오후 4:31", text: "I need for shiny charm" },
    { id: 5, name: "Cinema Tweets", date: "22.9.25. 오후 4:21", text: "god bless you" },
    { id: 6, name: "Tortie", date: "22.4.25. 오후 1:34", text: "Am I doing this challenge right?" },
  ];

  const likesFakeData = [
    { id: 1, name: "martin", date: "22.11.20. 오후 4:31", text: "before and after being denied dino" },
    { id: 2, name: "Cinema Tweets", date: "22.9.25. 오후 4:21", text: "god bless you" },
    { id: 3, name: "Tortie", date: "22.4.25. 오후 1:34", text: "Am I doing this challenge right?" },
  ];

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
        {method === "twt" && <TwtList data={twtFakeData} />}
        {method === "likes" && <TwtList data={likesFakeData} />}
      </div>
    </Layout>
  );
}
