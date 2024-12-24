import { calculateBettingPassCost } from '@/src/lib/utils';
import { token } from '@/src/constants/app-config';
import {
	ArrowRight,
	CoinsIcon,
	Landmark,
	LayoutDashboard,
	PlayCircle,
	Shuffle,
	SwordIcon,
} from 'lucide-react';
import { SubmitButton } from '../../common/buttons/submit-button';
import { IconButton } from '../../common/buttons/primary-button';
import { LoadingOverlay } from '../../common/dialog/loading-overlay';
import { InfoCard } from '../../common/cards/info-card';
import { SectionHeader } from '../../common/elements/section-header';
import { GradientBorder } from '../../common/elements/gradient-border';

interface BetOption {
	name: string;
	description: string;
	payout: number;
}

export function BetSummary({
	betAmount,
	selectedChallenge,
	selectedSide,
	userBalance,
	isLoading,
}: {
	betAmount: number;
	selectedChallenge: BetOption;
	selectedSide: string;
	userBalance: number;
	isLoading: boolean;
}) {
	const potentialWin = Math.round(
		betAmount * selectedChallenge.payout - betAmount
	);

	return (
		<GradientBorder>
			<SectionHeader
				title='Summary'
				description='Check the summary'
				icon={LayoutDashboard}
			/>
			<div className='grid grid-cols-2 gap-4'>
				<InfoCard
					key='bet-amount'
					icon={<Landmark className='w-5 h-5' />}
					title={`Bet Amount (${token.symbol})`}
					amount={betAmount}
					color='blue'
				/>
				<InfoCard
					key='challenge'
					icon={<SwordIcon className='w-5 h-5' />}
					title='Challenge'
					amount={selectedChallenge.name}
					color='yellow'
				/>
				<InfoCard
					key='your-side'
					icon={<CoinsIcon className='w-5 h-5' />}
					title='Your Side'
					amount={selectedSide.toLocaleUpperCase()}
					color='green'
				/>
				<InfoCard
					key='pass-cost'
					icon={<Shuffle className='w-5 h-5' />}
					title='Pass Cost'
					amount={calculateBettingPassCost(betAmount).toString()}
					color='purple'
				/>
			</div>
			<div className='flex items-center justify-between sub-card'>
				<div>
					<p className='text-xs text-slate-300'>Potential Win</p>
					<p className='text-green-400 font-bold'>
						{potentialWin} {token.symbol}
					</p>
				</div>
				<IconButton
					text={isLoading ? 'Placing...' : 'Place Bet'}
					icon={PlayCircle}
				/>
			</div>
		</GradientBorder>
	);
}
