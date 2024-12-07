import { Bot } from 'grammy';

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN || '');

bot.command('start', (ctx) =>
	ctx.reply('Welcome! I am a Telegram bot powered by Next.js and grammY bro.')
);
bot.on('message', (ctx) => ctx.reply('I received your message!'));

bot.start();
