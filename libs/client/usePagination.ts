import useSWRInfinite from "swr/infinite";
import { useInfiniteScroll } from "@libs/client/useInfiniteScroll";
import { TweetsResponse } from "@components/tweet";
export default function usePagination(url: string) {
  const page = useInfiniteScroll();
  const getKey = (pageIndex: number, previousPageData: TweetsResponse) => {
    if (pageIndex === 0) return `${url}?page=1`;
    if (previousPageData.tweetList && !previousPageData.tweetList.length) return null;
    return `${url}?page=${pageIndex + 1}`;
  };
  const { data, error, setSize, size, mutate } = useSWRInfinite<TweetsResponse>(getKey);
  const isReachedEnd = data && data[data.length - 1].tweetList.length < page;
  const loadingMore = data && typeof data[size - 1]?.tweetList === "undefined";

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
