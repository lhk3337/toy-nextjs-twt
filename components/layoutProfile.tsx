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
  const onMoveClick = () => {
    router.push("/profile/edit");
  };

  return (
    <Layout title="Profile" canGoBack>
      <div className="px-10 py-10 flex mb-3 items-center justify-between">
        <div className="flex items-center">
          <div className="h-24 w-24 rounded-full bg-slate-300 p-12" />
          <span className="ml-10 text-2xl">holim</span>
        </div>
        <button
          onClick={onMoveClick}
          className="rounded-3xl border border-white px-4 py-2 hover:bg-[#eff3f41a] hover:transition hover:duration-300"
        >
          Edit Profile
        </button>
      </div>
      <div className="flex justify-center">
        <div className="grid w-full grid-cols-2 border-b  border-[#2f3336]">
          <Link href="/profile/tweets" className="transition duration-500">
            <button
              className={cls(
                "pb-2",
                router.pathname === "/profile/tweets"
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
