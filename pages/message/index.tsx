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
      {!data ? (
        <div className="p-5 h-screen bg-slate-500 mx-5 my-7  rounded-md animate-pulse" />
      ) : (
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
                      <span className="mx-2 text-slate-500">・</span>
                      <Time time={new Date(chat.createdAt)} />
                    </div>
                    <div className="text-gray-400">
                      {chat.msgs[chat.msgs.length - 1]?.message.length < 40
                        ? chat.msgs[chat.msgs.length - 1]?.message
                        : `${chat.msgs[chat.msgs.length - 1]?.message.substring(0, 40)} ...`}
                    </div>
                  </div>
                </a>
              </Link>
            );
          })}
        </div>
      )}
    </Layout>
  );
}
