"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";

import signOutIcon from "../../public/signout.svg";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="text-xl flex items-center gap-1"
    >
      <Image src={signOutIcon} width={25} alt="Signout icon" />
      Logout
    </button>
  );
}
