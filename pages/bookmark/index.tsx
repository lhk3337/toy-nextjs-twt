import Layout from "@components/layout";
import TwtList from "@components/twt-list";
export default function Bookmarks() {
  const fakeData = [
    { id: 1, name: "holim", date: "22.11.25. 오후 4:31", text: "hello world" },
    { id: 2, name: "martin", date: "22.11.20. 오후 4:31", text: "before and after being denied dino" },
    { id: 3, name: "katie", date: "22.10.02. 오전 4:31", text: "A Few Humble Cinema Lovers" },
  ];
  return (
    <Layout title="Bookmark">
      <TwtList data={fakeData} />
    </Layout>
  );
}
