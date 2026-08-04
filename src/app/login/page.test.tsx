// @vitest-environment jsdom

import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock("@/actions/auth", () => ({
  loginAction: vi.fn(),
}));

import { loginAction } from "@/actions/auth";
import LoginPage from "@/app/login/page";

const mockedLoginAction = vi.mocked(loginAction);

describe("LoginPage", () => {
  it("renders the email and password fields and the submit button", () => {
    render(<LoginPage />);

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Mot de passe")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument();
  });

  it("submits the entered credentials to loginAction", async () => {
    mockedLoginAction.mockResolvedValueOnce(undefined);
    const user = userEvent.setup();
    render(<LoginPage />);

    await user.type(screen.getByLabelText("Email"), "user@example.com");
    await user.type(screen.getByLabelText("Mot de passe"), "password123");
    await user.click(screen.getByRole("button", { name: "Sign in" }));

    await waitFor(() => expect(mockedLoginAction).toHaveBeenCalled());
    const formData = mockedLoginAction.mock.calls[0][1];
    expect(formData.get("email")).toBe("user@example.com");
    expect(formData.get("password")).toBe("password123");
  });

  it("shows the error message returned by loginAction", async () => {
    mockedLoginAction.mockResolvedValueOnce({ error: "Email ou mot de passe incorrect." });
    const user = userEvent.setup();
    render(<LoginPage />);

    await user.type(screen.getByLabelText("Email"), "user@example.com");
    await user.type(screen.getByLabelText("Mot de passe"), "wrongpassword");
    await user.click(screen.getByRole("button", { name: "Sign in" }));

    expect(await screen.findByText("Email ou mot de passe incorrect.")).toBeInTheDocument();
  });

  it("shows a pending state while the action is in flight", async () => {
    let resolveAction!: (value: undefined) => void;
    mockedLoginAction.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          resolveAction = resolve;
        }),
    );
    const user = userEvent.setup();
    render(<LoginPage />);

    await user.type(screen.getByLabelText("Email"), "user@example.com");
    await user.type(screen.getByLabelText("Mot de passe"), "password123");
    await user.click(screen.getByRole("button", { name: "Sign in" }));

    expect(await screen.findByRole("button", { name: "Signing in..." })).toBeDisabled();

    resolveAction(undefined);
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Sign in" })).not.toBeDisabled(),
    );
  });

  it("links to the signup and forgot-password pages", () => {
    render(<LoginPage />);

    expect(screen.getByRole("link", { name: "Créer un compte" })).toHaveAttribute(
      "href",
      "/signup",
    );
    expect(screen.getByRole("link", { name: "Mot de passe oublié ?" })).toHaveAttribute(
      "href",
      "/forgot-password",
    );
  });
});
