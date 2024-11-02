// import { db } from "../lib/db";

// export async function getWalletByUserId(userId: bigint) {
//   return db.wallet.findUnique({ where: { userId } });
// }

// export async function createWallet(userId: bigint, initialBalance: number = 0) {
//   return db.wallet.create({
//     data: { userId, balance: initialBalance },
//   });
// }

// export async function updateWalletBalance(telegramId: number, amount: number, operation: 'increment' | 'decrement') {
//   if (operation !== 'increment' && operation !== 'decrement') {
//     throw new Error('Invalid operation type');
//   }

//   return db.wallet.update({
//     where: { userId: telegramId },
//     data: { balance: { [operation]: amount } },
//   });
// }
