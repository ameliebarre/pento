"use client";

import { useEffect, useRef, useState } from "react";
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

type MobileNavProps = {
  theme?: "light" | "dark";
};

export function MobileNav({ theme = "light" }: MobileNavProps = {}) {
  const [open, setOpen] = useState(false);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  function close() {
    setOpen(false);
    // Restore focus to the button that opened the panel rather than leaving
    // it on a now-hidden element.
    toggleButtonRef.current?.focus();
  }

  useEffect(() => {
    if (!open) return;

    // Move focus into the panel as soon as it opens, so keyboard/screen-reader
    // users land somewhere inside it instead of on whatever was behind it.
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <>
      <button
        ref={toggleButtonRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label="Ouvrir le menu"
        onClick={() => setOpen(true)}
        className={`flex items-center justify-center md:hidden ${theme === "dark" ? "text-white" : "text-foreground"}`}
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
              onClick={close}
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
                ref={closeButtonRef}
                type="button"
                onClick={close}
                aria-label="Fermer le menu"
                className="mb-6 flex size-8 items-center justify-center self-end"
              >
                <X aria-hidden="true" className="size-5" />
              </button>
              {PRODUCT_LINKS.map((link) => (
                <motion.div key={link.label} variants={linkVariants}>
                  <Link
                    href={link.href}
                    onClick={close}
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
