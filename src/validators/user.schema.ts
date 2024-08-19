import * as z from 'zod';

export const waitlistSchema = z.object({
	email: z.string().email(),
});
