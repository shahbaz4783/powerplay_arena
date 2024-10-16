import { db } from "../lib/db";

export async function getWalletByUserId(userId: bigint) {
  return db.wallet.findUnique({ where: { userId } });
}

export async function createWallet(userId: bigint, initialBalance: number = 0) {
  return db.wallet.create({
    data: { userId, balance: initialBalance },
  });
}

export async function updateWalletBalance(userId: bigint, amount: number) {
  return db.wallet.update({
    where: { userId },
    data: { balance: { increment: amount } },
  });
}
