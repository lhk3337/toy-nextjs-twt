import { Toggle } from "@pages/tweet/[id]";
import { Dispatch, MutableRefObject, SetStateAction, useEffect } from "react";

export default function useOnClickOutside(
  ref: MutableRefObject<HTMLElement | null>,
  handler?: () => void, //useState를 리턴하는 함수를 매개변수로 받아옴
  setState?: Dispatch<SetStateAction<Toggle>>, // useState를 매개변수로 받아옴, setState를 설정할때 event를 사용하기 위해 매개변수로 설정
  isDel?: boolean // answer 삭제 버튼 모달 창인지 아닌지 식별
) {
  useEffect(() => {
    const closeDropdown = (e: any) => {
      if (isDel) {
        if (e.composedPath[0] !== ref.current) {
          if (e.target.id === "") {
            // 해당 삭제모달버튼 id
            // 해당 삭제 모달 버튼 외에는 id를 설정하지 않음, 다른 곳을 클릭 하면 공백으로 확인 되어 조건에 id가 공백이면 setState작동(삭제 모달이 close됨)
            setState && setState({ [e.target.id]: false });
          }
        }
      } else {
        if (!handler) return;
        if (e.composedPath[0] !== ref.current) {
          handler();
        }
      }
    };
    document.body.addEventListener("click", closeDropdown);
    return () => document.body.removeEventListener("click", closeDropdown);
  }, [ref, handler, setState]);
}
