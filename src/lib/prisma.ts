import { PrismaClient } from "../generated/prisma/client";

/**
 * Single Prisma Client instance shared across the application.
 */
export const prisma = new PrismaClient();