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
      {data?.map((value: TwtListItem) => {
        return <TwtItem {...value} key={value.id} onLinked />;
      })}
    </>
  );
}
