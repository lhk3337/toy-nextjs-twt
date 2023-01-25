import Layout from "@components/layout";
import usePagination from "@libs/client/usePagination";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";

interface SearchForm {
  search: string | undefined;
}
interface SearchUserResponse {
  ok: boolean;
  findUser: User[];
}
export default function Search() {
  const [userSearch, setUserSearch] = useState("");
  const [isUser, setIsUser] = useState(true);
  const { handleSubmit, register, setFocus } = useForm<SearchForm>();
  const { data } = useSWR<SearchUserResponse>(`/api/search?userId=${userSearch}`);
  const { mutate } = usePagination("/api/tweets/");
  const onValid = (form: SearchForm) => {
    if (!form.search) return;
    setUserSearch(form?.search);
    setIsUser(true);
  };

  useEffect(() => {
    setFocus("search");
  }, [setFocus]);
  useEffect(() => {
    if (data && !data.ok) {
      setIsUser(false);
    }
  }, [data, setIsUser]);

  return (
    <Layout title="Search" mutate={mutate}>
      <div className="p-5 pt-8">
        <form onSubmit={handleSubmit(onValid)} className="flex space-x-5 justify-center">
          <input
            {...register("search", { required: true })}
            type="text"
            autoComplete="off"
            spellCheck={false}
            placeholder="Start find User"
            className="h-12 w-[20rem] sm:w-[20rem] md:w-[25rem] lg:w-[28rem] p-5 bg-[#373941] placeholder:text-sm appearance-none rounded-full text-white focus:outline-none focus:ring-1 focus:bg-black focus:ring-[#1d9bf0]"
          />
          <button className="flex items-center appearance-none justify-center w-12 h-12 pb-1 rounded-full bg-[#1d9bf0]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" width="24" height="24">
              <g fill="#E7E9EA">
                <path
                  d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"
                  fill="#E7E9EA"
                ></path>
              </g>
            </svg>
          </button>
        </form>
        <div className="mt-10">
          {isUser ? (
            <>
              {data?.findUser?.map((value) => (
                <Link key={value.userId} href={`/profile/${value.userId}`}>
                  <a className="bg-[#373941] px-5 rounded-xl py-3 flex cursor-pointer w-full hover:bg-[rgb(22,24,28)] mb-5">
                    <div className="h-16 w-16 relative rounded-full shadow-[5px_5px_14px_0_rgba(0,0,0,0.7)] bg-[#d9d9d9] flex items-center justify-center">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_COMMON_IMAGE_URL}${value.avatar}`}
                        // layout="fill"
                        className="bg-transparent object-cover rounded-full"
                        alt="avatar"
                        priority
                        width={50}
                        height={50}
                      />
                    </div>
                    <div className="ml-5">
                      <h1 className="text-lg font-semibold">{value.userId}</h1>
                      <span className="text-[#71767B]">
                        {value.bio.length < 30 ? `${value.bio}` : `${value.bio.substring(0, 30)} ...`}
                      </span>
                    </div>
                  </a>
                </Link>
              ))}
            </>
          ) : (
            <div className="px-5 text-xl font-semibold">The {userSearch} you entered cannot be found.</div>
          )}
        </div>
      </div>
    </Layout>
  );
}
