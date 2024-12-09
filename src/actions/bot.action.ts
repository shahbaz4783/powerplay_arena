'use server';

import { bot } from "../lib/bot";


export async function handleUpdate(request: Request) {
	if (request.method === 'POST') {
		const update = await request.json();
		await bot.handleUpdate(update);
		return new Response('OK', { status: 200 });
	}
	return new Response('Method not allowed', { status: 405 });
}
