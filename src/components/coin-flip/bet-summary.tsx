import { calculateBettingPassCost } from '@/src/lib/utils';
import { SubmitButton } from '../feedback/submit-button';
import { token } from '@/src/lib/constants';
import {
	ArrowRight,
	CoinsIcon,
	Landmark,
	Shuffle,
	SwordIcon,
} from 'lucide-react';

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
}: {
	betAmount: number;
	selectedChallenge: BetOption;
	selectedSide: string;
	userBalance: number;
}) {
	const potentialWin = Math.round(
		betAmount * selectedChallenge.payout - betAmount
	);

	return (
		<section className='bg-slate-900 border-slate-800 rounded-xl p-4 space-y-3'>
			<h3 className='text-lg text-center font-semibold text-slate-200'>
				Your Bet Summary
			</h3>
			<div className='grid grid-cols-2 gap-4'>
				<BetSummaryItem
					label='Bet Amount'
					value={`${betAmount} ${token.symbol}`}
					icon={Landmark}
				/>
				<BetSummaryItem
					label='Challenge'
					value={selectedChallenge.name}
					icon={SwordIcon}
				/>
				<BetSummaryItem
					label='Your Side'
					value={selectedSide}
					icon={CoinsIcon}
				/>
				<BetSummaryItem
					label='Betting Pass Cost'
					value={calculateBettingPassCost(betAmount).toString()}
					icon={Shuffle}
				/>
			</div>
			<div className='flex items-center justify-between text-sm text-slate-400'>
				<span>Potential Win</span>
				<div className='flex items-center space-x-1'>
					<span className='text-green-400 font-medium'>
						{potentialWin} {token.symbol}
					</span>
					<ArrowRight className='h-4 w-4 text-green-400' />
				</div>
			</div>
			<SubmitButton
				title='Place Bet'
				loadingTitle='Please wait for result...'
				disabled={betAmount > userBalance}
				className='w-full'
			/>
		</section>
	);
}

function BetSummaryItem({
	label,
	value,
	icon: Icon,
}: {
	label: string;
	value: string;
	icon: React.ElementType;
}) {
	return (
		<div className='space-y-2'>
			<p className='text-sm text-slate-400'>{label}</p>
			<div className='flex items-center space-x-2'>
				<Icon className='h-5 w-5 text-blue-500' />
				<span className='text-lg font-medium text-slate-200 capitalize'>
					{value}
				</span>
			</div>
		</div>
	);
}
