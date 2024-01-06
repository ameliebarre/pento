"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { UserIcon } from "@heroicons/react/24/outline";

export default function ProfileIcon() {
  const { data: session, status } = useSession();

  return (
    <Link
      href={`${
        status === "authenticated" ? "/account/profile" : "/account/login"
      }`}
    >
      <UserIcon className="h-6 w-6 text-black" />
    </Link>
  );
}
