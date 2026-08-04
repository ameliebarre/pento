"use server";

import { redirect } from "next/navigation";

import { APIError } from "better-auth/api";

import { auth } from "@/auth";
import { hitRateLimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/request-ip";

export type AuthActionState = { error?: string } | undefined;
export type ForgotPasswordState = { error?: string; success?: boolean } | undefined;
export type ResetPasswordState = { error?: string; success?: boolean } | undefined;

const RATE_LIMIT_ERROR = "Trop de tentatives. Merci de réessayer dans quelques minutes.";
const LOGIN_EMAIL_LIMIT = { max: 10, windowMs: 10 * 60 * 1000 };
const LOGIN_IP_LIMIT = { max: 30, windowMs: 10 * 60 * 1000 };
const FORGOT_PASSWORD_EMAIL_LIMIT = { max: 3, windowMs: 60 * 60 * 1000 };
const FORGOT_PASSWORD_IP_LIMIT = { max: 10, windowMs: 60 * 60 * 1000 };

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

  try {
    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name: [firstName, lastName].filter(Boolean).join(" ") || email,
        firstName,
        lastName,
      },
    });
  } catch (error) {
    if (error instanceof APIError) {
      return { error: "Un compte existe déjà avec cet email." };
    }
    throw error;
  }

  redirect("/");
}

export async function loginAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const email = String(formData.get("email") ?? "").toLowerCase().trim();
  const password = String(formData.get("password") ?? "");
  const ip = await getClientIp();

  const [emailAllowed, ipAllowed] = await Promise.all([
    hitRateLimit(`login:email:${email}`, LOGIN_EMAIL_LIMIT),
    hitRateLimit(`login:ip:${ip}`, LOGIN_IP_LIMIT),
  ]);
  if (!emailAllowed || !ipAllowed) {
    return { error: RATE_LIMIT_ERROR };
  }

  try {
    await auth.api.signInEmail({ body: { email, password } });
  } catch (error) {
    if (error instanceof APIError) {
      return { error: "Email ou mot de passe incorrect." };
    }
    throw error;
  }

  redirect("/");
}

export async function requestPasswordResetAction(
  _prevState: ForgotPasswordState,
  formData: FormData,
): Promise<ForgotPasswordState> {
  const email = String(formData.get("email") ?? "").toLowerCase().trim();

  if (!email) {
    return { error: "Merci de renseigner votre email." };
  }

  const ip = await getClientIp();
  const [emailAllowed, ipAllowed] = await Promise.all([
    hitRateLimit(`forgot-password:email:${email}`, FORGOT_PASSWORD_EMAIL_LIMIT),
    hitRateLimit(`forgot-password:ip:${ip}`, FORGOT_PASSWORD_IP_LIMIT),
  ]);
  if (!emailAllowed || !ipAllowed) {
    return { error: RATE_LIMIT_ERROR };
  }

  // Better Auth's requestPasswordReset already returns a generic success response
  // whether or not the account exists (with timing-attack mitigation baked in), so
  // we don't need to look the user up ourselves — just forward to it and always
  // report success either way.
  try {
    await auth.api.requestPasswordReset({ body: { email, redirectTo: "/reset-password" } });
  } catch (error) {
    console.error("Password reset request failed", error);
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

  try {
    await auth.api.resetPassword({ body: { newPassword: password, token } });
  } catch (error) {
    if (error instanceof APIError) {
      return { error: "Ce lien de réinitialisation est invalide ou a expiré." };
    }
    throw error;
  }

  return { success: true };
}
