import { Bot } from 'grammy';

const { BOT_TOKEN: token = '' } = process.env;

export const bot = new Bot(token);

bot.on('message', async (ctx) => {
	await ctx.reply('Hi there! From Nextjs');
});
