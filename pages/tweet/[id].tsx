import Button from "@components/button";
import Layout from "@components/layout";
import Time from "@components/time";
import TwtItem from "@components/twt-item";
import useMutation from "@libs/client/useMutation";
import useUser from "@libs/client/useUser";
import { Answer, Tweets, User } from "@prisma/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
interface rtweetForm {
  rtweet: string;
}
interface AnswerResponse {
  ok: boolean;
  answer: Answer;
}

export interface TweetResponse extends Tweets {
  answers: Answer[];
  user: User;
  onLinked?: boolean;
}
interface DetailTwtResponse {
  ok: boolean;
  tweet: TweetResponse;
}
const TweetDetail: NextPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<rtweetForm>();

  const router = useRouter();
  const { user } = useUser();
  const { data, mutate } = useSWR<DetailTwtResponse | undefined>(
    router.query.id ? `/api/tweets/${router.query.id}` : null
  );
  const [sendAnswer, { data: answerData, loading: answerLoading }] = useMutation<AnswerResponse>(
    `/api/tweets/${router.query.id}/answers`
  );
  console.log(data);
  // console.log(data);
  const onSubmit = ({ rtweet }: rtweetForm) => {
    if (answerLoading) return;
    mutate(
      (prev) =>
        prev && {
          ...prev,
          tweet: {
            ...prev.tweet,
            answers: [{ createdAt: new Date(), answer: rtweet, user: { ...user } }, ...prev.tweet.answers] as any,
          },
        },
      false
    );
    sendAnswer({ rtweet });
    reset();
  };

  useEffect(() => {
    if (answerData && answerData.ok) {
      reset();
      mutate();
    }
  }, [answerData, reset, mutate]);
  // const fakeData = { id: 1, name: "holim", text: "hello", updatedAt: new Date() };
  return (
    <Layout title="Detail Tweet" canGoBack>
      {!data ? <div className=" h-[10vh] bg-gray-600 mx-5 rounded-md animate-pulse" /> : <TwtItem {...data?.tweet} />}
      <div className="p-5 pt-8 border-b-2 border-[#2f3336]">
        {!data ? (
          <div className=" h-[15vh] bg-gray-600  rounded-md animate-pulse" />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex">
              <div className="mr-5">
                <div className="h-12 w-12 rounded-full bg-slate-300 p-4" />
              </div>
              <textarea
                placeholder="트윗 답장 하기"
                rows={3}
                {...register("rtweet")}
                className="text-xl resize-none w-full scrollbar-hide focus:outline-none bg-transparent placeholder:text-[#2f3336] placeholder:font-semibold placeholder:text-xl"
              />
            </div>
            <div className="flex justify-end">
              <Button btnName="Reply" />
            </div>
          </form>
        )}
      </div>
      {!data ? (
        <>
          {Array.from(Array(10).keys()).map((_, i) => {
            return <div key={i} className=" h-[10vh] bg-gray-600 mx-5 my-7  rounded-md animate-pulse" />;
          })}
        </>
      ) : (
        <>
          {data?.tweet.answers.map((value: any, i: any) => {
            return (
              <div key={i} className="p-5 border-b-2 border-[#2f3336] relative ">
                <div className="absolute right-4 justify-center items-center flex h-10 w-10 hover:rounded-full hover:bg-[#eff3f41a] hover:transition hover:duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <div className="flex">
                    <div className="mr-6">
                      <div className="h-12 w-12 rounded-full bg-slate-300 p-4" />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex flex-col mb-3">
                        <span className="text-lg font-semibold">{value.user.userId}</span>
                        <span className="text-gray-500 text-sm">
                          <Time time={new Date(value.createdAt)} />
                        </span>
                      </div>
                      <span className="text-sm">{value.answer}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </Layout>
  );
};
export default TweetDetail;
