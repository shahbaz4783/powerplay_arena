'use server';

import { db } from '../lib/db';
import { waitlistSchema } from '../validators/user.schema';

interface WaitlistState {
	message: {
		error?: string;
		success?: string;
	};
}

export const addEmailToWaitlist = async (
	formState: WaitlistState,
	formData: FormData
): Promise<WaitlistState> => {
	try {
		const email = formData.get('email') as string;

		const validateFields = waitlistSchema.safeParse({ email });
		if (!validateFields.success) {
			return {
				message: {
					error: 'Please enter a valid email address',
				},
			};
		}

		const emailAlreayExists = await db.waitlistUser.findUnique({
			where: { email },
		});

		if (emailAlreayExists) {
			return {
				message: {
					error:
						"It looks like you're already on the waitlist. Thank you for your enthusiasm!",
				},
			};
		}

		await db.waitlistUser.create({ data: { email } });
		return {
			message: {
				success:
					"Success! You've been added to the waitlist. Stay tuned for exciting updates!",
			},
		};
	} catch (error) {
		if (error instanceof Error) {
			return { message: { error: error.message } };
		} else {
			return {
				message: {
					error: 'Oops! Something went wrong. Please try again later.',
				},
			};
		}
	}
};
