import { useEffect, useRef } from "react";

type ClickOutsideHandler = (event: MouseEvent) => void;

const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  onClickOutside: ClickOutsideHandler,
) => {
  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      onClickOutside(event);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref, onClickOutside]);
};

export default useClickOutside;
