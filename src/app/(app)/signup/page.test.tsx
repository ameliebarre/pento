// @vitest-environment jsdom

import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock("@/actions/auth", () => ({
  signupAction: vi.fn(),
}));

import { signupAction } from "@/actions/auth";
import { SignupForm as SignupPage } from "@/app/(app)/signup/signup-form";

const mockedSignupAction = vi.mocked(signupAction);

describe("SignupPage", () => {
  it("renders all the signup fields and the submit button", () => {
    render(<SignupPage />);

    expect(screen.getByLabelText("Prénom")).toBeInTheDocument();
    expect(screen.getByLabelText("Nom")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Mot de passe")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Créer mon compte" })).toBeInTheDocument();
  });

  it("submits the entered values to signupAction", async () => {
    mockedSignupAction.mockResolvedValueOnce(undefined);
    const user = userEvent.setup();
    render(<SignupPage />);

    await user.type(screen.getByLabelText("Prénom"), "Ada");
    await user.type(screen.getByLabelText("Nom"), "Lovelace");
    await user.type(screen.getByLabelText("Email"), "ada@example.com");
    await user.type(screen.getByLabelText("Mot de passe"), "password123");
    await user.click(screen.getByRole("button", { name: "Créer mon compte" }));

    await vi.waitFor(() => expect(mockedSignupAction).toHaveBeenCalled());
    const formData = mockedSignupAction.mock.calls[0][1];
    expect(formData.get("firstName")).toBe("Ada");
    expect(formData.get("lastName")).toBe("Lovelace");
    expect(formData.get("email")).toBe("ada@example.com");
    expect(formData.get("password")).toBe("password123");
  });

  it("shows a confirmation message and hides the form on success", async () => {
    mockedSignupAction.mockResolvedValueOnce({ success: true });
    const user = userEvent.setup();
    render(<SignupPage />);

    await user.type(screen.getByLabelText("Email"), "ada@example.com");
    await user.type(screen.getByLabelText("Mot de passe"), "password123");
    await user.click(screen.getByRole("button", { name: "Créer mon compte" }));

    expect(await screen.findByText(/email de confirmation/i)).toBeInTheDocument();
    expect(screen.queryByLabelText("Email")).not.toBeInTheDocument();
  });

  it("shows the error message returned by signupAction", async () => {
    mockedSignupAction.mockResolvedValueOnce({ error: "Impossible de créer le compte. Merci de réessayer." });
    const user = userEvent.setup();
    render(<SignupPage />);

    await user.type(screen.getByLabelText("Email"), "ada@example.com");
    await user.type(screen.getByLabelText("Mot de passe"), "password123");
    await user.click(screen.getByRole("button", { name: "Créer mon compte" }));

    expect(
      await screen.findByText("Impossible de créer le compte. Merci de réessayer."),
    ).toBeInTheDocument();
  });

  it("shows a pending state while the action is in flight", async () => {
    let resolveAction!: (value: undefined) => void;
    mockedSignupAction.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          resolveAction = resolve;
        }),
    );
    const user = userEvent.setup();
    render(<SignupPage />);

    await user.type(screen.getByLabelText("Email"), "ada@example.com");
    await user.type(screen.getByLabelText("Mot de passe"), "password123");
    await user.click(screen.getByRole("button", { name: "Créer mon compte" }));

    expect(await screen.findByRole("button", { name: "Création..." })).toBeDisabled();

    resolveAction(undefined);
    await vi.waitFor(() =>
      expect(screen.getByRole("button", { name: "Créer mon compte" })).not.toBeDisabled(),
    );
  });

  it("links to the login page", () => {
    render(<SignupPage />);

    expect(screen.getByRole("link", { name: "Se connecter" })).toHaveAttribute("href", "/login");
  });
});
