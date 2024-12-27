import { Coins, Ticket, Star, Zap, Trophy, Crown } from 'lucide-react';

type CurrencyType =
	| 'balance'
	| 'pass'
	| 'powerPass'
	| 'powerCoin'
	| 'starVoucher'
	| 'token';

interface GameBalanceCardProps {
	value: number | string;
	label: string;
	type: CurrencyType;
	variant?: 'blue' | 'purple' | 'green' | 'amber' | 'pink' | 'yellow';
	isLoading?: boolean;
	className?: string;
}

export const GameBalanceCard = ({
	value,
	label,
	type,
	variant,
	isLoading = false,
	className,
}: GameBalanceCardProps) => {
	const defaultVariants: Record<CurrencyType, keyof typeof variants> = {
		balance: 'blue',
		pass: 'purple',
		powerPass: 'amber',
		powerCoin: 'yellow',
		starVoucher: 'pink',
		token: 'green',
	};

	const getIcon = (type: CurrencyType) => {
		switch (type) {
			case 'balance':
				return Coins;
			case 'pass':
				return Ticket;
			case 'powerPass':
				return Crown;
			case 'powerCoin':
				return Zap;
			case 'starVoucher':
				return Star;
			case 'token':
				return Trophy;
		}
	};

	const variants = {
		blue: {
			background: 'from-blue-500/10 to-cyan-500/10',
			border: 'border-blue-500/20',
			iconBg: 'from-blue-600/50 to-cyan-600/50',
			glow: 'shadow-[0_0_15px_rgba(59,130,246,0.1)]',
		},
		purple: {
			background: 'from-purple-500/10 to-pink-500/10',
			border: 'border-purple-500/20',
			iconBg: 'from-purple-600/50 to-pink-600/50',
			glow: 'shadow-[0_0_15px_rgba(147,51,234,0.1)]',
		},
		green: {
			background: 'from-emerald-500/10 to-teal-500/10',
			border: 'border-emerald-500/20',
			iconBg: 'from-emerald-600/50 to-teal-600/50',
			glow: 'shadow-[0_0_15px_rgba(16,185,129,0.1)]',
		},
		amber: {
			background: 'from-amber-500/10 to-orange-500/10',
			border: 'border-amber-500/20',
			iconBg: 'from-amber-600/50 to-orange-600/50',
			glow: 'shadow-[0_0_15px_rgba(245,158,11,0.1)]',
		},
		pink: {
			background: 'from-pink-500/10 to-rose-500/10',
			border: 'border-pink-500/20',
			iconBg: 'from-pink-600/50 to-rose-600/50',
			glow: 'shadow-[0_0_15px_rgba(236,72,153,0.1)]',
		},
		yellow: {
			background: 'from-yellow-500/10 to-amber-500/10',
			border: 'border-yellow-500/20',
			iconBg: 'from-yellow-600/50 to-amber-600/50',
			glow: 'shadow-[0_0_15px_rgba(234,179,8,0.1)]',
		},
	};

	const selectedVariant = variant || defaultVariants[type];
	const currentVariant = variants[selectedVariant];
	const Icon = getIcon(type);

	if (isLoading) {
		return (
			<div
				className={`
        flex items-center gap-3 p-3 rounded-lg
        bg-gradient-to-br ${currentVariant.background}
        backdrop-blur-sm border ${currentVariant.border}
        ${currentVariant.glow}
        animate-pulse
        ${className}
      `}
			>
				<div
					className={`
          p-1.5 rounded-lg w-7 h-7
          bg-gradient-to-br ${currentVariant.iconBg}
          backdrop-blur-sm
        `}
				/>
				<div className='flex flex-col gap-2 flex-1'>
					<div className='h-3 bg-zinc-700/50 rounded-md w-16' />
					<div className='h-4 bg-zinc-700/50 rounded-md w-24' />
				</div>
			</div>
		);
	}

	return (
		<div
			className={`
      flex items-center gap-3 p-3 rounded-lg
      bg-gradient-to-br ${currentVariant.background}
      backdrop-blur-sm border ${currentVariant.border}
      ${currentVariant.glow}
      hover:scale-102 transition-all duration-300
      ${className}
    `}
		>
			<div
				className={`
        p-1.5 rounded-lg
        bg-gradient-to-br ${currentVariant.iconBg}
        backdrop-blur-sm
      `}
			>
				<Icon className='w-4 h-4 text-zinc-100' />
			</div>
			<div className='flex flex-col'>
				<span className='text-xs font-medium text-zinc-300/80'>{label}</span>
				<span className='text-sm font-bold text-zinc-100'>{value}</span>
			</div>
		</div>
	);
};
