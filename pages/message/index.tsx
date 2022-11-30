import Layout from "@components/layout";
import Link from "next/link";
export default function Message() {
  return (
    <Layout title="Message">
      <div className="mt-3">
        {Array(5)
          .fill("")
          .map((_, i) => (
            <Link key={i} href="/message/1">
              <a className="p-5 flex hover:bg-[rgb(22,24,28)]">
                <div className="mr-6">
                  <div className="h-12 w-12 rounded-full bg-slate-300 p-4" />
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="text-lg font-semibold ">holim</span>
                    <span className="mx-2 text-gray-500">・</span>
                    <span className="text-gray-500 text-sm">22.11.25. 오후 4:31</span>
                  </div>
                  <div>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus...</div>
                </div>
              </a>
            </Link>
          ))}
      </div>
    </Layout>
  );
}
