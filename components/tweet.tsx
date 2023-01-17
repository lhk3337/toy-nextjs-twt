import Button from "@components/button";
import useMutation from "@libs/client/useMutation";
import useUser from "@libs/client/useUser";
import { useForm, SubmitHandler } from "react-hook-form";
import { TweetResponse } from "@pages/tweet/[id]";
import { Dispatch, SetStateAction, useEffect } from "react";
import { cls } from "@libs/client/util";
import Image from "next/image";
import { KeyedMutator } from "swr";

interface IUser {
  tweets: string;
}

export interface TweetsResponse {
  ok: boolean;
  tweetList: TweetResponse[];
}

interface modalProps {
  isModal: boolean;
  setIsTwt?: Dispatch<SetStateAction<boolean>>;
  mutate?: KeyedMutator<TweetsResponse[]>;
}

export default function TweetWrite({ setIsTwt, isModal, mutate }: modalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IUser>();

  const [tweetWrite, { data: createData, loading }] = useMutation("/api/tweets");
  const { user } = useUser();

  const onSubmit: SubmitHandler<IUser> = ({ tweets }) => {
    if (loading) return;
    tweetWrite({ tweets });
  };

  const closeClick = () => {
    if (setIsTwt) {
      document.body.style.overflow = "unset";
      setIsTwt(false);
    }
  };
  useEffect(() => {
    if (createData?.ok && createData.tweet) {
      if (isModal && setIsTwt) {
        setIsTwt((prev: boolean) => !prev);
        document.body.style.overflow = "unset";
      }
      reset();
      if (!mutate) return;
      mutate();
    }
  }, [createData, reset, setIsTwt, mutate]);
  return (
    <>
      {isModal ? (
        <div className="w-[100vw] h-full bg-[#5b708366] justify-center flex pt-48 z-50 fixed">
          <div className={cls("p-5 pt-8 text-white sm:w-[500px] w-[90%] h-48 relative bg-black rounded-lg")}>
            {isModal && (
              <button className="text-white font-black absolute right-5 top-3" onClick={closeClick}>
                X
              </button>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex justify-between">
                <div className="mr-5">
                  {user?.avatar ? (
                    <div className="relative h-12 w-12">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_COMMON_IMAGE_URL}${user.avatar}`}
                        layout="fill"
                        className="rounded-full bg-transparent object-cover"
                        alt="avatar"
                        priority
                      />
                    </div>
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-slate-300 p-4" />
                  )}
                </div>
                <textarea
                  placeholder="무슨 일이 일어나고 있나요?"
                  rows={3}
                  {...register("tweets", { required: true })}
                  className="text-xl resize-none w-full scrollbar-hide focus:outline-none bg-transparent placeholder:text-[#2f3336] placeholder:font-semibold placeholder:text-xl"
                />
              </div>
              <div className="flex justify-end">
                <Button btnName="Tweet" />
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className={cls("p-5 pt-8 text-white")}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-between">
              <div className="mr-5">
                {user?.avatar ? (
                  <div className="relative h-12 w-12">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_COMMON_IMAGE_URL}${user.avatar}`}
                      layout="fill"
                      className="rounded-full bg-transparent object-cover"
                      alt="avatar"
                      priority
                    />
                  </div>
                ) : (
                  <div className="h-12 w-12 rounded-full bg-slate-300 p-4" />
                )}
              </div>
              <textarea
                placeholder="무슨 일이 일어나고 있나요?"
                rows={3}
                {...register("tweets", { required: true })}
                className="text-xl resize-none w-full scrollbar-hide focus:outline-none bg-transparent placeholder:text-[#2f3336] placeholder:font-semibold placeholder:text-xl"
              />
            </div>
            <div className="flex justify-end">
              <Button btnName="Tweet" />
            </div>
          </form>
        </div>
      )}
    </>
  );
}
