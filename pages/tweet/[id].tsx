import Button from "@components/button";
import Layout from "@components/layout";
import TwtItem from "@components/twt-item";
import { TwtListItem } from "@components/twt-list";
import { Tweets } from "@prisma/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import useSWR from "swr";
interface rtweetForm {
  rtweet: string;
}

const TweetDetail: NextPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<rtweetForm>();

  const onSubmit = (data: rtweetForm) => {
    console.log(data);
    reset();
  };
  const router = useRouter();
  const { data } = useSWR(router.query.id ? `/api/tweets/${router.query.id}` : null);

  // const fakeData = { id: 1, name: "holim", text: "hello", updatedAt: new Date() };
  return (
    <Layout title="Detail Tweet" canGoBack>
      {!data ? <div className=" h-[10vh] bg-gray-600 mx-5 rounded-md animate-pulse" /> : <TwtItem {...data?.tweet} />}
      <div className="p-5 pt-8 border-b-2 border-[#2f3336]">
        {!data ? (
          <div className=" h-[15vh] bg-gray-600  rounded-md animate-pulse" />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex">
              <div className="mr-5">
                <div className="h-12 w-12 rounded-full bg-slate-300 p-4" />
              </div>
              <textarea
                placeholder="트윗 답장 하기"
                rows={3}
                {...register("rtweet")}
                className="text-xl resize-none w-full scrollbar-hide focus:outline-none bg-transparent placeholder:text-[#2f3336] placeholder:font-semibold placeholder:text-xl"
              />
            </div>
            <div className="flex justify-end">
              <Button btnName="Reply" />
            </div>
          </form>
        )}
      </div>
      {Array(10)
        .fill("")
        .map((_, i) => (
          <div key={i} className="p-5 border-b-2 border-[#2f3336] relative ">
            {!data ? (
              <div className=" h-[10vh] bg-gray-600  rounded-md animate-pulse" />
            ) : (
              <div>
                <div className="absolute right-4 justify-center items-center flex h-10 w-10 hover:rounded-full hover:bg-[#eff3f41a] hover:transition hover:duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <div className="flex">
                    <div className="mr-6">
                      <div className="h-12 w-12 rounded-full bg-slate-300 p-4" />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex flex-col mb-3">
                        <span className="text-lg font-semibold">name</span>
                        <span className="text-gray-500 text-sm">22.11.25. 오후 4:31</span>
                      </div>
                      <span className="text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores voluptatibus mollitia, quo
                        odit praesentium aspernatur quam veritatis. Perspiciatis, quos explicabo distinctio, totam iusto
                        autem tenetur veritatis dolore, unde laudantium nesciunt.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
    </Layout>
  );
};
export default TweetDetail;
