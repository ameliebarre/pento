import Link from "next/link";

export const PRODUCT_LINKS = [
  { label: "Best Sellers", href: "/products" },
  { label: "Shop", href: "/products" },
  { label: "Articles", href: "/products" },
];

export function ProductsNav() {
  return (
    <nav aria-label="Catégories de produits" className="hidden items-center gap-4 text-sm md:flex">
      {PRODUCT_LINKS.map((link) => (
        <Link key={link.href} href={link.href}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
