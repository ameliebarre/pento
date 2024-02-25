import { useEffect, useRef } from "react";
import { MdClose as CloseIcon } from "react-icons/md";

import ClientPortal from "./ClientPortal";

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  handleClose: () => void;
};

export default function Modal({ children, isOpen, handleClose }: ModalProps) {
  const nodeRef = useRef<any>(null);

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent): void | null =>
      e.key === "Escape" ? handleClose() : null;

    document.body.addEventListener("keydown", closeOnEscapeKey);

    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  if (!isOpen) return null;

  return (
    <ClientPortal wrapperId="portal-root">
      <div className="fixed inset-0 bg-black bg-opacity-40 flex flex-col justify-center transition delay-300 duration-300 ease-in-out overflow-x-hidden z-999">
        <div className="w-[60%] h-[90%] bg-white mx-auto my-0 flex flex-col items-center">
          <div className="flex justify-end items-end w-full">
            <button onClick={handleClose} className="text-black">
              <CloseIcon size={30} className="m-4" />
            </button>
          </div>
          <div className="w-full overflow-y-auto">{children}</div>
        </div>
      </div>
    </ClientPortal>
  );
}
