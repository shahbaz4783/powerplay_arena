import { BalanceEffect, PrismaClient, TransactionType } from '@prisma/client';

export const updateUserXP = async (
	tx: PrismaClient,
	telegramId: string,
	totalXP: number
) => {
	await tx.userProgression.update({
		where: { telegramId },
		data: {
			totalXP: { increment: totalXP },
		},
	});
};

export interface TransactionConfig {
	telegramId: string;
	amount: number;
	type: TransactionType;
	balanceEffect: BalanceEffect;
	description: string;
}
// Example usage of TransactionConfig:

// Example 1: Creating a reward transaction
const rewardConfig: TransactionConfig = {
  telegramId: "user123", 
  amount: 1000,
  type: "REWARD",
  balanceEffect: "INCREMENT",
  description: "Daily login reward"
};

// Example 2: Creating a purchase transaction  
const purchaseConfig: TransactionConfig = {
  telegramId: "user123",
  amount: 500, 
  type: "PURCHASE",
  balanceEffect: "DECREMENT",
  description: "Bought power-up item"
};

// Example 3: Creating a match earnings transaction
const matchConfig: TransactionConfig = {
  telegramId: "user123",
  amount: 250,
  type: "MATCH_EARNINGS", 
  balanceEffect: "INCREMENT",
  description: "Earnings from match #12345"
};

// Usage - no need for additional await since createTransaction already handles it:
// createTransaction(prismaClient, rewardConfig);
// createTransaction(prismaClient, purchaseConfig);
// createTransaction(prismaClient, matchConfig);


export const createTransaction = async (
	tx: PrismaClient,
	config: TransactionConfig
) => {
	const { telegramId, amount, type, balanceEffect, description } = config;

	await tx.transaction.create({
		data: {
			telegramId,
			amount,
			type,
			balanceEffect,
			description,
		},
	});
};

export const createInGameTransaction = async (
	tx: PrismaClient,
	telegramId: string,
	amount: number,
	type: TransactionType,
	balanceEffect: BalanceEffect,
	description: string
) => {
	await tx.transaction.create({
		data: {
			telegramId,
			amount,
			type,
			balanceEffect,
			description,
		},
	});
};
