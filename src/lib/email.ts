import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function passwordResetEmailHtml(resetLink: string) {
  return `
    <div style="font-family: Helvetica, Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; color: #1a1a1a;">
      <h1 style="font-size: 20px; font-weight: 600; margin-bottom: 16px;">Réinitialisation de votre mot de passe</h1>
      <p style="font-size: 14px; line-height: 1.6; color: #4a4a4a;">
        Vous avez demandé la réinitialisation du mot de passe associé à votre compte Pento.
        Cliquez sur le bouton ci-dessous pour choisir un nouveau mot de passe. Ce lien expire
        dans 1 heure.
      </p>
      <a
        href="${resetLink}"
        style="display: inline-block; margin: 24px 0; padding: 12px 24px; background-color: #1a1a1a; color: #ffffff; font-size: 14px; text-decoration: none; border-radius: 6px;"
      >
        Réinitialiser mon mot de passe
      </a>
      <p style="font-size: 12px; line-height: 1.6; color: #8a8a8a;">
        Si vous n'êtes pas à l'origine de cette demande, vous pouvez ignorer cet email en toute
        sécurité.
      </p>
    </div>
  `;
}

export async function sendPasswordResetEmail(to: string, resetUrl: string) {
  const baseUrl = process.env.AUTH_URL ?? "http://localhost:3000";
  const resetLink = new URL(resetUrl, baseUrl).toString();

  const { error } = await resend.emails.send({
    from: process.env.EMAIL_FROM ?? "Pento <onboarding@resend.dev>",
    to,
    subject: "Réinitialisez votre mot de passe Pento",
    html: passwordResetEmailHtml(resetLink),
  });

  if (error) {
    throw new Error(`Failed to send password reset email: ${error.message}`);
  }
}
