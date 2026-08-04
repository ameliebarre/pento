"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";

import { PRODUCT_LINKS } from "@/components/products-nav";

const panelVariants = {
  hidden: { x: "-100%" },
  visible: {
    x: 0,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1] as const,
      staggerChildren: 0.15,
      delayChildren: 0.15,
    },
  },
  exit: { x: "-100%", transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const } },
};

const linkVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label="Ouvrir le menu"
        onClick={() => setOpen(true)}
        className="flex items-center justify-center md:hidden"
      >
        <Menu aria-hidden="true" className="size-6" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              aria-hidden="true"
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
            />
            <motion.nav
              key="panel"
              id="mobile-nav-panel"
              aria-label="Menu"
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-background fixed inset-y-0 left-0 z-50 flex w-md flex-col gap-1 p-6 shadow-xl md:hidden"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fermer le menu"
                className="mb-6 flex size-8 items-center justify-center self-end"
              >
                <X aria-hidden="true" className="size-5" />
              </button>
              {PRODUCT_LINKS.map((link) => (
                <motion.div key={link.href} variants={linkVariants}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="font-heading block py-3 text-4xl"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
