import useMutation from "../lib/useMutation";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import useSWR from "swr";
import Link from "next/link";
import { useEffect } from "react";
interface IUser {
  tweets: string;
}
export default function Home() {
  // const onSubmit: SubmitHandler<IUser> = (data) => {
  //   console.log(data);
  // };
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<IUser>();
  // const [confirmToken, { loading: tokenLoading, data: UserData }] = useMutation<MutationResult>("/api/me");
  const router = useRouter();
  const { data, error } = useSWR("api/me");

  // console.log(data?.user.id);
  useEffect(() => {
    if (error) {
      router.replace("/");
    }
  }, [router, error]);
  return (
    <>
      <h1>어서오세요 {data?.user.userId}님</h1>
      <Link href={`/tweet/${data?.user.id}`}>
        <a>
          <div className="w-[300px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            이동하기
          </div>
        </a>
      </Link>
    </>
  );
}
