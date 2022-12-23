import useMutation from "@libs/client/useMutation";
import { cls } from "@libs/client/util";
import { DetailTwtResponse, TweetResponse } from "@pages/tweet/[id]";
import Link from "next/link";
import useSWR from "swr";
import Time from "./time";

export default function TwtItem({ id, user, tweet, updatedAt, onLinked, _count, list }: TweetResponse) {
  const [onLike] = useMutation(`/api/tweets/${id}/likes`);
  const [onBookMark] = useMutation(`/api/tweets/${id}/bookmarks`);
  const { data, mutate: twtMutate } = useSWR<DetailTwtResponse>(`/api/tweets/${id}`);

  const onLikedClick = () => {
    if (!data) return;

    twtMutate(
      (prev) =>
        prev && {
          ...prev,
          tweet: {
            ...prev.tweet,
            _count: {
              ...prev.tweet._count,
              likes: prev.isLiking ? prev.tweet._count.likes - 1 : prev?.tweet._count.likes + 1,
            },
          },
          isLiking: !prev.isLiking,
        },
      false
    );

    onLike({});
  };
  const onBookMarkClick = () => {
    if (!data) return;

    twtMutate(
      (prev) =>
        prev && {
          ...prev,
          tweet: {
            ...prev.tweet,
            _count: {
              ...prev.tweet._count,
              bookmarks: prev.isBookMarking ? prev.tweet._count.bookmarks - 1 : prev?.tweet._count.bookmarks + 1,
            },
          },
          isBookMarking: !prev.isBookMarking,
        },
      false
    );
    onBookMark({});
  };
  return (
    <>
      {onLinked ? (
        <Link href={`/tweet/${id}`}>
          <a className="px-3 py-5 flex flex-col relative">
            <span className="text-gray-500 text-sm absolute right-4">
              <Time time={new Date(updatedAt)} />
            </span>
            <div className="px-2 flex">
              <div className="mr-6">
                <div className="h-12 w-12 rounded-full bg-slate-300 p-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold mb-2">{user?.userId}</span>
                <span className="text-sm">{tweet}</span>
              </div>
            </div>
          </a>
        </Link>
      ) : (
        <div className="px-3 py-5 flex flex-col">
          <span className="text-gray-500 text-sm text-right">
            <Time time={new Date(updatedAt)} />
          </span>
          <div className="px-2 flex">
            <div className="mr-6">
              <div className="h-12 w-12 rounded-full bg-slate-300 p-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold mb-2">{user?.userId}</span>
              <span className="text-sm">{tweet}</span>
            </div>
          </div>
        </div>
      )}
      {onLinked || <div className="border-b-2 border-[#2f3336] mt-5" />}
      <div className="p-4 pl-24 flex space-x-20">
        <div className="flex space-x-3 text-[#94A3B8] items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
            />
          </svg>
          <span className="text-sm">{_count?.answers}</span>
        </div>
        <div
          className={cls(
            "flex space-x-3 items-center",
            data?.isLiking ? "text-[#F91880]" : "text-[#94A3B8] hover:text-[#F91880]",
            list ? "hover:text-[#94A3B8] pointer-events-none" : "cursor-pointer"
          )}
          onClick={onLikedClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill={data?.isLiking ? "#F91880" : "none"}
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>

          <span className="text-sm">{_count?.likes}</span>
        </div>
        <div
          className={cls(
            "flex space-x-3 items-center",
            data?.isBookMarking ? "text-[#1d9bf0]" : "text-[#94A3B8] hover:text-[#1d9bf0]",
            list ? "hover:text-[#94A3B8] pointer-events-none" : "cursor-pointer"
          )}
          onClick={onBookMarkClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill={data?.isBookMarking ? "#1d9bf0" : "none"}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
          <span className="text-sm">{_count?.bookmarks}</span>
        </div>
      </div>
      <div className="border-b-2 border-[#2f3336]" />
    </>
  );
}
