import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useEffect } from "react";
import useUser from "../lib/useUser";
import { ProfileResponse } from "../lib/useUser";
import Layout from "../components/layout";
import Button from "@components/button";
import TwtList from "@components/twt-list";
interface IUser {
  tweets: string;
}

export default function Home() {
  const onSubmit: SubmitHandler<IUser> = (data) => {
    console.log(data);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>();

  // const [confirmToken, { loading: tokenLoading, data: UserData }] = useMutation<MutationResult>("/api/me");

  const router = useRouter();
  const { data, error } = useSWR<ProfileResponse>("api/me");
  const { user } = useUser();

  useEffect(() => {
    if (error) {
      router.replace("/");
    }
  }, [router, error]);

  return (
    <Layout title="Home">
      <div className="p-5 pt-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between">
            <div className="mr-5">
              <div className="h-12 w-12 rounded-full bg-slate-300 p-4" />
            </div>
            <textarea
              placeholder="무슨 일이 일어나고 있나요?"
              rows={4}
              {...register("tweets")}
              className="text-2xl resize-none w-full focus:outline-none bg-transparent placeholder:text-[#2f3336] placeholder:font-semibold placeholder:text-2xl"
            />
          </div>
          <div className="mt-5 flex justify-end">
            <Button btnName="Tweet" />
          </div>
        </form>
      </div>
      <div className="border-b-2 border-[#2f3336]" />
      <TwtList />
    </Layout>
  );
}
