import Layout from "@components/layout";
import Message from "@components/message";
import useMutation from "@libs/client/useMutation";
import useUser from "@libs/client/useUser";
import { Chat, Msg, User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
interface MessageFrom {
  message: string;
}
interface msgResponse extends Msg {
  user: User;
}
interface chatUserResponse extends Chat {
  sender: User;
  receiver: User;
  msgs: msgResponse[];
}
interface messageResponse {
  ok: boolean;
  chatUser: chatUserResponse;
}
export default function MessageDetail() {
  const router = useRouter();
  const { user } = useUser();
  const { data, mutate } = useSWR<messageResponse>(router.query.id ? `/api/message/${router.query.id}` : null, {
    refreshInterval: 1000,
  });
  const { register, handleSubmit, setFocus, reset } = useForm<MessageFrom>();
  const [sendMessage, { loading }] = useMutation(`/api/message/${router.query.id}/msg`);

  const onValid = (form: MessageFrom) => {
    if (loading) return;
    reset();
    mutate(
      (prev) =>
        prev && {
          ...prev,
          chatUser: {
            ...prev.chatUser,
            msgs: [
              ...prev.chatUser.msgs,
              {
                id: Date.now(),
                createdAt: Date.now(),
                message: form.message,
                user: { ...user },
              },
            ],
          } as any,
        },
      false
    );
    sendMessage(form);
  };
  const scrollFixed = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollFixed.current?.scrollIntoView();
  });

  useEffect(() => {
    setFocus("message");
  }, [setFocus]);

  return (
    <Layout
      title={
        !user
          ? "Loading"
          : user?.id === data?.chatUser?.senderId
          ? `with ${data?.chatUser?.receiver.userId}`
          : user?.id === data?.chatUser?.receiverId
          ? `with ${data?.chatUser?.sender.userId}`
          : "Loading"
      }
      canGoBack
    >
      <div className="px-4 flex justify-center">
        <div className="py-5 mb-12">
          {data?.chatUser?.msgs.map((value) => {
            return (
              <div key={value.id} ref={scrollFixed} className="w-[24rem] sm:w-[23rem] md:w-[29rem] lg:w-[34rem]">
                {value.user?.id !== user?.id ? <Message {...value} /> : <Message {...value} reversed />}
              </div>
            );
          })}
        </div>
        <div className="fixed bottom-5">
          <form onSubmit={handleSubmit(onValid)} className="flex space-x-5">
            <input
              {...register("message", { required: true })}
              type="text"
              autoComplete="off"
              spellCheck={false}
              placeholder="Start a new message"
              className="h-12 w-[20rem] sm:w-[20rem] md:w-[25rem] lg:w-[28rem] p-5 bg-[#373941] placeholder:text-sm appearance-none rounded-full text-white focus:outline-none focus:ring-1 focus:bg-black focus:ring-[#1d9bf0]"
            />
            <button className="flex items-center  appearance-none justify-center w-12 h-12 pb-1 rounded-full bg-[#1d9bf0]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                width="24"
                height="24"
                transform="rotate(-40)"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
