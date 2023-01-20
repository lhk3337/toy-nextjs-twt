import Button from "@components/button";
import { useRouter } from "next/router";
import { cls } from "@libs/client/util";
import { useEffect, useState, useRef } from "react";
import useOnClickOutside from "@libs/client/useOnClickOutside";
import useMutation from "@libs/client/useMutation";
import useUser from "@libs/client/useUser";
import MenuItem from "@components/menuItem";

interface LeftNavProps {
  onModalTwt: () => void;
}
interface logoutType {
  ok: boolean;
}

export default function LeftNav({ onModalTwt }: LeftNavProps) {
  const router = useRouter();
  const [logout1, setLogout1] = useState<boolean>(false);
  const [logout2, setLogout2] = useState<boolean>(false);

  const btnRef1 = useRef(null);
  const btnRef2 = useRef(null);

  useOnClickOutside(btnRef1, () => setLogout1(false));
  useOnClickOutside(btnRef2, () => setLogout2(false));

  const { user } = useUser();
  const [onLogout, { loading, data: logoutData }] = useMutation<logoutType>("/api/users/logout");

  const onLogoutClick = () => {
    if (!loading) {
      onLogout({});
    }
  };

  useEffect(() => {
    if (logoutData?.ok) {
      router.push("/home");
    }
  }, [logoutData, router]);

  return (
    <div className="flex pt-10 px-4 sm:p-10 flex-col sm:w-72 justify-between sticky h-[100vh] top-0 left-0 z-[1] ">
      <div className="flex flex-col space-y-16">
        <MenuItem />
        <Button btnName="Tweet" mid responsive onClick={onModalTwt} />
      </div>
      <div className="flex relative mb-5 items-center justify-center sm:justify-between">
        <div className="flex items-center justify-between">
          {user?.avatar ? (
            <div
              className="relative w-10 h-10 sm:mr-4 rounded-full cursor-pointer sm:cursor-none pointer-events-auto sm:pointer-events-none"
              onClick={() => setLogout1((prev) => !prev)}
            >
              <img
                ref={btnRef1}
                src={`${process.env.NEXT_PUBLIC_COMMON_IMAGE_URL}${user?.avatar}`}
                className="rounded-full bg-transparent object-cover"
                alt="avatar"
              />
            </div>
          ) : (
            <div
              ref={btnRef1}
              className="w-10 h-10 rounded-full bg-slate-300 sm:mr-4 cursor-pointer sm:cursor-none pointer-events-auto sm:pointer-events-none"
              onClick={() => setLogout1((prev) => !prev)}
            />
          )}

          <div
            className={cls(
              "pl-8 cursor-pointer items-center text-white fixed bottom-20 sm:bottom-32 bg-black w-72 h-16 rounded-xl",
              "shadow-[0_0_5px_2px_rgba(255,255,255,0.26)] hover:bg-[rgb(22,24,28)] z-30",
              logout1 ? "flex" : "hidden"
            )}
            onClick={onLogoutClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="ml-4 text-lg font-bold">Logout</span>
          </div>
          <span className="text-white hidden sm:block">{user?.userId}</span>
        </div>
        <div
          onClick={() => setLogout2((prev) => !prev)}
          className="hidden right-0 absolute cursor-pointer h-10 w-10 hover:rounded-full sm:flex 
          justify-center items-center hover:bg-[#eff3f41a] hover:transition hover:duration-300"
        >
          <svg
            ref={btnRef2}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            aria-hidden="true"
            width="24"
            height="24"
          >
            <g fill="#E7E9EA">
              <path
                d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2
                .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"
                fill="#E7E9EA"
              ></path>
            </g>
          </svg>
        </div>
        <div
          className={cls(
            "pl-8 cursor-pointer items-center text-white  fixed bottom-20 left-[18px] sm:left-auto sm:bottom-32  bg-black w-72 h-16 rounded-xl",
            "shadow-[0_0_5px_2px_rgba(255,255,255,0.26)] hover:bg-[rgb(22,24,28)]",
            logout2 ? "flex" : "hidden"
          )}
          onClick={onLogoutClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span className="ml-4 text-lg font-bold">Logout</span>
        </div>
      </div>
    </div>
  );
}
