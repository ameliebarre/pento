"use server";

import crypto from "crypto";

import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

import { signIn } from "@/auth";
import { sendPasswordResetEmail } from "@/lib/email";
import { prisma } from "@/lib/prisma";

export type AuthActionState = { error?: string } | undefined;
export type ForgotPasswordState = { error?: string; success?: boolean } | undefined;
export type ResetPasswordState = { error?: string; success?: boolean } | undefined;

const RESET_TOKEN_TTL_MS = 1000 * 60 * 60;

export async function signupAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const firstName = String(formData.get("firstName") ?? "");
  const lastName = String(formData.get("lastName") ?? "");
  const email = String(formData.get("email") ?? "").toLowerCase().trim();
  const password = String(formData.get("password") ?? "");

  if (!email || password.length < 8) {
    return { error: "Email invalide ou mot de passe trop court (8 caractères min)." };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "Un compte existe déjà avec cet email." };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: { firstName, lastName, email, passwordHash },
  });

  await signIn("credentials", { email, password, redirectTo: "/" });
}

export async function loginAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Email ou mot de passe incorrect." };
    }
    throw error;
  }
}

export async function requestPasswordResetAction(
  _prevState: ForgotPasswordState,
  formData: FormData,
): Promise<ForgotPasswordState> {
  const email = String(formData.get("email") ?? "").toLowerCase().trim();

  if (!email) {
    return { error: "Merci de renseigner votre email." };
  }

  const user = await prisma.user.findUnique({ where: { email } });

  // Always return a generic success response, whether or not the account exists,
  // so this endpoint can't be used to enumerate registered emails.
  if (!user) {
    return { success: true };
  }

  await prisma.verificationToken.deleteMany({ where: { identifier: email } });

  const token = crypto.randomBytes(32).toString("hex");
  await prisma.verificationToken.create({
    data: { identifier: email, token, expires: new Date(Date.now() + RESET_TOKEN_TTL_MS) },
  });

  try {
    await sendPasswordResetEmail(email, `/reset-password?token=${token}`);
  } catch (error) {
    console.error("Failed to send password reset email", error);
    return { error: "L'envoi de l'email a échoué. Merci de réessayer plus tard." };
  }

  return { success: true };
}

export async function resetPasswordAction(
  _prevState: ResetPasswordState,
  formData: FormData,
): Promise<ResetPasswordState> {
  const token = String(formData.get("token") ?? "");
  const password = String(formData.get("password") ?? "");

  if (password.length < 8) {
    return { error: "Le mot de passe doit contenir au moins 8 caractères." };
  }

  const verificationToken = await prisma.verificationToken.findUnique({ where: { token } });
  if (!verificationToken || verificationToken.expires < new Date()) {
    return { error: "Ce lien de réinitialisation est invalide ou a expiré." };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.update({
    where: { email: verificationToken.identifier },
    data: { passwordHash },
  });

  await prisma.verificationToken.delete({ where: { token } });

  return { success: true };
}
