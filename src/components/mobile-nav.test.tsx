// @vitest-environment jsdom

import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    onClick,
  }: {
    children: React.ReactNode;
    href: string;
    onClick?: () => void;
  }) => (
    <a
      href={href}
      onClick={(event) => {
        event.preventDefault();
        onClick?.();
      }}
    >
      {children}
    </a>
  ),
}));

import { MobileNav } from "@/components/mobile-nav";
import { PRODUCT_LINKS } from "@/components/products-nav";

describe("MobileNav", () => {
  it("is closed by default", () => {
    render(<MobileNav />);

    expect(screen.getByRole("button", { name: "Ouvrir le menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    expect(screen.queryByRole("navigation", { name: "Menu" })).not.toBeInTheDocument();
  });

  it("opens the panel with every category link when clicking the trigger", async () => {
    const user = userEvent.setup();
    render(<MobileNav />);

    await user.click(screen.getByRole("button", { name: "Ouvrir le menu" }));

    expect(screen.getByRole("button", { name: "Ouvrir le menu" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    const panel = screen.getByRole("navigation", { name: "Menu" });
    for (const link of PRODUCT_LINKS) {
      expect(within(panel).getByRole("link", { name: link.label })).toHaveAttribute(
        "href",
        link.href,
      );
    }
  });

  it("closes the panel when clicking the close button", async () => {
    const user = userEvent.setup();
    render(<MobileNav />);

    await user.click(screen.getByRole("button", { name: "Ouvrir le menu" }));
    await user.click(screen.getByRole("button", { name: "Fermer le menu" }));

    await waitFor(() => {
      expect(screen.queryByRole("navigation", { name: "Menu" })).not.toBeInTheDocument();
    });
  });

  it("closes the panel when pressing Escape", async () => {
    const user = userEvent.setup();
    render(<MobileNav />);

    await user.click(screen.getByRole("button", { name: "Ouvrir le menu" }));
    expect(screen.getByRole("navigation", { name: "Menu" })).toBeInTheDocument();

    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(screen.queryByRole("navigation", { name: "Menu" })).not.toBeInTheDocument();
    });
  });

  it("closes the panel when a category link is clicked", async () => {
    const user = userEvent.setup();
    render(<MobileNav />);

    await user.click(screen.getByRole("button", { name: "Ouvrir le menu" }));
    await user.click(screen.getByRole("link", { name: PRODUCT_LINKS[0].label }));

    await waitFor(() => {
      expect(screen.queryByRole("navigation", { name: "Menu" })).not.toBeInTheDocument();
    });
  });
});
