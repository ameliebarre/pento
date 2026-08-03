import { beforeEach, describe, expect, it, vi } from "vitest";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

vi.mock("@/auth", () => ({
  signIn: vi.fn(),
  signOut: vi.fn(),
  auth: vi.fn(),
}));

vi.mock("next-auth", () => ({
  AuthError: class AuthError extends Error {},
}));

vi.mock("@/lib/email", () => ({
  sendPasswordResetEmail: vi.fn(),
}));

import { signIn } from "@/auth";
import {
  loginAction,
  requestPasswordResetAction,
  resetPasswordAction,
  signupAction,
} from "@/actions/auth";
import { sendPasswordResetEmail } from "@/lib/email";
import { prisma } from "@/lib/prisma";

const mockedSignIn = vi.mocked(signIn);
const mockedSendPasswordResetEmail = vi.mocked(sendPasswordResetEmail);

beforeEach(() => {
  mockedSignIn.mockReset();
  mockedSendPasswordResetEmail.mockReset();
});

async function createUser(email: string, password = "oldpassword123") {
  const passwordHash = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: { email, passwordHash, firstName: "Test", lastName: "User" },
  });
}

describe("requestPasswordResetAction", () => {
  it("returns an error when the email field is empty", async () => {
    const formData = new FormData();
    formData.set("email", "");

    const state = await requestPasswordResetAction(undefined, formData);

    expect(state?.error).toBeDefined();
    expect(state?.success).toBeUndefined();
    expect(mockedSendPasswordResetEmail).not.toHaveBeenCalled();
  });

  it("returns a generic success and sends no email when no account matches", async () => {
    const formData = new FormData();
    formData.set("email", "unknown@example.com");

    const state = await requestPasswordResetAction(undefined, formData);

    expect(state?.success).toBe(true);
    expect(state?.error).toBeUndefined();
    expect(mockedSendPasswordResetEmail).not.toHaveBeenCalled();
  });

  it("creates a verification token and emails a reset link for a known email", async () => {
    const user = await createUser("known@example.com");
    const formData = new FormData();
    formData.set("email", user.email!);

    const state = await requestPasswordResetAction(undefined, formData);

    expect(state?.error).toBeUndefined();
    expect(state?.success).toBe(true);
    expect(mockedSendPasswordResetEmail).toHaveBeenCalledTimes(1);

    const [emailedTo, resetUrl] = mockedSendPasswordResetEmail.mock.calls[0];
    expect(emailedTo).toBe(user.email);
    expect(resetUrl).toMatch(/^\/reset-password\?token=.+/);

    const token = resetUrl.split("token=")[1];
    const stored = await prisma.verificationToken.findUnique({ where: { token } });
    expect(stored?.identifier).toBe(user.email);
    expect(stored?.expires.getTime()).toBeGreaterThan(Date.now());
  });

  it("invalidates any previous token when requested again", async () => {
    const user = await createUser("repeat@example.com");
    const formData = new FormData();
    formData.set("email", user.email!);

    await requestPasswordResetAction(undefined, formData);
    await requestPasswordResetAction(undefined, formData);

    expect(mockedSendPasswordResetEmail).toHaveBeenCalledTimes(2);
    const firstToken = mockedSendPasswordResetEmail.mock.calls[0][1].split("token=")[1];
    const secondToken = mockedSendPasswordResetEmail.mock.calls[1][1].split("token=")[1];

    expect(firstToken).not.toBe(secondToken);
    await expect(
      prisma.verificationToken.findUnique({ where: { token: firstToken } }),
    ).resolves.toBeNull();
    await expect(
      prisma.verificationToken.findUnique({ where: { token: secondToken } }),
    ).resolves.not.toBeNull();
  });

  it("returns an error and does not crash when the email fails to send", async () => {
    mockedSendPasswordResetEmail.mockRejectedValueOnce(new Error("Resend is down"));
    const user = await createUser("undeliverable@example.com");
    const formData = new FormData();
    formData.set("email", user.email!);

    const state = await requestPasswordResetAction(undefined, formData);

    expect(state?.success).toBeUndefined();
    expect(state?.error).toBe("L'envoi de l'email a échoué. Merci de réessayer plus tard.");
  });
});

describe("resetPasswordAction", () => {
  it("returns an error when the new password is too short", async () => {
    const formData = new FormData();
    formData.set("token", "irrelevant");
    formData.set("password", "short");

    const state = await resetPasswordAction(undefined, formData);

    expect(state?.error).toBe("Le mot de passe doit contenir au moins 8 caractères.");
  });

  it("returns an error when the token does not exist", async () => {
    const formData = new FormData();
    formData.set("token", "does-not-exist");
    formData.set("password", "newpassword123");

    const state = await resetPasswordAction(undefined, formData);

    expect(state?.error).toBe("Ce lien de réinitialisation est invalide ou a expiré.");
  });

  it("returns an error when the token is expired", async () => {
    const user = await createUser("expired@example.com");
    await prisma.verificationToken.create({
      data: { identifier: user.email!, token: "expired-token", expires: new Date(Date.now() - 1000) },
    });

    const formData = new FormData();
    formData.set("token", "expired-token");
    formData.set("password", "newpassword123");

    const state = await resetPasswordAction(undefined, formData);

    expect(state?.error).toBe("Ce lien de réinitialisation est invalide ou a expiré.");
  });

  it("updates the password and consumes the token on success", async () => {
    const user = await createUser("resettable@example.com", "oldpassword123");
    await prisma.verificationToken.create({
      data: {
        identifier: user.email!,
        token: "valid-token",
        expires: new Date(Date.now() + 1000 * 60 * 60),
      },
    });

    const formData = new FormData();
    formData.set("token", "valid-token");
    formData.set("password", "newpassword456");

    const state = await resetPasswordAction(undefined, formData);

    expect(state?.success).toBe(true);

    const updated = await prisma.user.findUnique({ where: { email: user.email! } });
    expect(await bcrypt.compare("newpassword456", updated!.passwordHash!)).toBe(true);
    expect(await bcrypt.compare("oldpassword123", updated!.passwordHash!)).toBe(false);

    await expect(
      prisma.verificationToken.findUnique({ where: { token: "valid-token" } }),
    ).resolves.toBeNull();
  });

  it("rejects reusing an already-consumed token", async () => {
    const user = await createUser("onceonly@example.com");
    await prisma.verificationToken.create({
      data: {
        identifier: user.email!,
        token: "single-use-token",
        expires: new Date(Date.now() + 1000 * 60 * 60),
      },
    });

    const formData = new FormData();
    formData.set("token", "single-use-token");
    formData.set("password", "firstattempt1");
    await resetPasswordAction(undefined, formData);

    const secondFormData = new FormData();
    secondFormData.set("token", "single-use-token");
    secondFormData.set("password", "secondattempt2");
    const secondState = await resetPasswordAction(undefined, secondFormData);

    expect(secondState?.error).toBe("Ce lien de réinitialisation est invalide ou a expiré.");
  });
});

describe("signupAction", () => {
  it("returns an error and creates no user when the password is too short", async () => {
    const formData = new FormData();
    formData.set("firstName", "Ada");
    formData.set("lastName", "Lovelace");
    formData.set("email", "ada@example.com");
    formData.set("password", "short");

    const state = await signupAction(undefined, formData);

    expect(state?.error).toBe("Email invalide ou mot de passe trop court (8 caractères min).");
    await expect(prisma.user.findUnique({ where: { email: "ada@example.com" } })).resolves.toBeNull();
    expect(mockedSignIn).not.toHaveBeenCalled();
  });

  it("returns an error and creates no user when the email is missing", async () => {
    const formData = new FormData();
    formData.set("firstName", "Ada");
    formData.set("lastName", "Lovelace");
    formData.set("email", "");
    formData.set("password", "password123");

    const state = await signupAction(undefined, formData);

    expect(state?.error).toBe("Email invalide ou mot de passe trop court (8 caractères min).");
    expect(mockedSignIn).not.toHaveBeenCalled();
  });

  it("returns an error when an account already exists for that email", async () => {
    await createUser("existing@example.com");
    const formData = new FormData();
    formData.set("firstName", "Ada");
    formData.set("lastName", "Lovelace");
    formData.set("email", "existing@example.com");
    formData.set("password", "password123");

    const state = await signupAction(undefined, formData);

    expect(state?.error).toBe("Un compte existe déjà avec cet email.");
    expect(mockedSignIn).not.toHaveBeenCalled();
  });

  it("creates the user with a hashed password and signs them in", async () => {
    mockedSignIn.mockResolvedValueOnce(undefined);
    const formData = new FormData();
    formData.set("firstName", "Ada");
    formData.set("lastName", "Lovelace");
    formData.set("email", "ada.lovelace@example.com");
    formData.set("password", "password123");

    await signupAction(undefined, formData);

    const created = await prisma.user.findUnique({ where: { email: "ada.lovelace@example.com" } });
    expect(created?.firstName).toBe("Ada");
    expect(created?.lastName).toBe("Lovelace");
    expect(created?.passwordHash).not.toBe("password123");
    expect(await bcrypt.compare("password123", created!.passwordHash!)).toBe(true);

    expect(mockedSignIn).toHaveBeenCalledWith("credentials", {
      email: "ada.lovelace@example.com",
      password: "password123",
      redirectTo: "/",
    });
  });
});

describe("loginAction", () => {
  it("signs in with the submitted credentials and returns no error on success", async () => {
    mockedSignIn.mockResolvedValueOnce(undefined);
    const formData = new FormData();
    formData.set("email", "user@example.com");
    formData.set("password", "password123");

    const state = await loginAction(undefined, formData);

    expect(state).toBeUndefined();
    expect(mockedSignIn).toHaveBeenCalledWith("credentials", {
      email: "user@example.com",
      password: "password123",
      redirectTo: "/",
    });
  });

  it("returns a friendly error when the credentials are rejected", async () => {
    mockedSignIn.mockRejectedValueOnce(new AuthError("Invalid credentials"));
    const formData = new FormData();
    formData.set("email", "user@example.com");
    formData.set("password", "wrongpassword");

    const state = await loginAction(undefined, formData);

    expect(state?.error).toBe("Email ou mot de passe incorrect.");
  });

  it("rethrows errors that are not AuthError", async () => {
    mockedSignIn.mockRejectedValueOnce(new Error("network down"));
    const formData = new FormData();
    formData.set("email", "user@example.com");
    formData.set("password", "password123");

    await expect(loginAction(undefined, formData)).rejects.toThrow("network down");
  });
});
