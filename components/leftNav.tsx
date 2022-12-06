import Link from "next/link";
import Button from "@components/button";
import { useRouter } from "next/router";
import { cls } from "@libs/client/util";
import { useEffect, useState, useRef } from "react";
interface LeftNavProps {
  onModalTwt: () => void;
}

export default function LeftNav({ onModalTwt }: LeftNavProps) {
  const router = useRouter();
  const [logout, setLogout] = useState<boolean>(false);
  const btnRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const closeDropdown = (e: any) => {
      if (e.path[0] !== btnRef.current) {
        setLogout(false);
      }
    };
    document.body.addEventListener("click", closeDropdown);
    return () => document.body.removeEventListener("click", closeDropdown);
  }, []);

  return (
    <div className="flex pt-10 px-2 sm:p-10 flex-col sm:w-72 justify-between">
      <div className="flex flex-col space-y-16">
        <Link href="/">
          <a className="flex justify-center sm:justify-start">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" width="26" height="26">
              <g fill="#D6D9DB">
                <path
                  d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"
                  fill="#D6D9DB"
                ></path>
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
                {router.pathname === "/message" ? (
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
                router.pathname === "/message" ? "font-bold" : ""
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
        <Link href="/profile">
          <a className="flex items-center justify-center sm:justify-start">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" width="26" height="26">
              <g fill="#E7E9EA">
                {router.pathname === "/profile" ? (
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
                router.pathname === "/profile" ? "font-bold" : ""
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
          <div className="w-10 h-10 rounded-full bg-slate-600 sm:mr-4" />
          <span className="text-white hidden sm:block">holim</span>
        </div>
        <div
          onClick={() => setLogout((prev) => !prev)}
          className="hidden right-0 absolute cursor-pointer h-10 w-10 hover:rounded-full sm:flex 
          justify-center items-center hover:bg-[#eff3f41a] hover:transition hover:duration-300"
        >
          <svg
            ref={btnRef}
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
            "shadow-[0_0_5px_2px_rgba(255,255,255,0.26)] hover:bg-[rgb(22,24,28)]",
            logout ? "flex" : "hidden"
          )}
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
