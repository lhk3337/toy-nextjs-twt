import useMutation from "../lib/useMutation";
import { useForm, SubmitHandler } from "react-hook-form";

import useSWR from "swr";
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
  const { data, error } = useSWR("api/me");

  return (
    <>
      <h1>어서오세요 {data?.user.userId}님</h1>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("tweets", { required: "이메일 주소를 입력해주세요" })} />
      </form>
    </>
  );
}
