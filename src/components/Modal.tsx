import { useEffect } from "react";

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  handleClose: () => void;
};

export default function Modal({ children, isOpen, handleClose }: ModalProps) {
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
    <div className="fixed inset-0 bg-black bg-opacity-40 flex flex-col justify-center transition delay-300 duration-300 ease-in-out overflow-hidden z-999 pt-[40px] px-[20px]">
      <div className="w-[60%] h-[70%] bg-white mx-auto my-0 text-white flex flex-col items-center text-[2rem]">
        <div className="flex justify-end items-end w-full">
          <button onClick={handleClose} className="text-black">
            Close
          </button>
        </div>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
