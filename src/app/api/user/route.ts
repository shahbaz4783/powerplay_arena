import { getWalletBalanceById } from '@/src/data/user';
import { NextResponse } from 'next/server';

export async function GET() {
	const data = await getWalletBalanceById(123);
	return NextResponse.json({
		hello: 'world',
	});
}
