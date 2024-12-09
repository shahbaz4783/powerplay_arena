import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, response: NextResponse) {
	try {
		return NextResponse.json({ Hello: 'okok' });
	} catch (error) {
		console.error('Error in create-user API route:', error);
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		);
	}
}
