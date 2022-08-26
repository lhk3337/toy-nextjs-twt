import { useRouter } from "next/router";
import Create from "../components/create";
export default function CreatePage() {
  const router = useRouter();
  const onClickBtn = () => {
    router.push("/");
  };
  return (
    <div className="h-screen  flex items-center justify-center  bg-slate-700">
      <Create eventClick={onClickBtn} />
    </div>
  );
}
