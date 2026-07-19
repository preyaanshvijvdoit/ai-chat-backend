import { Resend } from "resend";

import { env } from "../config/env";

const resend = new Resend(env.RESEND_API_KEY);

/**
 * Service responsible for sending emails.
 */
export const mailService = {
  /**
   * Send email verification link.
   */
  async sendVerificationEmail(
    email: string,
    name: string,
    token: string
  ): Promise<void> {
    const verificationUrl =
      `${env.CLIENT_URL}/verify-email?token=${token}`;

    await resend.emails.send({
      from: env.EMAIL_FROM,
      to: email,
      subject: "Verify your email address",
      html: `
        <h2>Welcome, ${name}!</h2>

        <p>Thank you for registering.</p>

        <p>Please click the button below to verify your email.</p>

        <a
          href="${verificationUrl}"
          style="
            display:inline-block;
            padding:12px 24px;
            background:#2563eb;
            color:white;
            text-decoration:none;
            border-radius:6px;
          "
        >
          Verify Email
        </a>

        <p>This link will expire in 24 hours.</p>
      `,
    });
  },

  /**
   * Send password reset email.
   */
  async sendPasswordResetEmail(
    email: string,
    token: string
  ): Promise<void> {
    const resetLink =
      `${env.CLIENT_URL}/reset-password?token=${token}`;

    await resend.emails.send({
      from: env.EMAIL_FROM,
      to: email,
      subject: "Reset your password",
      html: `
        <h2>Password Reset</h2>

        <p>Click the button below to reset your password.</p>

        <a
          href="${resetLink}"
          style="
            display:inline-block;
            padding:12px 20px;
            background:#2563eb;
            color:white;
            text-decoration:none;
            border-radius:6px;
          "
        >
          Reset Password
        </a>

        <p>This link will expire in 1 hour.</p>

        <p>If you didn't request a password reset, you can safely ignore this email.</p>
      `,
    });
  },
};