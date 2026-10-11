"use client";

import { createContext, useContext, useTransition } from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

type FiltersNavigationContextValue = {
  navigate: (href: string) => void;
  isPending: boolean;
};

const FiltersNavigationContext = createContext<FiltersNavigationContextValue | null>(null);

// Centralizes filter navigation so every control shares one pending state.
// That's what actually prevents the race a previous attempt at this hit:
// firing router.push from several filters in quick succession let a later
// navigation's RSC fetch resolve before an earlier one, silently dropping
// the earlier filter. Disabling every filter control while isPending is
// true makes a second click physically impossible until the first
// navigation settles, instead of letting them race.
export function FiltersNavigationProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const navigate = (href: string) => {
    startTransition(() => {
      router.push(href, { scroll: false });
    });
  };

  return (
    <FiltersNavigationContext.Provider value={{ navigate, isPending }}>
      {children}
    </FiltersNavigationContext.Provider>
  );
}

export function useFiltersNavigation() {
  const context = useContext(FiltersNavigationContext);
  if (!context) {
    throw new Error("useFiltersNavigation must be used within a FiltersNavigationProvider");
  }
  return context;
}

type FiltersNavigationLinkProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
  "aria-pressed"?: boolean;
  role?: string;
};

// A button styled and behaving like the filter links it replaces, routed
// through the shared transition instead of a real navigation.
export function FiltersNavigationLink({ href, className, children, ...props }: FiltersNavigationLinkProps) {
  const { navigate, isPending } = useFiltersNavigation();
  return (
    <button type="button" disabled={isPending} onClick={() => navigate(href)} className={className} {...props}>
      {children}
    </button>
  );
}

export function FiltersPendingGroup({ children }: { children: React.ReactNode }) {
  const { isPending } = useFiltersNavigation();
  return (
    <div
      className={cn(
        "flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10 transition-opacity duration-150",
        isPending && "pointer-events-none opacity-50",
      )}
    >
      {children}
    </div>
  );
}
