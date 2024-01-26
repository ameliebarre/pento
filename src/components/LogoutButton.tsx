"use client";

import { signOut } from "next-auth/react";
import { RiLogoutCircleRLine as LogoutIcon } from "react-icons/ri";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="flex flex-row items-center gap-x-2 text-xl"
    >
      <LogoutIcon className="text-[20px]" />
      Log out
    </button>
  );
}
