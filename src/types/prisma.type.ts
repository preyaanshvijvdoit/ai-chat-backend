import { Prisma, PrismaClient } from "../generated/prisma/client";
/**
 * Represents either the default Prisma client
 * or a Prisma transaction client.
 *
 * Repository methods accept this type so they
 * can participate in database transactions
 * without duplicating queries.
 */
export type PrismaDbClient =
  | PrismaClient
  | Prisma.TransactionClient;