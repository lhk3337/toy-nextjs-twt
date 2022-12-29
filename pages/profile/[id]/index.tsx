import LayoutProfile from "@components/layoutProfile";
import TwtList from "@components/twt-list";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function TweetList() {
  const router = useRouter();

  const { data } = useSWR(`/api/users/${router.query.id}`);

  return (
    <LayoutProfile profileUser={data?.user}>
      <TwtList twtList={data?.tweetList} />
    </LayoutProfile>
  );
}
