import { useState, useEffect } from "react";

export function useInfiniteScroll() {
  const [page, setPage] = useState(1);
  function handleScroll() {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    setPage((p) => p + 1);
  }
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return page;
}
