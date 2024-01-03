import Link from "next/link";
import Image from "next/image";

import logo from "../../public/logo.svg";
import NavLink from "@/components/NavLink";

import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const links = [
  { label: "Home", path: "/", targetSegment: null },
  { label: "Catalog", path: "/catalog", targetSegment: "catalog" },
  { label: "Showcase", path: "/showcase", targetSegment: "showcase" },
  { label: "Contact", path: "/contact", targetSegment: "contact" },
];

export default function Navbar() {
  return (
    <div className="sticky top-0 w-full px-[32px] border-b border-[#eee] flex items-center justify-between min-h-[75px]">
      <div className="flex flex-row items-center gap-x-11">
        <Link href="/">
          <Image src={logo} width={150} alt="Pento Logo" />
        </Link>
        <div className="flex gap-x-6">
          {links.map((link, index) => (
            <NavLink key={index} {...link} />
          ))}
        </div>
      </div>
      <div className="flex gap-x-4">
        <MagnifyingGlassIcon className="h-6 w-6 text-black cursor-pointer" />
        <HeartIcon className="h-6 w-6 text-black cursor-pointer" />
        <Link href="/account/register">
          <UserIcon className="h-6 w-6 text-black" />
        </Link>
        <div className="relative cursor-pointer">
          <ShoppingBagIcon className="h-6 w-6 text-black" />
          <span className="flex justify-center min-w-[20px] bg-primary text-white items-baseline rounded-[50px] absolute left-[16px] -top-[5px] p-0 h-[20px] text-xs leading-5">
            0
          </span>
        </div>
      </div>
    </div>
  );
}
