import LayoutProfile from "@components/layoutProfile";
import TwtList from "@components/twt-list";
import useSWR from "swr";

export default function LikeList() {
  const { data } = useSWR("/api/users/likedlist");
  return (
    <LayoutProfile>
      <TwtList data={data?.tweetList} />
    </LayoutProfile>
  );
}
