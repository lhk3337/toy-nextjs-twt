import useUser from "@libs/client/useUser";
import { cls } from "@libs/client/util";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import Layout from "./layout";
interface LayoutProfileProps {
  children: ReactNode;
}
export default function LayoutProfile({ children }: LayoutProfileProps) {
  const router = useRouter();
  const { user } = useUser();

  const onMoveClick = () => {
    router.push("/profile/edit");
  };

  return (
    <Layout title="Profile" canGoBack>
      <div className="px-10 pt-10 pb-5 flex mb-3 items-center justify-between">
        <div className="flex items-center">
          <div className="h-24 w-24 rounded-full bg-slate-300 p-12" />
          <span className="ml-10 text-2xl font-bold">
            {user?.userId ? (user.userId.length < 16 ? user?.userId : `${user?.userId?.substring(0, 16)}...`) : ""}
          </span>
        </div>
        <button
          onClick={onMoveClick}
          className="rounded-3xl border border-white px-4 py-2 hover:bg-[#eff3f41a] hover:transition hover:duration-300"
        >
          Edit Profile
        </button>
      </div>
      <div className="px-10 mt-4 mb-10">
        <div className="my-4">
          <span>{user?.bio ? user?.bio : ""}</span>
        </div>
        <div className="space-y-1 my-2 text-[#71767B] text-sm ">
          {user?.location ? (
            <div className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" width="24" height="24">
                <g fill="#71767B">
                  <path
                    d="M12 7c-1.93 0-3.5 1.57-3.5 3.5S10.07 14 12 14s3.5-1.57 3.5-3.5S13.93 7 12 7zm0 5c-.827 0-1.5-.673-1.5-1.5S11.173 9 12 9s1.5.673 1.5 1.5S12.827 12 12 12zm0-10c-4.687 0-8.5 3.813-8.5 8.5 0 5.967 7.621 11.116 7.945 11.332l.555.37.555-.37c.324-.216 7.945-5.365 7.945-11.332C20.5 5.813 16.687 2 12 2zm0 17.77c-1.665-1.241-6.5-5.196-6.5-9.27C5.5 6.916 8.416 4 12 4s6.5 2.916 6.5 6.5c0 4.073-4.835 8.028-6.5 9.27z"
                    fill="#71767B"
                  ></path>
                </g>
              </svg>
              <span>{user.location}</span>
            </div>
          ) : null}
          {user?.website ? (
            <div className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" width="24" height="24">
                <g fill="#71767B">
                  <path
                    d="M18.36 5.64c-1.95-1.96-5.11-1.96-7.07 0L9.88 7.05 8.46 5.64l1.42-1.42c2.73-2.73 7.16-2.73 9.9 0 2.73 2.74 2.73 7.17 0 9.9l-1.42 1.42-1.41-1.42 1.41-1.41c1.96-1.96 1.96-5.12 0-7.07zm-2.12 3.53l-7.07 7.07-1.41-1.41 7.07-7.07 1.41 1.41zm-12.02.71l1.42-1.42 1.41 1.42-1.41 1.41c-1.96 1.96-1.96 5.12 0 7.07 1.95 1.96 5.11 1.96 7.07 0l1.41-1.41 1.42 1.41-1.42 1.42c-2.73 2.73-7.16 2.73-9.9 0-2.73-2.74-2.73-7.17 0-9.9z"
                    fill="#71767B"
                  ></path>
                </g>
              </svg>
              <Link href={`https://${user.website.replace(/^https?:\/\//, "")}`}>
                <a className="text-[#1d98f0]">{user.website}</a>
              </Link>
            </div>
          ) : null}

          {user?.createdAt ? (
            <>
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
                    new Date(user.createdAt)
                  )}`}
                </span>
              </div>
            </>
          ) : null}
        </div>
      </div>
      <div className="flex justify-center">
        <div className="grid w-full grid-cols-2 border-b  border-[#2f3336]">
          <Link href="/profile" className="transition duration-500">
            <button
              className={cls(
                "pb-2",
                router.pathname === "/profile"
                  ? "font-bold border-b-4 border-b-[#1d9bf0] text-white"
                  : "border-transparent text-gray-500 "
              )}
            >
              Tweets
            </button>
          </Link>
          <Link href="/profile/likes" className="transition duration-500">
            <button
              className={cls(
                "pb-2 ",
                router.pathname === "/profile/likes"
                  ? "border-b-4 border-b-[#1d9bf0] text-white font-bold"
                  : "border-transparent text-gray-500"
              )}
            >
              Likes
            </button>
          </Link>
        </div>
      </div>
      <div>{children}</div>
    </Layout>
  );
}
