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
      className={`tracking-wider uppercase text-sm font-medium ${
        activeSegment === targetSegment
          ? "underline underline-offset-8 text-primary font-semibold"
          : "none"
      }`}
      href={path}
    >
      {label}
    </Link>
  );
}
