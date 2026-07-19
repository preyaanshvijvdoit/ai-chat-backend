import { OAuth2Client } from "google-auth-library";

import { env } from "../config/env";

const client = new OAuth2Client(
  env.GOOGLE_CLIENT_ID
);

/**
 * Information extracted from Google's ID token.
 */
export interface GoogleUser {
  googleId: string;
  email: string;
  name: string;
  picture?: string;
}

import { AppError } from "../utils/app-error";
import { HTTP_STATUS } from "../constants/http-status";

/**
 * Service responsible for verifying Google ID tokens.
 */
export const googleService = {
  /**
   * Verify a Google ID token and return
   * the authenticated Google user.
   */
  async verifyIdToken(
    idToken: string
  ): Promise<GoogleUser> {
    const ticket =
      await client.verifyIdToken({
        idToken,
        audience: env.GOOGLE_CLIENT_ID,
      });

    const payload = ticket.getPayload();

    if (!payload) {
    throw new AppError(
        HTTP_STATUS.UNAUTHORIZED,
        "Invalid Google ID token."
    );
    }

    return {
      googleId: payload.sub,
      email: payload.email!,
      name: payload.name!,
      picture: payload.picture,
    };
  },
};