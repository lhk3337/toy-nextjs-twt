import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  id: string;
  register: UseFormRegisterReturn;
}
export default function Input({ id, register }: InputProps) {
  return (
    <div className="relative w-full">
      <textarea
        {...register}
        rows={3}
        id={id}
        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-white resize-none
      bg-transparent rounded-lg border-2 border-white appearance-none
      focus:outline-none focus:ring-0 focus:border-[#1d9bf0] peer"
        placeholder=" "
      />
      <label
        htmlFor={id}
        className="absolute text-lg text-gray-500  duration-300 transform
      -translate-y-5 scale-75 top-[0.4rem] z-10 origin-[0] bg-black  px-2
      peer-focus:px-2 peer-focus:left-3 peer-focus:text-[#1d9bf0]
      peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
      peer-placeholder-shown:top-1/4 peer-focus:top-[0.4rem] peer-focus:scale-75 peer-focus:-translate-y-5 left-3"
      >
        {id}
      </label>
    </div>
  );
}
