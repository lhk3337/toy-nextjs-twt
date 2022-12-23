import LayoutProfile from "@components/layoutProfile";
import TwtList from "@components/twt-list";
import useSWR from "swr";

export default function TweetList() {
  const { data: twtLikeData } = useSWR("/api/users/twtlist");
  return (
    <LayoutProfile>
      <TwtList data={twtLikeData?.tweetList} />
    </LayoutProfile>
  );
}
