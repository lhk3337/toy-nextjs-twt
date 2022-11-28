import TwtItem from "./twt-item";
export interface TwtListItem {
  id: number;
  name: string;
  text: string;
  date: string;
}
interface TwtListProps {
  data: TwtListItem[];
}
export default function TwtList({ data }: TwtListProps) {
  return (
    <>
      {data.map((value: TwtListItem) => {
        return <TwtItem {...value} key={value.id} />;
      })}
    </>
  );
}
