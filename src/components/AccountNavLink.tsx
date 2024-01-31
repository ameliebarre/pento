import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import SVGIcon from "./SVGIcon";
import { IconType } from "react-icons";

interface NavLinkProps {
  label: string;
  path: string;
  targetSegment: string | null;
  icon?: IconType;
  className?: string;
}

export default function AdminNavLink({
  label,
  path,
  targetSegment,
  icon,
  className,
}: NavLinkProps) {
  const activeSegment = useSelectedLayoutSegment();
  const isActive = activeSegment === targetSegment;

  return (
    <Link
      className={[
        "select-none flex items-center w-full cursor-pointer px-3 py-4 gap-3",
        className,
        isActive ? "bg-primary-100 rounded-xl" : "bg-transparent",
      ].join(" ")}
      href={path}
    >
      {icon ? (
        <span
          className={[
            "rounded-xl p-2",
            isActive ? "bg-primary fill-white" : "bg-primary-100",
          ].join(" ")}
        >
          <SVGIcon
            icon={icon}
            size={16}
            color={isActive ? "#FFFFFF" : "#A27A60"}
          />
        </span>
      ) : null}
      {label}
    </Link>
  );
}
