import { Transaction } from '@prisma/client';
import { formatDate } from './utils';

export const groupTransactionsByDate = (transactions: Transaction[]) => {
	const grouped: Record<string, Transaction[]> = {};
	const today = new Date();
	const yesterday = new Date(today);
	yesterday.setDate(yesterday.getDate() - 1);

	transactions.forEach((tx) => {
		let date = formatDate(tx.createdAt);
		if (formatDate(tx.createdAt) === formatDate(today)) {
			date = 'Today';
		} else if (formatDate(tx.createdAt) === formatDate(yesterday)) {
			date = 'Yesterday';
		}
		if (!grouped[date]) {
			grouped[date] = [];
		}
		grouped[date].push(tx);
	});
	return grouped;
};

export const calculateDailyTotals = (transactions: Transaction[]) => {
	return transactions.reduce(
		(totals, tx) => {
			return {
				coins: totals.coins + tx.coinAmount,
				pass: totals.pass + tx.passAmount,
				voucher: totals.voucher + tx.voucherAmount,
			};
		},
		{ coins: 0, pass: 0, voucher: 0 }
	);
};
