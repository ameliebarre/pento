import { beforeEach, describe, expect, it, vi } from "vitest";
import { APIError } from "better-auth/api";

vi.mock("@/auth", () => ({
  auth: {
    api: {
      signUpEmail: vi.fn(),
      signInEmail: vi.fn(),
      requestPasswordReset: vi.fn(),
      resetPassword: vi.fn(),
    },
  },
}));

vi.mock("next/headers", () => ({
  headers: vi.fn().mockResolvedValue(new Headers({ "x-forwarded-for": "203.0.113.1" })),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import {
  loginAction,
  requestPasswordResetAction,
  resetPasswordAction,
  signupAction,
} from "@/actions/auth";

const mockedSignUpEmail = vi.mocked(auth.api.signUpEmail);
const mockedSignInEmail = vi.mocked(auth.api.signInEmail);
const mockedRequestPasswordReset = vi.mocked(auth.api.requestPasswordReset);
const mockedResetPassword = vi.mocked(auth.api.resetPassword);
const mockedRedirect = vi.mocked(redirect);

beforeEach(() => {
  mockedSignUpEmail.mockReset();
  mockedSignInEmail.mockReset();
  mockedRequestPasswordReset.mockReset();
  mockedResetPassword.mockReset();
  mockedRedirect.mockReset();
});

describe("requestPasswordResetAction", () => {
  it("returns an error when the email field is empty", async () => {
    const formData = new FormData();
    formData.set("email", "");

    const state = await requestPasswordResetAction(undefined, formData);

    expect(state?.error).toBeDefined();
    expect(state?.success).toBeUndefined();
    expect(mockedRequestPasswordReset).not.toHaveBeenCalled();
  });

  it("forwards the request to Better Auth with a redirect back to /reset-password", async () => {
    const formData = new FormData();
    formData.set("email", "known@example.com");

    const state = await requestPasswordResetAction(undefined, formData);

    expect(state?.success).toBe(true);
    expect(state?.error).toBeUndefined();
    expect(mockedRequestPasswordReset).toHaveBeenCalledWith({
      body: { email: "known@example.com", redirectTo: "/reset-password" },
    });
  });

  it("still returns a generic success when the request fails (no account, send failure, etc.)", async () => {
    mockedRequestPasswordReset.mockRejectedValueOnce(new APIError("BAD_REQUEST"));
    const formData = new FormData();
    formData.set("email", "unknown@example.com");

    const state = await requestPasswordResetAction(undefined, formData);

    expect(state?.success).toBe(true);
    expect(state?.error).toBeUndefined();
  });

  it("rate-limits repeated requests for the same email", async () => {
    const formData = new FormData();
    formData.set("email", "rate-limited@example.com");

    for (let i = 0; i < 3; i++) {
      const state = await requestPasswordResetAction(undefined, formData);
      expect(state?.success).toBe(true);
    }

    const state = await requestPasswordResetAction(undefined, formData);

    expect(state?.error).toBe("Trop de tentatives. Merci de réessayer dans quelques minutes.");
    expect(mockedRequestPasswordReset).toHaveBeenCalledTimes(3);
  });
});

describe("resetPasswordAction", () => {
  it("returns an error when the new password is too short", async () => {
    const formData = new FormData();
    formData.set("token", "irrelevant");
    formData.set("password", "short");

    const state = await resetPasswordAction(undefined, formData);

    expect(state?.error).toBe("Le mot de passe doit contenir au moins 8 caractères.");
    expect(mockedResetPassword).not.toHaveBeenCalled();
  });

  it("returns a friendly error when the token is invalid or expired", async () => {
    mockedResetPassword.mockRejectedValueOnce(new APIError("BAD_REQUEST"));
    const formData = new FormData();
    formData.set("token", "does-not-exist");
    formData.set("password", "newpassword123");

    const state = await resetPasswordAction(undefined, formData);

    expect(state?.error).toBe("Ce lien de réinitialisation est invalide ou a expiré.");
  });

  it("updates the password on success", async () => {
    const formData = new FormData();
    formData.set("token", "valid-token");
    formData.set("password", "newpassword456");

    const state = await resetPasswordAction(undefined, formData);

    expect(state?.success).toBe(true);
    expect(mockedResetPassword).toHaveBeenCalledWith({
      body: { newPassword: "newpassword456", token: "valid-token" },
    });
  });

  it("rethrows errors that aren't APIError", async () => {
    mockedResetPassword.mockRejectedValueOnce(new Error("database down"));
    const formData = new FormData();
    formData.set("token", "valid-token");
    formData.set("password", "newpassword456");

    await expect(resetPasswordAction(undefined, formData)).rejects.toThrow("database down");
  });
});

describe("signupAction", () => {
  it("returns an error and does not call Better Auth when the password is too short", async () => {
    const formData = new FormData();
    formData.set("firstName", "Ada");
    formData.set("lastName", "Lovelace");
    formData.set("email", "ada@example.com");
    formData.set("password", "short");

    const state = await signupAction(undefined, formData);

    expect(state?.error).toBe("Email invalide ou mot de passe trop court (8 caractères min).");
    expect(mockedSignUpEmail).not.toHaveBeenCalled();
  });

  it("returns an error and does not call Better Auth when the email is missing", async () => {
    const formData = new FormData();
    formData.set("firstName", "Ada");
    formData.set("lastName", "Lovelace");
    formData.set("email", "");
    formData.set("password", "password123");

    const state = await signupAction(undefined, formData);

    expect(state?.error).toBe("Email invalide ou mot de passe trop court (8 caractères min).");
    expect(mockedSignUpEmail).not.toHaveBeenCalled();
  });

  it("returns a generic error for unexpected Better Auth failures", async () => {
    mockedSignUpEmail.mockRejectedValueOnce(new APIError("BAD_REQUEST"));
    const formData = new FormData();
    formData.set("firstName", "Ada");
    formData.set("lastName", "Lovelace");
    formData.set("email", "existing@example.com");
    formData.set("password", "password123");

    const state = await signupAction(undefined, formData);

    expect(state?.error).toBe("Impossible de créer le compte. Merci de réessayer.");
    expect(state?.success).toBeUndefined();
  });

  it("signs the user up with the derived name and reports success without redirecting", async () => {
    // Better Auth returns a generic success response here even for a duplicate email
    // (requireEmailVerification is on), so this test also covers that case implicitly:
    // there's no branch in signupAction that distinguishes "new" from "duplicate".
    const formData = new FormData();
    formData.set("firstName", "Ada");
    formData.set("lastName", "Lovelace");
    formData.set("email", "ada.lovelace@example.com");
    formData.set("password", "password123");

    const state = await signupAction(undefined, formData);

    expect(mockedSignUpEmail).toHaveBeenCalledWith({
      body: {
        email: "ada.lovelace@example.com",
        password: "password123",
        name: "Ada Lovelace",
        firstName: "Ada",
        lastName: "Lovelace",
      },
    });
    expect(state?.success).toBe(true);
    expect(mockedRedirect).not.toHaveBeenCalled();
  });
});

describe("loginAction", () => {
  it("signs in with the submitted credentials and redirects home on success", async () => {
    const formData = new FormData();
    formData.set("email", "user@example.com");
    formData.set("password", "password123");

    const state = await loginAction(undefined, formData);

    expect(state).toBeUndefined();
    expect(mockedSignInEmail).toHaveBeenCalledWith({
      body: { email: "user@example.com", password: "password123" },
    });
    expect(mockedRedirect).toHaveBeenCalledWith("/");
  });

  it("returns a friendly error when the credentials are rejected", async () => {
    mockedSignInEmail.mockRejectedValueOnce(new APIError("UNAUTHORIZED"));
    const formData = new FormData();
    formData.set("email", "user@example.com");
    formData.set("password", "wrongpassword");

    const state = await loginAction(undefined, formData);

    expect(state?.error).toBe("Email ou mot de passe incorrect.");
    expect(mockedRedirect).not.toHaveBeenCalled();
  });

  it("returns a dedicated message when the email isn't verified yet", async () => {
    mockedSignInEmail.mockRejectedValueOnce(
      new APIError("FORBIDDEN", { message: "Email not verified", code: "EMAIL_NOT_VERIFIED" }),
    );
    const formData = new FormData();
    formData.set("email", "unverified@example.com");
    formData.set("password", "password123");

    const state = await loginAction(undefined, formData);

    expect(state?.error).toBe(
      "Merci de confirmer votre email avant de vous connecter. Un nouveau lien vient de vous être envoyé.",
    );
    expect(mockedRedirect).not.toHaveBeenCalled();
  });

  it("rethrows errors that are not APIError", async () => {
    mockedSignInEmail.mockRejectedValueOnce(new Error("network down"));
    const formData = new FormData();
    formData.set("email", "user@example.com");
    formData.set("password", "password123");

    await expect(loginAction(undefined, formData)).rejects.toThrow("network down");
  });

  it("rate-limits repeated attempts for the same email", async () => {
    mockedSignInEmail.mockRejectedValue(new APIError("UNAUTHORIZED"));
    const formData = new FormData();
    formData.set("email", "brute-forced@example.com");
    formData.set("password", "wrongpassword");

    for (let i = 0; i < 10; i++) {
      const state = await loginAction(undefined, formData);
      expect(state?.error).toBe("Email ou mot de passe incorrect.");
    }

    const state = await loginAction(undefined, formData);

    expect(state?.error).toBe("Trop de tentatives. Merci de réessayer dans quelques minutes.");
    expect(mockedSignInEmail).toHaveBeenCalledTimes(10);
  });
});
