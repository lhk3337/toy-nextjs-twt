import Layout from "@components/layout";
import useUser from "@libs/client/useUser";
import { Chat, Msg, User } from "@prisma/client";
import Link from "next/link";
import useSWR from "swr";
import Time from "@components/time";

interface ChatDetail extends Chat {
  msgs: Msg[];
  receiver: User;
  sender: User;
}
interface MsgResponse {
  ok: boolean;
  chatList: ChatDetail[];
}
export default function Message() {
  const { data } = useSWR<MsgResponse>("/api/message");
  const { user } = useUser();
  return (
    <Layout title="Message">
      <div className="mt-3">
        {data?.chatList.map((chat: ChatDetail) => {
          return (
            <Link key={chat.id} href={`/message/${chat.id}`}>
              <a className="p-5 flex hover:bg-[#16181c]">
                <div className="mr-6">
                  <div className="h-12 w-12 rounded-full bg-slate-300 p-4" />
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="text-lg font-semibold">
                      {user?.id === chat.senderId
                        ? chat.receiver.userId
                        : user?.id === chat.receiverId && chat.sender.userId}
                    </span>
                    <span className="mx-2 text-gray-500">・</span>
                    <span className="text-gray-500 text-sm">
                      <Time time={new Date(chat.createdAt)} />
                    </span>
                  </div>
                  <div>{chat.msgs[chat.msgs.length - 1]?.message}</div>
                </div>
              </a>
            </Link>
          );
        })}
      </div>
    </Layout>
  );
}
