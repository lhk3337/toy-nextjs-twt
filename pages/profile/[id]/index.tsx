import LayoutProfile from "@components/layoutProfile";
import TwtList from "@components/twt-list";
import { TweetResponse } from "@pages/tweet/[id]";
import { User } from "@prisma/client";
import { useRouter } from "next/router";
import useSWR from "swr";

interface userTweets {
  ok: boolean;
  user: User;
  tweetsCount: { _count: number };
  tweetList: TweetResponse[];
}

export default function TweetList() {
  const router = useRouter();

  const { data } = useSWR<userTweets>(router.query.id ? `/api/users/${router.query.id}` : null);

  return (
    <LayoutProfile profileUser={data?.user} tweetsCount={data?.tweetsCount._count}>
      <TwtList twtList={data?.tweetList} />
    </LayoutProfile>
  );
}
