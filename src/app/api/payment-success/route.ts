import { db } from '@/src/lib/db';
import { NextResponse } from 'next/server';

interface PaymentData {
	telegramId: string;
	paymentId: string;
	amount: number;
	itemId: string;
}

export async function POST(request: Request) {
	try {
		const body: PaymentData = await request.json();
		console.log('Received payment data:', body);

		if (!body || typeof body !== 'object') {
			throw new Error('Invalid request body');
		}

		const { telegramId, paymentId, amount, itemId } = body;

		if (!telegramId || !paymentId || !amount || !itemId) {
			throw new Error('Missing required fields');
		}

		// Start a transaction
		const result = await db.$transaction(async (prisma) => {
			const transaction = await prisma.transaction.create({
				data: {
					telegramId,
					voucherAmount: amount,
					type: 'PURCHASE',
					description: '',
					metadata: {
						paymentId,
						itemId,
					},
				},
			});

			return { itemId, transaction };
		});

		return NextResponse.json(result);
	} catch (error) {
		console.error('Request error', error);
		return NextResponse.json(
			{
				error:
					error instanceof Error ? error.message : 'Error processing payment',
			},
			{ status: 400 }
		);
	}
}
