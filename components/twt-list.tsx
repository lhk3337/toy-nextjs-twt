import TwtItem from "./twt-item";
export default function TwtList() {
  return (
    <>
      {Array(5)
        .fill(1)
        .map((_, v) => {
          return (
            <>
              <TwtItem key={v} />
            </>
          );
        })}
    </>
  );
}
