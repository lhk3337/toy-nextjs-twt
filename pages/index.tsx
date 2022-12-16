import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useEffect } from "react";
import useUser from "@libs/client/useUser";
import { ProfileResponse } from "@libs/client/useUser";
import Layout from "@components/layout";
import Button from "@components/button";
import TwtList, { TwtListItem } from "@components/twt-list";
import useMutation from "@libs/client/useMutation";
import TweetWrite from "@components/tweet";

interface IUser {
  tweets: string;
}

interface TweetsResponse {
  ok: boolean;
  tweetList: TwtListItem[];
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
