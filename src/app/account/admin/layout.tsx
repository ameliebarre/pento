"use client";

import AdminNavLink from "@/components/AccountNavLink";
import { IconType } from "react-icons";
import { IoHome as HomeIcon } from "react-icons/io5";
import { MdCategory as CategoryIcon } from "react-icons/md";
import { ImUsers as UsersIcon } from "react-icons/im";
import { RiShoppingCart2Fill as ProductsIcon } from "react-icons/ri";
import LogoutButton from "@/components/LogoutButton";

type Link = {
  id: number;
  label: string;
  path: string;
  targetSegment: string | null;
  icon?: IconType;
};

const links: Link[] = [
  {
    id: 1,
    label: "Dashboard",
    path: "/account/admin",
    targetSegment: null,
    icon: HomeIcon,
  },
  {
    id: 2,
    label: "Categories",
    path: "/account/admin/categories",
    targetSegment: "categories",
    icon: CategoryIcon,
  },
  {
    id: 3,
    label: "Users",
    path: "/account/admin/users",
    targetSegment: "users",
    icon: UsersIcon,
  },
  {
    id: 4,
    label: "Products",
    path: "/account/admin/products",
    targetSegment: "products",
    icon: ProductsIcon,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row gap-x-24 px-[92px] pt-10">
      <aside className="sticky top-0 min-w-[260px]">
        <ul className="flex flex-col gap-y-3 mb-4">
          {links.map((link, index) => (
            <li key={link.id}>
              <AdminNavLink key={index} {...link} />
            </li>
          ))}
        </ul>
        <LogoutButton />
      </aside>
      <main className="w-full">{children}</main>
    </div>
  );
}
