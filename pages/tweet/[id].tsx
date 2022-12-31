import Button from "@components/button";
import Layout from "@components/layout";
import Time from "@components/time";
import TwtItem from "@components/twt-item";
import useMutation from "@libs/client/useMutation";
import useOnClickOutside from "@libs/client/useOnClickOutside";
import useUser from "@libs/client/useUser";
import { cls } from "@libs/client/util";
import { Answer, Tweets, User } from "@prisma/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
interface rtweetForm {
  rtweet: string;
}
interface AnswerResponse {
  ok: boolean;
  answer: Answer;
}
interface AnswerWithUser extends Answer {
  user: User;
}
export interface TweetResponse extends Tweets {
  answers: AnswerWithUser[];
  user: User;
  list: boolean;
  onLinked?: boolean;
  _count: { answers: number; bookmarks: number; likes: number };
}
export interface DetailTwtResponse {
  ok: boolean;
  tweet: TweetResponse;
  isLiking: boolean;
  isBookMarking: boolean;
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

  const [isDelete, setIsDelete] = useState<boolean>(false);
  const btnRef = useRef(null);
  useOnClickOutside(btnRef, () => setIsDelete(false));

  const { data, mutate } = useSWR<DetailTwtResponse | undefined>(
    router.query.id ? `/api/tweets/${router.query.id}` : null
  );
  const [sendAnswer, { data: answerData, loading: answerLoading }] = useMutation<AnswerResponse>(
    `/api/tweets/${router.query.id}/answers`
  );
  const [delAnswer, { data: delAnswerData }] = useMutation<AnswerResponse>(
    `/api/tweets/${router.query.id}/answers/delete`
  );

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
  const onIsRetweet = (value: AnswerWithUser) => {
    if (value.id === data?.tweet.answers.filter((v) => v.id === value.id).find((va) => va)?.id) {
      setIsDelete((prev) => !prev);
    }
  };

  const onDeleteClick = (value: AnswerWithUser) => {
    if (window.confirm("삭제 하시겠습니까?")) {
      delAnswer({ rtId: value.id });
    }
  };

  useEffect(() => {
    if (answerData && answerData.ok) {
      reset();
      mutate();
    }
  }, [answerData, reset, mutate]);
  useEffect(() => {
    if (delAnswerData?.ok) {
      router.reload();
    }
  }, [router, delAnswerData]);
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
          {data?.tweet?.answers.map((value) => {
            return (
              <div key={value.id} className="p-5 border-b-2 border-[#2f3336] relative ">
                {value.user.id === user?.id ? (
                  <>
                    <div
                      onClick={() => onIsRetweet(value)}
                      className="absolute right-4 justify-center items-center flex h-10 w-10 hover:rounded-full hover:bg-[#eff3f41a] hover:transition hover:duration-300"
                    >
                      <svg
                        ref={btnRef}
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
                    <div
                      className={cls(
                        "pl-6 py-4 cursor-pointer items-center text-white absolute top-[4.6rem] right-4 bg-black w-60 rounded-xl",
                        "shadow-[0_0_5px_2px_rgba(255,255,255,0.26)] hover:bg-[rgb(22,24,28)] z-30",
                        isDelete ? "flex" : "hidden"
                      )}
                      onClick={() => onDeleteClick(value)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        width="24"
                        height="24"
                      >
                        <g fill="#F4212E">
                          <path
                            d="M16 6V4.5C16 3.12 14.88 2 13.5 2h-3C9.11 2 8 3.12 8 4.5V6H3v2h1.06l.81 11.21C4.98 20.78 6.28 22 7.86 22h8.27c1.58 0 2.88-1.22 3-2.79L19.93 8H21V6h-5zm-6-1.5c0-.28.22-.5.5-.5h3c.27 0 .5.22.5.5V6h-4V4.5zm7.13 14.57c-.04.52-.47.93-1 .93H7.86c-.53 0-.96-.41-1-.93L6.07 8h11.85l-.79 11.07zM9 17v-6h2v6H9zm4 0v-6h2v6h-2z"
                            fill="#F4212E"
                          ></path>
                        </g>
                      </svg>
                      <span className="ml-4 text-lg font-bold text-[#F4212E]">Delete</span>
                    </div>
                  </>
                ) : null}

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
