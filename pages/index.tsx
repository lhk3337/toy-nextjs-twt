import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useEffect } from "react";
import useUser from "../lib/useUser";
import { ProfileResponse } from "../lib/useUser";
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
    <div className="bg-black  max-w-2xl mx-auto border-[#2f3336] border-x-2 text-white py-4">
      <h1 className="text-white mt-5 ml-8 font-bold text-lg">{data?.user?.userId}</h1>
      <div className="flex justify-end m-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="무슨 일이 일어나고 있나요?"
            {...register("tweets")}
            className="w-[500px] text-2xl m-4 mr-0 h-10 focus:outline-none bg-transparent border-b-2 border-[#2f3336] placeholder:text-[#2f3336] placeholder:font-bold placeholder:text-2xl"
          />
          <div className=" text-white ml-[440px] my-2 py-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-3xl text-sm  text-center dark:bg-blue-500 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer">
            <button>트윗하기</button>
          </div>
        </form>
      </div>
      <div className="border-b-2 border-[#2f3336]" />
      <div className="">
        {Array(18)
          .fill(1)
          .map((_, v) => {
            return (
              <>
                <p key={v} className="p-8">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste atque omnis quia quae vitae accusamus
                  reiciendis fuga deserunt tempore consectetur veniam voluptas at rerum vel illum, reprehenderit maiores
                  culpa possimus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ea molestiae, ad quia
                  assumenda nesciunt quos architecto deserunt magni nihil laudantium quae eveniet totam ab perspiciatis
                  tenetur facilis ducimus dicta.
                </p>
                <div className="border-b-2 border-[#2f3336]" />
              </>
            );
          })}
      </div>
    </div>
  );
}
