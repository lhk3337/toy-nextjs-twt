import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import useMutation from "../lib/useMutation";
import { useEffect } from "react";

interface IUser {
  password: string;
  userId: string;
  confirmpassword: string;
  createErrorResult: string;
}
export default function Create({ eventClick }: any) {
  const [enter, { data: createData }] = useMutation("/api/create");

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<IUser>({ mode: "onChange" });

  const router = useRouter();

  const onSubmit: SubmitHandler<IUser> = (data) => {
    const { password, confirmpassword } = data;
    // 일단 아이디가 중복인지 확인 후 만일 중복이 발생하지 않으면 패스워드들을 비교 후 같게 되면 router.push 처리
    if (password === confirmpassword) {
      enter(data);
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };
  useEffect(() => {
    if (createData?.create) {
      router.push("/?modalId=login");
    } else if (!createData?.create && createData?.message) {
      setError("createErrorResult", { message: createData?.message });
    }
  }, [createData, router, setError]);

  const onInValid = () => {
    console.log("Invalid");
  };

  return (
    <div className="w-96 max-w-2xl mx-auto">
      <div className="bg-white shadow-md border relative border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
        <button className="text-white font-black absolute right-5 top-3" onClick={eventClick}>
          X
        </button>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit, onInValid)}>
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">Create</h3>
          <div>
            <label htmlFor="userId" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">
              아이디
            </label>
            <input
              type="string"
              id="userId"
              {...register("userId", {
                required: "필수 정보 입니다.",
                minLength: { message: "5자 이상의 아이디를 입력해 주세요", value: 5 },
                onChange: () => clearErrors("createErrorResult"),
              })}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="아이디를 입력해주세요"
            />
            <span className="text-[#FF6E6E] font-bold text-sm mt-2 block">
              {errors.createErrorResult ? errors.createErrorResult.message : errors.userId?.message}
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
              })}
              className="bg-gray-50 border border-gray-300 mb-2 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
            <span className="text-[#FF6E6E] font-bold text-sm mt-2 block">{errors.password?.message}</span>
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">
              비밀번호 확인
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              {...register("confirmpassword", {
                required: "비밀번호를 입력해주세요",
                minLength: { message: "비밀번호를 10글자 이상 입력해 주세요", value: 10 },
              })}
              className="bg-gray-50 border border-gray-300 mb-2 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
            <span className="text-[#FF6E6E] font-bold text-sm mt-2 block">{errors.confirmpassword?.message}</span>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            계정 만들기
          </button>
        </form>
      </div>
    </div>
  );
}
