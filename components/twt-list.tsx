import { TweetResponse } from "@pages/tweet/[id]";
import TwtItem from "./twt-item";

interface TwtListProps {
  twtList: TweetResponse[] | undefined;
}
export default function TwtList({ twtList }: TwtListProps) {
  return (
    <>
      {!twtList ? (
        <>
          {Array.from(Array(20).keys()).map((_, i) => {
            return <div key={i} className=" h-[10vh] bg-gray-600 mx-5 my-7  rounded-md animate-pulse" />;
          })}
        </>
      ) : (
        <>
          {twtList?.map((value: TweetResponse) => {
            return <TwtItem {...value} key={value.id} onLinked list />;
          })}
        </>
      )}
    </>
  );
}
