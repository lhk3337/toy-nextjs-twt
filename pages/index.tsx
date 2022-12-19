import { useRouter } from "next/router";
import useSWR from "swr";
import { useEffect } from "react";
import Layout from "@components/layout";
import { TweetResponse } from "./tweet/[id]";
import TwtList from "@components/twt-list";
import TweetWrite from "@components/tweet";

interface TweetsResponse {
  ok: boolean;
  tweetList: TweetResponse[];
}

export default function Home() {
  const router = useRouter();
  const { data, mutate, error } = useSWR<TweetsResponse | undefined>("/api/tweets");

  useEffect(() => {
    if (error) {
      router.replace("/");
    }
  }, [router, error]);

  return (
    <Layout title="Home">
      <TweetWrite isModal={false} />
      <div className="border-b-2 border-[#2f3336]" />
      <TwtList data={data?.tweetList} />
    </Layout>
  );
}
