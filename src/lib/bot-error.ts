import { BotError, Context, GrammyError, HttpError } from 'grammy';

export async function handleBotError(error: unknown, ctx: Context) {
	await ctx.reply('Something went wrong. Please try again later.');
	if (error instanceof BotError) {
		console.log('Bot Error: ' + error.message);
	} else if (error instanceof HttpError) {
		console.log('HTTP Error: ' + error.message);
	} else if (error instanceof GrammyError) {
		console.log('Grammy Error: ' + error.message);
		console.log('Grammy Error: ' + error.message);
	} else {
		ctx.reply('Something went wrong. Please try again later.');
	}
}
