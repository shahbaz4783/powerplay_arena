import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	Sparkles,
	Loader2,
	ShoppingBag,
	Wallet,
	History,
	Award,
	Home,
	Users,
	Gem,
	Settings,
	MessageCircle,
	Gift,
} from 'lucide-react';

type PageType =
	| 'shop'
	| 'wallet'
	| 'history'
	| 'challenges'
	| 'home'
	| 'refer'
	| 'rewards'
	| 'settings'
	| 'chat'
	| 'profile';

interface PageConfig {
	title: string;
	loadingMessages: string[];
	icon: React.ReactNode;
	primaryColor: string;
	secondaryColor: string;
}

const pageConfigs: Record<PageType, PageConfig> = {
	shop: {
		title: 'Shop',
		loadingMessages: [
			'Loading available items...',
			'Checking latest deals...',
			'Updating inventory...',
			'Fetching special offers...',
			'Preparing your shopping experience...',
		],
		icon: <ShoppingBag className='w-16 h-16 text-emerald-400' />,
		primaryColor: 'emerald',
		secondaryColor: 'green',
	},
	wallet: {
		title: 'Wallet',
		loadingMessages: [
			'Syncing your balance...',
			'Updating transaction history...',
			'Checking pending rewards...',
			'Verifying account status...',
			'Loading payment methods...',
		],
		icon: <Wallet className='w-16 h-16 text-blue-400' />,
		primaryColor: 'blue',
		secondaryColor: 'indigo',
	},
	history: {
		title: 'Transaction History',
		loadingMessages: [
			'Fetching recent transactions...',
			'Organizing your history...',
			'Loading payment details...',
			'Updating records...',
			'Preparing transaction summary...',
		],
		icon: <History className='w-16 h-16 text-purple-400' />,
		primaryColor: 'purple',
		secondaryColor: 'violet',
	},
	challenges: {
		title: 'Challenges',
		loadingMessages: [
			'Loading daily challenges...',
			'Updating your progress...',
			'Checking available rewards...',
			'Preparing new missions...',
			'Syncing achievement data...',
		],
		icon: <Award className='w-16 h-16 text-amber-400' />,
		primaryColor: 'amber',
		secondaryColor: 'yellow',
	},
	home: {
		title: 'Home',
		loadingMessages: [
			'Preparing your dashboard...',
			'Loading latest updates...',
			'Checking notifications...',
			'Updating feed content...',
			'Getting everything ready...',
		],
		icon: <Home className='w-16 h-16 text-sky-400' />,
		primaryColor: 'sky',
		secondaryColor: 'blue',
	},
	refer: {
		title: 'Refer Friends',
		loadingMessages: [
			'Generating your referral code...',
			'Checking referral status...',
			'Loading reward details...',
			'Updating friend list...',
			'Preparing sharing options...',
		],
		icon: <Users className='w-16 h-16 text-pink-400' />,
		primaryColor: 'pink',
		secondaryColor: 'rose',
	},
	rewards: {
		title: 'Rewards',
		loadingMessages: [
			'Loading available rewards...',
			'Checking your points...',
			'Updating reward catalog...',
			'Preparing special offers...',
			'Calculating bonuses...',
		],
		icon: <Gem className='w-16 h-16 text-teal-400' />,
		primaryColor: 'teal',
		secondaryColor: 'cyan',
	},
	settings: {
		title: 'Settings',
		loadingMessages: [
			'Loading your preferences...',
			'Updating account settings...',
			'Checking security options...',
			'Syncing profile data...',
			'Preparing configuration...',
		],
		icon: <Settings className='w-16 h-16 text-slate-400' />,
		primaryColor: 'slate',
		secondaryColor: 'gray',
	},
	chat: {
		title: 'Messages',
		loadingMessages: [
			'Loading conversations...',
			'Updating chat history...',
			'Checking new messages...',
			'Syncing chat data...',
			'Preparing message threads...',
		],
		icon: <MessageCircle className='w-16 h-16 text-violet-400' />,
		primaryColor: 'violet',
		secondaryColor: 'purple',
	},
	profile: {
		title: 'Profile',
		loadingMessages: [
			'Loading your profile...',
			'Updating achievements...',
			'Syncing game stats...',
			'Checking badges...',
			'Preparing profile summary...',
		],
		icon: <Gift className='w-16 h-16 text-orange-400' />,
		primaryColor: 'orange',
		secondaryColor: 'amber',
	},
};

const GlowingOrb = ({ delay = 0, color }: { delay: number; color: string }) => (
	<motion.div
		className={`absolute w-3 h-3 rounded-full bg-${color}-400`}
		animate={{
			scale: [1, 1.5, 1],
			opacity: [0.5, 1, 0.5],
		}}
		transition={{
			duration: 2,
			delay,
			repeat: Infinity,
			ease: 'easeInOut',
		}}
	/>
);

interface PageLoadingScreenProps {
	pageType: PageType;
	onLoadingComplete?: () => void;
	loadingDuration?: number;
}

export const PageLoadingScreen: React.FC<PageLoadingScreenProps> = ({
	pageType,
	onLoadingComplete,
	loadingDuration = 3000,
}) => {
	const [currentMessage, setCurrentMessage] = useState<string>('');
	const config = pageConfigs[pageType];

	useEffect(() => {
		const messageInterval = setInterval(() => {
			setCurrentMessage((prevMessage) => {
				const currentIndex = config.loadingMessages.indexOf(prevMessage);
				return config.loadingMessages[
					(currentIndex + 1) % config.loadingMessages.length
				];
			});
		}, 3000);

		const loadingTimeout = setTimeout(() => {
			onLoadingComplete?.();
		}, loadingDuration);

		return () => {
			clearInterval(messageInterval);
			clearTimeout(loadingTimeout);
		};
	}, [config.loadingMessages, loadingDuration, onLoadingComplete]);

	return (
		<div
			className={`fixed inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 flex flex-col items-center justify-center p-4`}
			style={{ height: '100svh' }}
		>
			{/* Background Effects */}
			<div className='absolute inset-0 opacity-30'>
				<div
					className={`absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-${config.primaryColor}-500/20 via-transparent to-transparent`}
				/>
				<div
					className={`absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-${config.secondaryColor}-500/20 via-transparent to-transparent animate-pulse`}
				/>
			</div>

			{/* Main Content Container */}
			<div className='relative w-full max-w-md aspect-square mb-8'>
				{/* Orbital Rings */}
				<motion.div
					className={`absolute inset-0 rounded-full border-2 border-${config.primaryColor}-500/20`}
					animate={{
						rotate: [0, 360],
						scale: [1, 1.05, 1],
					}}
					transition={{
						rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
						scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
					}}
				/>
				<motion.div
					className={`absolute inset-4 rounded-full border-2 border-${config.secondaryColor}-500/20`}
					animate={{
						rotate: [360, 0],
						scale: [1.05, 1, 1.05],
					}}
					transition={{
						rotate: { duration: 12, repeat: Infinity, ease: 'linear' },
						scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
					}}
				/>

				{/* Center Icon */}
				<div className='absolute inset-0 flex items-center justify-center'>
					<motion.div
						animate={{
							scale: [0.98, 1.02, 0.98],
							rotate: [0, 5, -5, 0],
						}}
						transition={{
							duration: 4,
							repeat: Infinity,
							ease: 'easeInOut',
						}}
					>
						{config.icon}
					</motion.div>
				</div>

				{/* Floating Orbs */}
				<div className='absolute inset-0'>
					{Array.from({ length: 12 }).map((_, i) => (
						<GlowingOrb key={i} delay={i * 0.2} color={config.primaryColor} />
					))}
				</div>

				{/* Sparkle Effects */}
				<Sparkles
					className={`absolute top-1/4 left-1/4 w-6 h-6 text-${config.primaryColor}-300/60`}
				/>
				<Sparkles
					className={`absolute bottom-1/4 right-1/4 w-6 h-6 text-${config.primaryColor}-300/60`}
				/>
			</div>

			{/* Loading Text */}
			<AnimatePresence mode='wait'>
				<motion.div
					key={currentMessage}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					transition={{ duration: 0.5 }}
					className='text-center space-y-4'
				>
					<motion.h1
						className={`text-4xl font-bold bg-gradient-to-r from-${config.primaryColor}-200 via-${config.primaryColor}-300 to-${config.primaryColor}-200 bg-clip-text text-transparent`}
						animate={{
							backgroundPosition: ['0% center', '100% center'],
						}}
						transition={{
							duration: 8,
							repeat: Infinity,
							ease: 'linear',
						}}
					>
						{config.title}
					</motion.h1>
					<p className={`text-xl text-${config.secondaryColor}-200/80`}>
						{currentMessage}
					</p>
				</motion.div>
			</AnimatePresence>

			{/* Loading Indicator */}
			<motion.div
				className={`mt-8 flex items-center space-x-2 px-6 py-3 rounded-full bg-gray-800/50 backdrop-blur-sm`}
				animate={{
					boxShadow: [
						`0 0 0 0 rgba(${config.primaryColor}, 0)`,
						`0 0 0 8px rgba(${config.primaryColor}, 0.1)`,
						`0 0 0 0 rgba(${config.primaryColor}, 0)`,
					],
				}}
				transition={{
					duration: 2,
					repeat: Infinity,
					ease: 'easeInOut',
				}}
			>
				<Loader2
					className={`w-5 h-5 text-${config.primaryColor}-400 animate-spin`}
				/>
				<span className={`text-${config.secondaryColor}-200/80 text-lg`}>
					Loading...
				</span>
			</motion.div>
		</div>
	);
};
