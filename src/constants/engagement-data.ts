import { FaTelegramPlane, FaInstagram } from 'react-icons/fa';
import { FaXTwitter, FaDiscord } from 'react-icons/fa6';

export const INVITE_MILESTONES = [
	{
		id: 1,
		title: 'Newcomer',
		description: 'Spread the joy! Invite 5 friends to join the adventure.',
		reward: 500,
		requiredInvites: 5,
	},
	{
		id: 2,
		title: 'Social Butterfly',
		description: 'Your network is growing! Reach 10 successful invites.',
		reward: 1000,
		requiredInvites: 10,
	},
	{
		id: 3,
		title: 'Crowd Gatherer',
		description: "You're becoming popular! Bring 20 new players to the game.",
		reward: 2000,
		requiredInvites: 20,
	},
	{
		id: 4,
		title: 'Trendsetter',
		description: 'Your influence is spreading! Achieve 50 successful invites.',
		reward: 5000,
		requiredInvites: 50,
	},
	{
		id: 5,
		title: 'Recruitment Guru',
		description:
			"You're a natural leader! Inspire 100 friends to join the game.",
		reward: 10000,
		requiredInvites: 100,
	},
	{
		id: 6,
		title: 'Legendary Connector',
		description: "You're shaping the community! Bring in 200 new players.",
		reward: 20000,
		requiredInvites: 200,
	},
];

export const SOCIAL_TASKS_LIST = [
	{
		title: 'Join our TG group',
		icon: FaTelegramPlane,
		reward: 80,
		href: 'https://t.me/powerplay_arena',
	},
	{
		title: 'Follow on Twitter',
		icon: FaXTwitter,
		reward: 90,
		href: 'https://x.com/shahbaz4783',
	},
	{
		title: 'Join our Discord',
		icon: FaDiscord,
		reward: 60,
		href: 'https://x.com/shahbaz4783',
	},
	{
		title: 'Follow on Instagram',
		icon: FaInstagram,
		reward: 50,
		href: 'https://x.com/shahbaz4783',
	},
];
