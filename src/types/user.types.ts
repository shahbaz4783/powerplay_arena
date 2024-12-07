import { User as TelegramUser } from '@telegram-apps/sdk-react';

interface CustomUser extends Omit<TelegramUser, 'id'> {
	id: string;
}

// Use this type alias to refer to your modified User type
export type User = CustomUser;
