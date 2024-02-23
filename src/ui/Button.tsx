import { IconType } from "react-icons";
import { ClipLoader } from "react-spinners";

type ButtonProps = {
  label: string;
  type?: "button" | "reset" | "submit" | undefined;
  Icon?: IconType;
  iconSize?: number;
  iconFill?: string;
  className?: string;
  handleOnClick?: () => void;
  isSubmitting?: boolean;
  isDisabled?: boolean;
};

export default function Button({
  label,
  type = "button",
  Icon,
  iconSize = 25,
  iconFill = "#000000",
  className,
  handleOnClick,
  isSubmitting,
  isDisabled,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={[
        "rounded-md bg-primary px-4 block h-11 text-white cursor-pointer ease-out duration-300",
        "flex items-center flex-row justify-center gap-3",
        "hover:bg-primary-800 active:bg-primary-900",
        "disabled:opacity-50 disabled:hover:bg-primary disabled:cursor-default",
        className,
      ].join(" ")}
      onClick={handleOnClick}
      disabled={isDisabled}
    >
      {isSubmitting ? (
        <ClipLoader size={20} color="#FFFFFF" className="mt-2" />
      ) : (
        <>
          {Icon && <Icon size={iconSize} fill={iconFill} />}
          {label}
        </>
      )}
    </button>
  );
}
