import { useInfiniteScroll } from "./useInfiniteScroll";
import useSWRInfinite from "swr/infinite";
import { Chat, Msg, User } from "@prisma/client";

export interface ChatDetail extends Chat {
  msgs: Msg[];
  receiver: User;
  sender: User;
}

interface MsgResponse {
  ok: boolean;
  chatList: ChatDetail[];
}

export default function usepaginationMessage(url: string) {
  const page = useInfiniteScroll();

  const getKey = (pageIndex: number, previousPageData: MsgResponse) => {
    if (pageIndex === 0) return `${url}?page=1`;
    if (previousPageData.chatList && !previousPageData.chatList.length) return null;
    return `${url}?page=${pageIndex + 1}`;
  };

  const { data, error, setSize, size, mutate } = useSWRInfinite<MsgResponse>(getKey);
  const isReachedEnd = data && data[data.length - 1].chatList.length < page;
  const loadingMore = data && typeof data[size - 1]?.chatList === "undefined";

  return {
    data,
    isReachedEnd,
    loadingMore,
    size,
    error,
    setSize,
    mutate,
    page,
  };
}
