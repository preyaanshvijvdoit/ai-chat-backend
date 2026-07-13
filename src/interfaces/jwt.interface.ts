import { UserRole } from "../generated/prisma/enums";

/**
 * Payload stored inside JWT tokens.
 */
export interface JwtPayload {
  userId: string;
  role: UserRole;
}