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
};