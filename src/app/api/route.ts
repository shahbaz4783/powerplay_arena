import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	try {
		// Directly return the NextResponse
		return NextResponse.json({ Hello: 'okok' });
	} catch (error) {
		console.error('Error in create-user API route:', error);
		// Return a JSON response with error status
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		);
	}
}
