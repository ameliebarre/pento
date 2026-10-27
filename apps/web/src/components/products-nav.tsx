import Link from "next/link";

export const PRODUCT_LINKS = [
  { label: "Products", href: "/products" },
  { label: "Brands & Designers", href: "/brands-and-designers" },
  { label: "Contact", href: "/contact" },
];

export function ProductsNav() {
  return (
    <nav aria-label="Catégories de produits" className="hidden items-center gap-6 md:flex">
      {PRODUCT_LINKS.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className="text-foreground hover:text-foreground/70 text-sm leading-6 uppercase transition-colors"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
