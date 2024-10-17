import { PrismaClient, Prisma } from '@prisma/client'

export type PrismaClientOrTransaction = PrismaClient | Prisma.TransactionClient
