import Link from "next/link";
import Image from "next/image";

import logo from "../../public/logo.svg";
import NavLink from "@/components/NavLink";

import { LiaShoppingBagSolid as CartIcon } from "react-icons/lia";
import { RxHeart as FavIcon } from "react-icons/rx";
import { FiSearch as SearchIcon } from "react-icons/fi";

const links = [
  { label: "Home", path: "/", targetSegment: null },
  { label: "Catalog", path: "/catalog", targetSegment: "catalog" },
  { label: "Showcase", path: "/showcase", targetSegment: "showcase" },
  { label: "Contact", path: "/contact", targetSegment: "contact" },
];

export default function Navbar() {
  return (
    <div className="absolute w-full flex items-center justify-between">
      <div className="flex flex-row items-center gap-x-16">
        <Link href="/">
          <Image src={logo} width={170} alt="Pento Logo" />
        </Link>
        <div className="flex gap-x-10">
          {links.map((link, index) => (
            <NavLink key={index} {...link} />
          ))}
        </div>
      </div>
      <div className="flex gap-x-3">
        <SearchIcon size={25} className="cursor-pointer" />
        <FavIcon size={25} className="cursor-pointer" />
        <div className="relative cursor-pointer">
          <CartIcon size={25} />
          {/* <div className="text-sm">
            My bag <span>(0)</span>
          </div> */}
          <span className="flex justify-center min-w-[20px] bg-primary text-white items-baseline rounded-[50px] absolute left-[16px] -top-[5px] p-0 h-[20px] text-xs leading-5">
            0
          </span>
        </div>
      </div>
    </div>
  );
}
