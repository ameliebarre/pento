import Link from "next/link";

const PRODUCT_LINKS = [
  { label: "Shop All", href: "/products" },
  { label: "Sofas", href: "/products/sofas" },
  { label: "Armchairs", href: "/products/armchairs" },
  { label: "Chairs", href: "/products/chairs" },
  { label: "Tables", href: "/products/tables" },
  { label: "Lighting", href: "/products/lighting" },
];

export function ProductsNav() {
  return (
    <nav className="flex items-center gap-8 text-sm">
      {PRODUCT_LINKS.map((link) => (
        <Link key={link.href} href={link.href}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
