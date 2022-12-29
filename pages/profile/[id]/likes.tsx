import LayoutProfile from "@components/layoutProfile";
import TwtList from "@components/twt-list";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function LikeList() {
  const router = useRouter();

  const { data } = useSWR(`/api/users/${router.query.id}/likes`);

  return (
    <LayoutProfile profileUser={data?.user}>
      <TwtList twtList={data?.tweetList} />
    </LayoutProfile>
  );
}
