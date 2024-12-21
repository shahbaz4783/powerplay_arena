'use client';

import { useState, useEffect, useCallback } from 'react';
import { MessageCard } from '@/src/components/common/cards/message-card';
import { betOptions } from '@/src/constants/challenges';
import { placeBet } from '@/src/actions/bet.action';
import { useFormState } from 'react-dom';
import { BetSummary } from './bet-summary';
import { BetResult } from './bet-result';
import { BetAmount } from './bet-amount';
import { BetChallenge } from './bet-challenge';
import { BetSideSelection } from './bet-side-selection';
import { useCurrentUser } from '@/src/hooks/useCurrentUser';
import { useUserInventory } from '@/src/hooks/useUserData';

interface BetOption {
	name: string;
	description: string;
	payout: number;
}

export function CoinFlipChallenge() {
	const [betAmount, setBetAmount] = useState(0);
	const [selectedChallenge, setSelectedChallenge] = useState<BetOption>(
		betOptions[0]
	);
	const [selectedSide, setSelectedSide] = useState<string | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const { telegramId } = useCurrentUser();

	const { data: inventory, isLoading, mutate } = useUserInventory(telegramId);

	const [formState, formAction] = useFormState(
		placeBet.bind(null, telegramId),
		{
			success: true,
			message: null,
			data: {
				result: null,
				winAmount: 0,
				xpGain: 0,
			},
		}
	);

	useEffect(() => {
		if (formState.data?.result) {
			setIsModalOpen(true);
		}
	}, [formState]);

	const handleModalClose = useCallback(() => {
		setIsModalOpen(false);
		mutate();
	}, [mutate]);

	if (isLoading) {
		return (
			<MessageCard
				title='Setting Up the Coin Flip'
				message='Polishing the lucky coin for your next big win...'
				type='loading'
			/>
		);
	}

	const userBalance = inventory?.powerCoin as number;
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
				<input type='hidden' name='betAmount' value={betAmount} />

				<BetAmount
					betAmount={betAmount}
					setBetAmount={setBetAmount}
					userBalance={userBalance}
					maxBet={maxBet}
					bettingPasses={inventory?.powerPass || 0}
				/>

				<BetChallenge
					selectedChallenge={selectedChallenge}
					setSelectedChallenge={setSelectedChallenge}
				/>

				<BetSideSelection
					selectedSide={selectedSide}
					setSelectedSide={setSelectedSide}
				/>

				{isBetValid && (
					<BetSummary
						betAmount={betAmount}
						selectedChallenge={selectedChallenge}
						selectedSide={selectedSide}
						userBalance={userBalance}
					/>
				)}
			</form>

			<BetResult
				isOpen={isModalOpen}
				onOpenChange={handleModalClose}
				success={formState.success}
				result={formState.data?.result!}
				winAmount={formState.data?.winAmount!}
				message={formState.message}
				flipResult={formState.data?.flipResult!}
				betAmount={betAmount}
				selectedSide={selectedSide}
				xpGain={formState.data?.xpGain!}
			/>
		</div>
	);
}
