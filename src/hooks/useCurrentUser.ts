import { useInitData } from '@telegram-apps/sdk-react';

export const useCurrentUser = (): { telegramId: string } => {
	const initData = useInitData();
	const telegramId = initData?.user?.id.toString();

	if (!telegramId) throw new Error('UserId not found');

	return { telegramId };
};
