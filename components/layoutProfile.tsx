import useMutation from "@libs/client/useMutation";
import usePagination from "@libs/client/usePagination";
import useUser from "@libs/client/useUser";
import { cls } from "@libs/client/util";
import { userTweets } from "@pages/profile/[id]";
import { Chat, User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import useSWR from "swr";
import Layout from "./layout";
interface LayoutProfileProps {
  children: ReactNode;
  profileUser?: User;
  tweetsCount?: number;
  layoutData?: userTweets;
}
export default function LayoutProfile({ children, profileUser, tweetsCount, layoutData }: LayoutProfileProps) {
  const router = useRouter();
  const { user } = useUser();
  const { data } = useSWR("/api/message/onMessage"); // chat list get방식으로 데이터 가져오기
  const [chat, { data: chatData }] = useMutation("/api/message"); // chatting 만들기
  const { mutate } = usePagination("/api/tweets/");
  const onMoveClick = () => {
    router.push("/profile/edit");
  };

  // chat api로 데이터 보내기
  const onCreateChatClick = () => {
    const isDuplicateCheckRoom = data?.chatList?.filter(
      (value: Chat) => value.senderId === profileUser?.id && value.receiverId === user?.id
    )[0];
    const isExistRooms = data?.chatList?.filter(
      (value: Chat) => value.senderId === user?.id && value.receiverId === profileUser?.id
    )[0];

    if (isExistRooms) {
      router.push(`/message/${isExistRooms?.id}`);
    } else if (isDuplicateCheckRoom) {
      router.push(`/message/${isDuplicateCheckRoom?.id}`);
    } else {
      if (profileUser) {
        chat({ id: profileUser.id });
      }
    }
  };

  // 채팅 db가 생성되면 채팅 페이지로 이동하기
  useEffect(() => {
    if (chatData?.ok) {
      router.push(`/message/${chatData?.createChat?.id}`);
    }
  }, [router, chatData]);
  useEffect(() => {
    if (layoutData && !layoutData.ok) {
      router.replace("/");
    }
  }, [layoutData, router]);
  return (
    <Layout
      title={`Profile ${
        profileUser?.userId
          ? profileUser.userId.length < 16
            ? profileUser.userId
            : `${profileUser.userId.substring(0, 16)}...`
          : ""
      }`}
      mutate={mutate}
      tweetCount={tweetsCount}
      canGoBack
    >
      {!profileUser ? (
        <div className=" h-[100vh] bg-gray-600 mx-5 my-7 rounded-md animate-pulse" />
      ) : (
        <div>
          <div className="px-10 pt-10 pb-5 flex mb-3 items-center justify-between">
            <div className="flex items-center justify-between">
              {profileUser.avatar ? (
                <div className="relative h-24 w-24">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_COMMON_IMAGE_URL}${profileUser.avatar}`}
                    layout="fill"
                    className="rounded-full bg-transparent object-cover"
                    alt="avatar"
                    priority
                  />
                </div>
              ) : (
                <div className="h-24 w-24 rounded-full bg-slate-300 p-12" />
              )}
              <span className="ml-5 sm:ml-5 md:ml-10  sm:text-lg md:text-2xl font-bold ">
                {profileUser.name
                  ? profileUser.name.length < 16
                    ? profileUser.name
                    : `${profileUser.name.substring(0, 16)}...`
                  : ""}
              </span>
            </div>
            {profileUser.id === user?.id ? (
              <button
                onClick={onMoveClick}
                className="rounded-3xl border border-white px-4 py-2 hover:bg-[#eff3f41a] hover:transition hover:duration-300"
              >
                Edit Profile
              </button>
            ) : (
              <div className="flex justify-end">
                <button
                  onClick={onCreateChatClick}
                  className=" w-12 h-12 rounded-full border-white border-[1px] flex items-center justify-center hover:bg-[rgb(22,24,28)]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" width="24" height="24">
                    <g fill="#EFF3F4">
                      <path
                        d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5V12h-2v-1.537l-8 3.635-8-3.635V18.5c0 .276.224.5.5.5H13v2H4.498c-1.381 0-2.5-1.119-2.5-2.5v-13zm2 2.766l8 3.635 8-3.635V5.5c0-.276-.224-.5-.5-.5h-15c-.276 0-.5.224-.5.5v2.766zM19 18v-3h2v3h3v2h-3v3h-2v-3h-3v-2h3z"
                        fill="#EFF3F4"
                      ></path>
                    </g>
                  </svg>
                </button>
              </div>
            )}
          </div>

          <div className="px-10 mt-4 mb-10">
            <div className="my-4">
              <span>{profileUser.bio}</span>
            </div>
            <div className="space-y-1 my-2 text-[#71767B] text-sm ">
              {profileUser.location ? (
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" width="24" height="24">
                    <g fill="#71767B">
                      <path
                        d="M12 7c-1.93 0-3.5 1.57-3.5 3.5S10.07 14 12 14s3.5-1.57 3.5-3.5S13.93 7 12 7zm0 5c-.827 0-1.5-.673-1.5-1.5S11.173 9 12 9s1.5.673 1.5 1.5S12.827 12 12 12zm0-10c-4.687 0-8.5 3.813-8.5 8.5 0 5.967 7.621 11.116 7.945 11.332l.555.37.555-.37c.324-.216 7.945-5.365 7.945-11.332C20.5 5.813 16.687 2 12 2zm0 17.77c-1.665-1.241-6.5-5.196-6.5-9.27C5.5 6.916 8.416 4 12 4s6.5 2.916 6.5 6.5c0 4.073-4.835 8.028-6.5 9.27z"
                        fill="#71767B"
                      ></path>
                    </g>
                  </svg>
                  <span>{profileUser.location}</span>
                </div>
              ) : null}
              {profileUser.website ? (
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" width="24" height="24">
                    <g fill="#71767B">
                      <path
                        d="M18.36 5.64c-1.95-1.96-5.11-1.96-7.07 0L9.88 7.05 8.46 5.64l1.42-1.42c2.73-2.73 7.16-2.73 9.9 0 2.73 2.74 2.73 7.17 0 9.9l-1.42 1.42-1.41-1.42 1.41-1.41c1.96-1.96 1.96-5.12 0-7.07zm-2.12 3.53l-7.07 7.07-1.41-1.41 7.07-7.07 1.41 1.41zm-12.02.71l1.42-1.42 1.41 1.42-1.41 1.41c-1.96 1.96-1.96 5.12 0 7.07 1.95 1.96 5.11 1.96 7.07 0l1.41-1.41 1.42 1.41-1.42 1.42c-2.73 2.73-7.16 2.73-9.9 0-2.73-2.74-2.73-7.17 0-9.9z"
                        fill="#71767B"
                      ></path>
                    </g>
                  </svg>
                  <Link href={`https://${profileUser.website.replace(/^https?:\/\//, "")}`}>
                    <a className="text-[#1d98f0]">{profileUser.website}</a>
                  </Link>
                </div>
              ) : null}
              <div className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" width="24" height="24">
                  <g fill="#71767B">
                    <path
                      d="M7 4V3h2v1h6V3h2v1h1.5C19.89 4 21 5.12 21 6.5v12c0 1.38-1.11 2.5-2.5 2.5h-13C4.12 21 3 19.88 3 18.5v-12C3 5.12 4.12 4 5.5 4H7zm0 2H5.5c-.27 0-.5.22-.5.5v12c0 .28.23.5.5.5h13c.28 0 .5-.22.5-.5v-12c0-.28-.22-.5-.5-.5H17v1h-2V6H9v1H7V6zm0 6h2v-2H7v2zm0 4h2v-2H7v2zm4-4h2v-2h-2v2zm0 4h2v-2h-2v2zm4-4h2v-2h-2v2z"
                      fill="#71767B"
                    ></path>
                  </g>
                </svg>
                <span>
                  {`Joined ${new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(
                    new Date(profileUser.createdAt)
                  )}`}
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="grid w-full grid-cols-2 border-b  border-[#667784]">
              <Link href={`/profile/${profileUser?.userId}`} className="transition duration-500">
                <button
                  className={cls(
                    "pb-2",
                    router.asPath === `/profile/${profileUser?.userId}`
                      ? "font-bold border-b-4 border-b-[#1d9bf0] text-white"
                      : "border-transparent text-gray-500 "
                  )}
                >
                  Tweets
                </button>
              </Link>
              <Link href={`/profile/${profileUser?.userId}/likes`} className="transition duration-500">
                <button
                  className={cls(
                    "pb-2 ",
                    router.asPath === `/profile/${profileUser?.userId}/likes`
                      ? "border-b-4 border-b-[#1d9bf0] text-white font-bold"
                      : "border-transparent text-gray-500"
                  )}
                >
                  Likes
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
      <div>{children}</div>
    </Layout>
  );
}
