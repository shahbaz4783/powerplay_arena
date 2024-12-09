import { Bot } from 'grammy';

// Initialize the bot
export const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN || '');

// Add some commands
bot.command('start', (ctx) =>
	ctx.reply("Welcome! I'm a Next.js Telegram bot.")
);
bot.command('help', (ctx) => ctx.reply('I can respond to /start and /help'));
