import Button from "@components/button";
import useMutation from "@libs/client/useMutation";
import useUser from "@libs/client/useUser";
import { useForm, SubmitHandler } from "react-hook-form";
import { TwtListItem } from "@components/twt-list";
import useSWR from "swr";
import { Dispatch, SetStateAction } from "react";
import { cls } from "@libs/client/util";

interface IUser {
  tweets: string;
}

interface TweetsResponse {
  ok: boolean;
  tweetList: TwtListItem[];
}

interface modalProps {
  isModal: boolean;
  setIsTwt?: Dispatch<SetStateAction<boolean>>;
}

export default function TweetWrite({ setIsTwt, isModal }: modalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IUser>();

  const { data, mutate, error } = useSWR<TweetsResponse | undefined>("/api/tweets");
  const [tweetWrite, { loading }] = useMutation("/api/tweets");
  const { user } = useUser();

  const onSubmit: SubmitHandler<IUser> = ({ tweets }) => {
    if (loading) return;
    reset();
    if (isModal && setIsTwt) {
      setIsTwt((prev: boolean) => !prev);
    }
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

  const closeClick = () => {
    if (setIsTwt) {
      setIsTwt(false);
    }
  };
  return (
    <div
      className={cls(
        "p-5 pt-8 text-white",
        isModal
          ? "sm:w-[500px] w-[90%] h-[15%] sm:top-20 top-10 left-1/2 -translate-x-1/2 bg-black rounded-lg z-50 absolute"
          : ""
      )}
    >
      {isModal && (
        <button className="text-white font-black absolute right-5 top-3" onClick={closeClick}>
          X
        </button>
      )}
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
  );
}
