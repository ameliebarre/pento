"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

interface NavLinkProps {
  label: string;
  path: string;
  targetSegment: string | null;
}

export default function NavLink({ label, path, targetSegment }: NavLinkProps) {
  const activeSegment = useSelectedLayoutSegment();
  return (
    <Link
      className={`tracking-wider uppercase text-sm font-medium relative
        ${
          activeSegment === targetSegment
            ? "underline decoration-2 underline-offset-8 text-primary font-semibold"
            : "transition-all duration-500 before:content-[''] before:absolute before:-bottom-1.5 before:left-0 before:w-0 before:h-0.5 before:rounded-full before:opacity-0 before:transition-all before:duration-500 before:bg-black hover:before:w-full hover:before:opacity-100"
        }`}
      href={path}
    >
      {label}
    </Link>
  );
}
