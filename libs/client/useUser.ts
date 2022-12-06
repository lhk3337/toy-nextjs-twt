import { User } from "@prisma/client";

import useSWR from "swr";

export interface ProfileResponse {
  ok: boolean;
  user: User;
}

export default function useUser() {
  const { data, error } = useSWR<ProfileResponse>("/api/users/me");

  return { user: data?.user, isLoading: !data && !error };
}
