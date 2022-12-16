import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { useRouter } from "next/router";
interface EventClickProps {
  eventClick: () => void;
}
interface MutationResult {
  ok: boolean;
  passwordErrorMsg: string;
  IdErrorMsg: string;
}
interface IUser {
  userId: string;
  password: string;
  IdErrorResult?: string;
  passErrorResult?: string;
}
export default function Login({ eventClick }: EventClickProps) {
  const [enter, { data: loginData, loading }] = useMutation<MutationResult>("/api/users/login");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<IUser>({ mode: "onChange" });

  const onSubmit: SubmitHandler<IUser> = (data) => {
    enter(data);
  };

  useEffect(() => {
    if (loginData?.ok) {
      router.push("/");
    } else if (!loginData?.ok && loginData?.IdErrorMsg) {
      setError("IdErrorResult", { message: loginData?.IdErrorMsg });
    } else if (!loginData?.ok && loginData?.passwordErrorMsg) {
      setError("passErrorResult", { message: loginData?.passwordErrorMsg });
    }
  }, [loginData, router, setError]);

  return (
    <div className="w-96 max-w-2xl mx-auto">
      <div className="relative rounded-lg max-w-sm p-4 sm:p-6 lg:p-8 bg-[#1f2937]">
        <div className="flex items-center justify-center mb-6">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="fill-current text-white w-[32px] h-[32px]">
            <g>
              <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
            </g>
          </svg>
        </div>
        <button className="text-white font-black text-lg absolute right-5 top-3 " onClick={eventClick}>
          ✕
        </button>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">트위터에 로그인 하기</h3>
          <div>
            <label htmlFor="userId" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">
              아이디
            </label>
            <input
              type="text"
              id="userId"
              {...register("userId", {
                required: "아이디를 입력해주세요",
                onChange: () => clearErrors("IdErrorResult"),
              })}
              className="bg-gray-50  mb-2 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="아이디를 입력해주세요"
            />
            <span className="text-[#FF6E6E] font-bold text-sm mt-2 block">
              {errors.IdErrorResult ? errors.IdErrorResult.message : errors.userId?.message}
            </span>
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              {...register("password", {
                required: "비밀번호를 입력해주세요",
                minLength: { message: "비밀번호를 10글자 이상 입력해 주세요", value: 10 },
                onChange: () => clearErrors("passErrorResult"),
              })}
              className="bg-gray-50 border border-gray-300 mb-2 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
            <span className="text-[#FF6E6E] font-bold text-sm mt-2 block">
              {errors.passErrorResult ? errors.passErrorResult.message : errors.password?.message}
            </span>
          </div>
          {loading ? (
            <div className="flex justify-center">
              <svg
                aria-hidden="true"
                className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          ) : (
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              로그인 하기
            </button>
          )}
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            아직 가입 하지 않으셨나요?
            <a href="/create-account" className="text-blue-700 hover:underline dark:text-blue-500 ml-5">
              계정 만들기
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
