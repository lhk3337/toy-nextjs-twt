import { useState, useEffect } from "react";

export function useInfiniteScroll() {
  const [page, setPage] = useState(1);
  function handleScroll() {
    const { scrollTop, offsetHeight } = document.documentElement;
    if (window.innerHeight + scrollTop >= offsetHeight) {
      setPage((p) => p + 1);
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return page;
}
