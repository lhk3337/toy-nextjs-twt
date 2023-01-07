import LayoutProfile from "@components/layoutProfile";
import TwtList from "@components/twt-list";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function TweetList() {
  const router = useRouter();

  const { data } = useSWR(router.query.id ? `/api/users/${router.query.id}` : null);

  return (
    <LayoutProfile profileUser={data?.user} tweetsCount={data?.tweetList.length}>
      <TwtList twtList={data?.tweetList} />
    </LayoutProfile>
  );
}
