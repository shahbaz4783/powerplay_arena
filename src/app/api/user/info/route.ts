import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/src/lib/db';

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const telegramId = searchParams.get('telegramId')?.toString();
	const inviteCode = searchParams.get('inviteCode')?.toString();

	if (!telegramId && !inviteCode) {
		return NextResponse.json(
			{ error: 'Either telegramId or inviteCode must be provided' },
			{ status: 400 }
		);
	}

	try {
		const user = await db.user.findUnique({
			where: telegramId ? { telegramId } : { inviteCode },
			select: {
				telegramId: true,
				firstName: true,
				lastName: true,
				username: true,
				inviteCode: true,
			},
		});
		return NextResponse.json(user);
	} catch (error) {
		console.error('Error in GET /api/user/info:', error);
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		);
	}
}
