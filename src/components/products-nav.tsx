import Link from "next/link";

export const PRODUCT_LINKS = [
  { label: "À propos", href: "/about" },
  { label: "Catalogue", href: "/products" },
  { label: "Articles", href: "/articles" },
  { label: "Contact", href: "contact" },
];

type ProductsNavProps = {
  theme?: "light" | "dark";
};

export function ProductsNav({ theme = "light" }: ProductsNavProps = {}) {
  return (
    <nav aria-label="Catégories de produits" className="hidden items-center gap-4 text-sm md:flex">
      {PRODUCT_LINKS.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className={`text-sm leading-4 uppercase ${theme === "dark" ? "text-white" : "text-foreground"}`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
