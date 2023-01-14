import { ChatDetail } from "@pages/message";
import { User } from "@prisma/client";
import Image from "next/image";

interface profileProps {
  user: User;
  chat: ChatDetail;
}
export default function MessageProfile({ user, chat }: profileProps) {
  return (
    <div className="relative h-12 w-12">
      <Image
        src={`${process.env.NEXT_PUBLIC_COMMON_IMAGE_URL}${
          user?.id === chat.senderId ? chat.receiver.avatar : user?.id === chat.receiverId && chat.sender.avatar
        }`}
        layout="fill"
        className="rounded-full bg-transparent object-cover"
        alt="avatar"
        priority
      />
    </div>
  );
}
