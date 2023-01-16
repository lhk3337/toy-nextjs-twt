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
          <div className=" h-[82vh] bg-gray-600 mx-5 my-7  rounded-md animate-pulse" />;
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
