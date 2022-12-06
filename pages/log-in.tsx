import LoginModal from "@components/modal/login";
import { useRouter } from "next/router";
export default function LoginPage() {
  const router = useRouter();
  const onClickBtn = () => {
    router.push("/");
  };
  return (
    <div className="h-screen  flex items-center justify-center  bg-slate-700">
      <LoginModal eventClick={onClickBtn} />
    </div>
  );
}
