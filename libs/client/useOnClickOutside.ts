import { MutableRefObject, useEffect } from "react";

export default function useOnClickOutside(ref: MutableRefObject<HTMLElement | null>, handler: () => void) {
  useEffect(() => {
    const closeDropdown = (e: any) => {
      if (!handler) return;
      if (e.path[0] !== ref.current) {
        handler();
      }
    };
    document.body.addEventListener("click", closeDropdown);
    return () => document.body.removeEventListener("click", closeDropdown);
  }, [ref, handler]);
}
