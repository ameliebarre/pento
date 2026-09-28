import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";

import { FacebookIcon, InstagramIcon } from "@/components/social-icons";

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com", icon: InstagramIcon },
  { label: "Facebook", href: "https://facebook.com", icon: FacebookIcon },
  { label: "X (Twitter)", href: "https://x.com", icon: X },
];

const FOOTER_COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "Chairs", href: "/products/chairs" },
      { label: "Armchairs", href: "/products/armchairs" },
      { label: "Sofas", href: "/products/sofas" },
      { label: "Tables", href: "/products/tables" },
      { label: "Lighting", href: "/products/lighting" },
      { label: "Accessories", href: "/products/accessoiries" },
    ],
  },
  {
    title: "Maison",
    links: [
      { label: "Our Story", href: "#" },
      { label: "The Designers", href: "#" },
      { label: "Craftsmanship", href: "#" },
      { label: "Showroom", href: "#" },
      { label: "Journal", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact", href: "#" },
      { label: "Shipping & Delivery", href: "#" },
      { label: "Returns", href: "#" },
      { label: "Authenticity", href: "#" },
      { label: "FAQ", href: "#" },
    ],
  },
];

const LEGAL_LINKS = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Cookies", href: "#" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1C1813] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-6">
            <Link href="/">
              <Image
                src="/logo-pento-white.svg"
                alt="Pento"
                width={150}
                height={40}
                className="max-w-40"
              />
            </Link>
            <p className="max-w-xs text-sm text-white/60">
              Curators of iconic design furniture since 1965. Bringing history&apos;s greatest
              pieces into contemporary homes.
            </p>
            <ul className="flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex size-10 items-center justify-center rounded-full border border-white/25 text-white/80 transition-colors hover:border-white/50 hover:text-white"
                  >
                    <social.icon aria-hidden="true" className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title} className="flex flex-col gap-4">
              <p className="text-sm font-medium tracking-wide text-white/50 uppercase">
                {column.title}
              </p>
              <ul className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/80 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/50">© {year} Pento. All rights reserved.</p>
          <ul className="flex items-center gap-6">
            {LEGAL_LINKS.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="text-sm text-white/50 hover:text-white/80">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
