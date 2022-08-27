import useMutation from "../lib/useMutation";
import { useForm } from "react-hook-form";
import { register } from "ts-node";
import useSWR from "swr";
// interface MutationResult {
//   ok: boolean;
//   exists: any;
// }
// interface TokenForm {
//   token: string;
// }
export default function Home() {
  // const { register, handleSubmit: tokenHandleSubmit } = useForm<TokenForm>();
  // const [confirmToken, { loading: tokenLoading, data: UserData }] = useMutation<MutationResult>("/api/me");
  const { data, error } = useSWR("api/me");

  return (
    <>
      <h1>{data?.user.email}</h1>
    </>
  );
}
