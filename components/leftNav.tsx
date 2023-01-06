import Link from "next/link";
import Button from "@components/button";
import { useRouter } from "next/router";
import { cls } from "@libs/client/util";
import { useEffect, useState, useRef } from "react";
import useOnClickOutside from "@libs/client/useOnClickOutside";
import useMutation from "@libs/client/useMutation";
import useUser from "@libs/client/useUser";
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
    <div className="flex pt-10 px-2 sm:p-10 flex-col sm:w-72 justify-between">
      <div className="flex flex-col space-y-16">
        <Link href="/">
          <a className="flex justify-center sm:justify-start">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
              <g fill="#D6D9DB">
                {router.pathname === "/" ? (
                  <>
                    <path d="M12.17 9.53c2.307-2.592 3.278-4.684 3.641-6.218.21-.887.214-1.58.16-2.065a3.578 3.578 0 0 0-.108-.563 2.22 2.22 0 0 0-.078-.23V.453c-.073-.164-.168-.234-.352-.295a2.35 2.35 0 0 0-.16-.045 3.797 3.797 0 0 0-.57-.093c-.49-.044-1.19-.03-2.08.188-1.536.374-3.618 1.343-6.161 3.604l-2.4.238h-.006a2.552 2.552 0 0 0-1.524.734L.15 7.17a.512.512 0 0 0 .433.868l1.896-.271c.28-.04.592.013.955.132.232.076.437.16.655.248l.203.083c.196.816.66 1.58 1.275 2.195.613.614 1.376 1.08 2.191 1.277l.082.202c.089.218.173.424.249.657.118.363.172.676.132.956l-.271 1.9a.512.512 0 0 0 .867.433l2.382-2.386c.41-.41.668-.949.732-1.526l.24-2.408Zm.11-3.699c-.797.8-1.93.961-2.528.362-.598-.6-.436-1.733.361-2.532.798-.799 1.93-.96 2.528-.361.599.599.437 1.732-.36 2.531Z" />
                    <path d="M5.205 10.787a7.632 7.632 0 0 0 1.804 1.352c-1.118 1.007-4.929 2.028-5.054 1.903-.126-.127.737-4.189 1.839-5.18.346.69.837 1.35 1.411 1.925Z" />
                  </>
                ) : (
                  <>
                    <path
                      fill="#D6D9DB"
                      d="M9.752 6.193c.599.6 1.73.437 2.528-.362.798-.799.96-1.932.362-2.531-.599-.6-1.73-.438-2.528.361-.798.8-.96 1.933-.362 2.532Z"
                    />
                    <path d="M15.811 3.312c-.363 1.534-1.334 3.626-3.64 6.218l-.24 2.408a2.56 2.56 0 0 1-.732 1.526L8.817 15.85a.51.51 0 0 1-.867-.434l.27-1.899c.04-.28-.013-.593-.131-.956a9.42 9.42 0 0 0-.249-.657l-.082-.202c-.815-.197-1.578-.662-2.191-1.277-.614-.615-1.079-1.379-1.275-2.195l-.203-.083a9.556 9.556 0 0 0-.655-.248c-.363-.119-.675-.172-.955-.132l-1.896.27A.51.51 0 0 1 .15 7.17l2.382-2.386c.41-.41.947-.67 1.524-.734h.006l2.4-.238C9.005 1.55 11.087.582 12.623.208c.89-.217 1.59-.232 2.08-.188.244.023.435.06.57.093.067.017.12.033.16.045.184.06.279.13.351.295l.029.073a3.475 3.475 0 0 1 .157.721c.055.485.051 1.178-.159 2.065Zm-4.828 7.475.04-.04-.107 1.081a1.536 1.536 0 0 1-.44.913l-1.298 1.3.054-.38c.072-.506-.034-.993-.172-1.418a8.548 8.548 0 0 0-.164-.45c.738-.065 1.462-.38 2.087-1.006ZM5.205 5c-.625.626-.94 1.351-1.004 2.09a8.497 8.497 0 0 0-.45-.164c-.424-.138-.91-.244-1.416-.172l-.38.054 1.3-1.3c.245-.246.566-.401.91-.44l1.08-.107-.04.039Zm9.406-3.961c-.38-.034-.967-.027-1.746.163-1.558.38-3.917 1.496-6.937 4.521-.62.62-.799 1.34-.687 2.051.107.676.483 1.362 1.048 1.928.564.565 1.25.941 1.924 1.049.71.112 1.429-.067 2.048-.688 3.079-3.083 4.192-5.444 4.556-6.987.183-.771.18-1.345.138-1.713a2.835 2.835 0 0 0-.045-.283 3.078 3.078 0 0 0-.3-.041Z" />
                    <path d="M7.009 12.139a7.632 7.632 0 0 1-1.804-1.352A7.568 7.568 0 0 1 3.794 8.86c-1.102.992-1.965 5.054-1.839 5.18.125.126 3.936-.896 5.054-1.902Z" />
                  </>
                )}
              </g>
            </svg>
          </a>
        </Link>
        <Link href="/">
          <a className="flex items-center justify-center sm:justify-start">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" width="26" height="26">
              <g fill="#E7E9EA">
                {router.pathname === "/" ? (
                  <path
                    d="M12 1.696L.622 8.807l1.06 1.696L3 9.679V19.5C3 20.881 4.119 22 5.5 22h13c1.381 0 2.5-1.119 2.5-2.5V9.679l1.318.824 1.06-1.696L12 1.696zM12 16.5c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5 3.5 1.567 3.5 3.5-1.567 3.5-3.5 3.5z"
                    fill="#E7E9EA"
                  ></path>
                ) : (
                  <path
                    d="M12 9c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4zm0 6c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm0-13.304L.622 8.807l1.06 1.696L3 9.679V19.5C3 20.881 4.119 22 5.5 22h13c1.381 0 2.5-1.119 2.5-2.5V9.679l1.318.824 1.06-1.696L12 1.696zM19 19.5c0 .276-.224.5-.5.5h-13c-.276 0-.5-.224-.5-.5V8.429l7-4.375 7 4.375V19.5z"
                    fill="#E7E9EA"
                  ></path>
                )}
              </g>
            </svg>

            <div
              className={cls("text-white text-[20px] ml-4 hidden sm:block", router.pathname === "/" ? "font-bold" : "")}
            >
              Home
            </div>
          </a>
        </Link>
        <Link href="/message">
          <a className="flex items-center justify-center sm:justify-start">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" width="26" height="26">
              <g fill="#E7E9EA">
                {router.pathname === "/message" || router.pathname === "/message/[id]" ? (
                  <path
                    d="M1.998 4.499c0-.828.671-1.499 1.5-1.499h17c.828 0 1.5.671 1.5 1.499v2.858l-10 4.545-10-4.547V4.499zm0 5.053V19.5c0 .828.671 1.5 1.5 1.5h17c.828 0 1.5-.672 1.5-1.5V9.554l-10 4.545-10-4.547z"
                    fill="#E7E9EA"
                  ></path>
                ) : (
                  <path
                    d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.636V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-8 3.636-8-3.638V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z"
                    fill="#E7E9EA"
                  ></path>
                )}
              </g>
            </svg>

            <div
              className={cls(
                "text-white text-[20px] ml-4 hidden sm:block",
                router.pathname === "/message" || router.pathname === "/message/[id]" ? "font-bold" : ""
              )}
            >
              Message
            </div>
          </a>
        </Link>
        <Link href="/bookmark">
          <a className="flex items-center justify-center sm:justify-start">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" width="26" height="26">
              <g fill="#E7E9EA">
                {router.pathname === "/bookmark" ? (
                  <path
                    d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5z"
                    fill="#E7E9EA"
                  ></path>
                ) : (
                  <path
                    d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"
                    fill="#E7E9EA"
                  ></path>
                )}
              </g>
            </svg>
            <div
              className={cls(
                "text-white text-[20px] ml-4 hidden sm:block",
                router.pathname === "/bookmark" ? "font-bold" : ""
              )}
            >
              BookMark
            </div>
          </a>
        </Link>
        <Link href={`/profile/${user?.userId}`}>
          <a className="flex items-center justify-center sm:justify-start">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" width="26" height="26">
              <g fill="#E7E9EA">
                {router.asPath === `/profile/${user?.userId}` || router.asPath === `/profile/${user?.userId}/likes` ? (
                  <path
                    d="M17.863 13.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44zM12 2C9.791 2 8 3.79 8 6s1.791 4 4 4 4-1.79 4-4-1.791-4-4-4z"
                    fill="#E7E9EA"
                  ></path>
                ) : (
                  <path
                    d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z"
                    fill="#E7E9EA"
                  ></path>
                )}
              </g>
            </svg>
            <div
              className={cls(
                "text-white text-[20px] ml-4 hidden sm:block",
                router.asPath === `/profile/${user?.userId}` || router.asPath === `/profile/${user?.userId}/likes`
                  ? "font-bold"
                  : ""
              )}
            >
              Profile
            </div>
          </a>
        </Link>
        <Button btnName="Tweet" mid responsive onClick={onModalTwt} />
      </div>
      <div className="flex relative mb-5 items-center justify-center sm:justify-between">
        <div className="flex items-center justify-between">
          <div
            ref={btnRef1}
            className="w-10 h-10 rounded-full bg-slate-600 sm:mr-4 cursor-pointer sm:cursor-none pointer-events-auto sm:pointer-events-none"
            onClick={() => setLogout1((prev) => !prev)}
          />
          <div
            className={cls(
              "pl-8 cursor-pointer items-center text-white absolute -top-[5rem] left-1 bg-black w-72 h-16 rounded-xl",
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
            "pl-8 cursor-pointer items-center text-white absolute -top-24 -left-6 bg-black w-72 h-16 rounded-xl",
            "shadow-[0_0_5px_2px_rgba(255,255,255,0.26)] hover:bg-[rgb(22,24,28)] z-30",
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
