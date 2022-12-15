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

interface IUser {
  tweets: string;
}

interface TweetsResponse {
  ok: boolean;
  tweetList: TwtListItem[];
}

export default function Home() {
  // const { data, error } = useSWR<ProfileResponse>("/api/users/me");
  const { user } = useUser();
  const router = useRouter();
  const { data, mutate, error } = useSWR<TweetsResponse | undefined>("/api/tweets");
  const [tweetWrite, { loading }] = useMutation("/api/tweets");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IUser>();

  const onSubmit: SubmitHandler<IUser> = ({ tweets }) => {
    if (loading) return;
    reset();
    mutate(
      (prev) =>
        prev && {
          ...prev,
          tweetList: [{ updatedAt: new Date(), tweet: tweets, user: { ...user } }, ...prev.tweetList] as any,
        },
      false
    );
    tweetWrite({ tweets });
  };
  // const [confirmToken, { loading: tokenLoading, data: UserData }] = useMutation<MutationResult>("/api/me");

  useEffect(() => {
    if (error) {
      router.replace("/");
    }
  }, [router, error]);

  return (
    <Layout title="Home">
      <div className="p-5 pt-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between">
            <div className="mr-5">
              <div className="h-12 w-12 rounded-full bg-slate-300 p-4" />
            </div>
            <textarea
              placeholder="무슨 일이 일어나고 있나요?"
              rows={3}
              {...register("tweets")}
              className="text-xl resize-none w-full scrollbar-hide focus:outline-none bg-transparent placeholder:text-[#2f3336] placeholder:font-semibold placeholder:text-xl"
            />
          </div>
          <div className="flex justify-end">
            <Button btnName="Tweet" />
          </div>
        </form>
      </div>
      <div className="border-b-2 border-[#2f3336]" />
      <TwtList data={data?.tweetList} />
    </Layout>
  );
}
