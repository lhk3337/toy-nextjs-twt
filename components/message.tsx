import { cls } from "@libs/client/util";
import { Msg, User } from "@prisma/client";
import Image from "next/image";
import Time from "./time";

interface msgPros extends Msg {
  user: User;
  reversed?: boolean;
}

export default function Message({ message, user, createdAt, reversed }: msgPros) {
  return (
    <div className="px-2 py-5 space-y-4">
      <div className={cls("flex items-center", reversed ? "flex-row-reverse" : "")}>
        <div className={cls(reversed ? "ml-6" : "mr-6")}>
          {user.avatar ? (
            <div className="relative h-12 w-12">
              <Image
                src={`${process.env.NEXT_PUBLIC_COMMON_IMAGE_URL}${user.avatar}`}
                layout="fill"
                className="rounded-full bg-transparent object-cover"
                alt="avatar"
                priority
              />
            </div>
          ) : (
            <div className="h-12 w-12 rounded-full bg-slate-300 p-4" />
          )}
        </div>
        <span className={cls("px-5 py-2 rounded-xl", reversed ? "bg-[#1d9bf0]" : "bg-[#373941] text-[#B1B3BA]")}>
          {message}
        </span>
      </div>
      {reversed ? (
        <div className="flex justify-end">
          <div className="text-gray-500 text-sm">
            <Time time={new Date(createdAt)} />
          </div>
        </div>
      ) : (
        <div className="text-gray-500 text-sm">
          <Time time={new Date(createdAt)} />
        </div>
      )}
    </div>
  );
}
