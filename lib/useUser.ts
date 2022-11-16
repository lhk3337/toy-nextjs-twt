import { User } from "@prisma/client";

import useSWR from "swr";

interface ProfileResponse {
  ok: boolean;
  user: User;
}

export default function useUser() {
  const { data, error } = useSWR<ProfileResponse>("/api/me");

  return { user: data?.user, isLoading: !data && !error };
}
