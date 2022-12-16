import { Tweets } from "@prisma/client";
import TwtItem from "./twt-item";

export interface TwtListItem extends Tweets {
  user: { userId: string };
  onLinked?: boolean;
}
interface TwtListProps {
  data: TwtListItem[] | undefined;
}
export default function TwtList({ data }: TwtListProps) {
  return (
    <>
      {!data ? (
        <>
          {Array.from(Array(20).keys()).map((_, i) => {
            return <div key={i} className=" h-[10vh] bg-gray-600 mx-5 my-7  rounded-md animate-pulse" />;
          })}
        </>
      ) : (
        <>
          {data?.map((value: TwtListItem) => {
            return <TwtItem {...value} key={value.id} onLinked />;
          })}
        </>
      )}
    </>
  );
}
