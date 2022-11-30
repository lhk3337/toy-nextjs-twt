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
  const { data, error } = useSWR<ProfileResponse>("api/me");
  const { user } = useUser();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IUser>();

  const onSubmit: SubmitHandler<IUser> = (data) => {
    console.log(data);
    reset();
  };
  // const [confirmToken, { loading: tokenLoading, data: UserData }] = useMutation<MutationResult>("/api/me");

  useEffect(() => {
    if (error) {
      router.replace("/");
    }
  }, [router, error]);

  const fakeData = [
    { id: 1, name: "holim", date: "22.11.25. 오후 4:31", text: "hello world" },
    { id: 2, name: "martin", date: "22.11.20. 오후 4:31", text: "before and after being denied dino" },
    { id: 3, name: "katie", date: "22.10.02. 오전 4:31", text: "A Few Humble Cinema Lovers" },
    { id: 4, name: "Saltydkdan", date: "22.12.25. 오후 4:31", text: "I need for shiny charm" },
    { id: 5, name: "Cinema Tweets", date: "22.9.25. 오후 4:21", text: "god bless you" },
    { id: 6, name: "Tortie", date: "22.4.25. 오후 1:34", text: "Am I doing this challenge right?" },
  ];

  return (
    <Layout title="Home">
      <div className="p-5 pt-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between">
            <div className="mr-5">
              <div className="h-12 w-12 rounded-full bg-slate-300 p-4" />
            </div>
            <textarea
              placeholder="무슨 일이 일어나고 있나요?"
              rows={3}
              {...register("tweets")}
              className="text-xl resize-none w-full scrollbar-hide focus:outline-none bg-transparent placeholder:text-[#2f3336] placeholder:font-semibold placeholder:text-xl"
            />
          </div>
          <div className="flex justify-end">
            <Button btnName="Tweet" />
          </div>
        </form>
      </div>
      <div className="border-b-2 border-[#2f3336]" />
      <TwtList data={fakeData} />
    </Layout>
  );
}
