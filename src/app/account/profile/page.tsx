import { signOut, useSession } from "next-auth/react";
import { RiLogoutCircleRLine as LogoutIcon } from "react-icons/ri";

export default function Profile() {
  return (
    <div className="flex flex-row gap-y-24 px-[92px] pt-10">
      <div className="sticky top-0 basis-72">
        <h1 className="text-[32px] font-bold">My account</h1>
        <button
          onClick={() => signOut()}
          className="flex flex-row items-center gap-x-2 text-xl"
        >
          <LogoutIcon className="text-[20px]" />
          Log out
        </button>
      </div>
    </div>
  );
}
