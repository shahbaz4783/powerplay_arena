'use client';

import { useState } from 'react';
import {
	CoinsIcon,
	Shuffle,
	ArrowRight,
	Landmark,
	SwordIcon,
} from 'lucide-react';
import { Slider } from '@/src/components/ui/slider';
import { SubmitButton } from '@/src/components/feedback/submit-button';
import { token } from '@/src/lib/constants';
import { useInitData } from '@telegram-apps/sdk-react';
import { useUserProfile } from '@/src/hooks/useUserData';
import { MessageCard } from '@/src/components/cards/message-card';
import { betOptions, betSides } from '@/src/constants/challenges';
import { calculateBettingPassCost, cn } from '@/src/lib/utils';
import { placeBet } from '@/src/actions/bet.action';
import { useFormState } from 'react-dom';

// Types
interface BetOption {
	name: string;
	description: string;
	payout: number;
}

interface BetSide {
	name: string;
	value: string;
}

// Component
export function CoinFlipChallenge() {
	// State
	const [betAmount, setBetAmount] = useState(0);
	const [selectedChallenge, setSelectedChallenge] = useState<BetOption>(
		betOptions[0]
	);
	const [selectedSide, setSelectedSide] = useState<string | null>(null);

	// Hooks
	const initData = useInitData();
	const userId = BigInt(initData?.user?.id || 0);
	const { data, isLoading } = useUserProfile(initData?.user?.id);

	const [formState, formAction] = useFormState(placeBet.bind(null, userId), {
		message: {},
	});

	// Early return for loading state
	if (isLoading) {
		return (
			<MessageCard
				title='Preparing Coin Flip Challenge'
				message='Polishing the lucky coin and setting up the challenge. Get ready to test your fortune!'
				type='loading'
			/>
		);
	}

	// Derived state
	const profile = data?.userProfile;
	const userBalance = profile?.balance as number;
	const maxBet = Math.floor((userBalance * 0.65) / 10) * 10;
	const isBetValid = betAmount > 0 && selectedChallenge && selectedSide;

	return (
		<div className='w-full max-w-2xl mx-auto'>
			<form action={formAction} className='space-y-4'>
				<input
					type='hidden'
					name='challengeName'
					value={selectedChallenge.name}
				/>
				<input type='hidden' name='selectedSide' value={selectedSide || ''} />

				<BetAmountSection
					betAmount={betAmount}
					setBetAmount={setBetAmount}
					userBalance={userBalance}
					maxBet={maxBet}
					bettingPasses={profile?.bettingPasses || 0}
				/>

				<ChallengeSelectionSection
					selectedChallenge={selectedChallenge}
					setSelectedChallenge={setSelectedChallenge}
				/>

				<SideSelectionSection
					selectedSide={selectedSide}
					setSelectedSide={setSelectedSide}
				/>

				{isBetValid && (
					<BetSummarySection
						betAmount={betAmount}
						selectedChallenge={selectedChallenge}
						selectedSide={selectedSide}
						userBalance={userBalance}
					/>
				)}
			</form>

			<p className='text-red-700'>{formState.message.error}</p>
			<p className='text-green-700'>{formState.message.success}</p>
		</div>
	);
}

// Sub-components
function BetAmountSection({
	betAmount,
	setBetAmount,
	userBalance,
	maxBet,
	bettingPasses,
}: {
	betAmount: number;
	setBetAmount: (amount: number) => void;
	userBalance: number;
	maxBet: number;
	bettingPasses: number;
}) {
	return (
		<section className='w-full bg-slate-900 rounded-xl p-4 space-y-6'>
			<div className='flex justify-between text-sm text-muted-foreground'>
				<span>Min Bet: 10</span>
				<span>Balance: {userBalance}</span>
				<span>Max Bet: {maxBet}</span>
			</div>
			<Slider
				min={0}
				max={maxBet}
				step={10}
				name='betAmount'
				value={[betAmount]}
				onValueChange={(value) => setBetAmount(value[0])}
				className='w-full'
				disabled={bettingPasses === 0}
			/>
			<div className='flex justify-between text-sm text-slate-400'>
				<p>Betting Pass: {bettingPasses}</p>
				<p>
					Bet Amount: {betAmount} {token.symbol}
				</p>
			</div>
		</section>
	);
}

function ChallengeSelectionSection({
	selectedChallenge,
	setSelectedChallenge,
}: {
	selectedChallenge: BetOption;
	setSelectedChallenge: (challenge: BetOption) => void;
}) {
	return (
		<section className='bg-slate-900 rounded-xl p-3 space-y-4'>
			<h3 className='text-lg text-center font-semibold text-slate-200'>
				Choose Your Risk
			</h3>
			<div className='grid grid-cols-2 gap-2'>
				{betOptions.map((option) => (
					<button
						key={option.name}
						type='button'
						className={cn(
							'w-full rounded-xl border h-auto py-4 flex flex-col items-center justify-center',
							{
								'text-slate-900 bg-white font-bold':
									selectedChallenge === option,
							}
						)}
						onClick={() => setSelectedChallenge(option)}
					>
						<span className='text-sm'>{option.name}</span>
					</button>
				))}
			</div>
			<p className='text-sm text-slate-400 text-center'>
				{selectedChallenge.description}
			</p>
		</section>
	);
}

function SideSelectionSection({
	selectedSide,
	setSelectedSide,
}: {
	selectedSide: string | null;
	setSelectedSide: (side: string) => void;
}) {
	return (
		<section className='bg-slate-900 rounded-xl p-3 space-y-4'>
			<h3 className='text-lg text-center font-semibold text-slate-200'>
				Choose Your Side
			</h3>
			<div className='grid grid-cols-2 gap-2'>
				{betSides.map((side) => (
					<button
						key={side.value}
						type='button'
						className={cn(
							'w-full rounded-xl border h-auto py-4 flex flex-col items-center justify-center',
							{
								'text-slate-900 bg-white font-bold':
									selectedSide === side.value,
							}
						)}
						onClick={() => setSelectedSide(side.value)}
					>
						<span className='text-sm'>{side.name}</span>
					</button>
				))}
			</div>
		</section>
	);
}

function BetSummarySection({
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
	const potentialWin = Math.round(betAmount * selectedChallenge.payout);

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
