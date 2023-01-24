import Layout from "@components/layout";
import useUser from "@libs/client/useUser";
import { Chat, Msg, User } from "@prisma/client";
import Link from "next/link";
import Time from "@components/time";
import MessageProfile from "@components/messageProfile";
import usePagination from "@libs/client/usePagination";
import usepaginationMessage from "@libs/client/usepaginationMessage";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export interface ChatDetail extends Chat {
  msgs: Msg[];
  receiver: User;
  sender: User;
}

export default function Message() {
  const { user } = useUser();
  const { mutate } = usePagination("/api/tweets/");
  const { data: messageData, isReachedEnd, setSize, page } = usepaginationMessage(`/api/message`);
  console.log(messageData);
  useEffect(() => {
    setSize(page);
  }, [setSize, page]);

  return (
    <Layout title="Message" mutate={mutate}>
      {!messageData ? (
        <div className="p-5 h-screen bg-slate-500 mx-5 my-7  rounded-md animate-pulse" />
      ) : (
        <InfiniteScroll
          next={() => setSize(page)}
          dataLength={messageData?.length ?? 0}
          hasMore={!isReachedEnd}
          loader={
            <div className="flex justify-center py-5">
              <div className="border-b-transparent border-solid animate-spin rounded-full border-blue-400 border-4 h-8 w-8" />
            </div>
          }
        >
          <div className="border-b-2 border-[#2f3336] mt-4" />
          {messageData.map((value, i) => (
            <div className="" key={i}>
              {value?.chatList.map((chat: ChatDetail) => {
                return (
                  <Link key={chat.id} href={`/message/${chat.id}`}>
                    <a className="px-5 py-8 flex hover:bg-[#16181c] border-b-2 border-[#2f3336] relative">
                      <div className="mr-6">
                        {user?.id === chat.senderId && chat.receiver.avatar ? (
                          <MessageProfile user={user} chat={chat} />
                        ) : user?.id === chat.receiverId && chat.sender.avatar ? (
                          <MessageProfile user={user} chat={chat} />
                        ) : (
                          <div className="h-12 w-12 rounded-full bg-slate-300 p-4" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center mb-2">
                          <span className="text-lg font-semibold">
                            {user?.id === chat.senderId
                              ? chat.receiver.userId
                              : user?.id === chat.receiverId && chat.sender.userId}
                          </span>
                          <span className="text-gray-500 text-sm absolute right-5 top-4">
                            <Time time={new Date(chat.createdAt)} />
                          </span>
                        </div>
                        <div className="text-gray-400">
                          {chat.msgs[0]?.message
                            ? chat.msgs[0]?.message.length < 40
                              ? chat.msgs[0]?.message
                              : `${chat.msgs[0]?.message.substring(0, 40)} ...`
                            : "no message"}
                        </div>
                      </div>
                    </a>
                  </Link>
                );
              })}
            </div>
          ))}
        </InfiniteScroll>
      )}
    </Layout>
  );
}
