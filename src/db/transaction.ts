import { Prisma, TransactionStatus } from '@prisma/client';
import { db } from '../lib/db';

export async function createTransaction(data: Prisma.TransactionCreateInput) {
  return db.transaction.create({ data });
}

export async function getTransactionsByUserId(userId: bigint, limit: number = 10) {
  return db.transaction.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
}

export async function updateTransactionStatus(id: string, status: TransactionStatus) {
  return db.transaction.update({
    where: { id },
    data: { status },
  });
}

export async function getTransactionsSummary(userId: bigint) {
  return db.transaction.groupBy({
    by: ['type'],
    where: { userId },
    _sum: { amount: true },
  });
}