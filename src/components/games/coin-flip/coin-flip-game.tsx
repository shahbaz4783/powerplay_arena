'use client';

import { useState, useEffect, useCallback } from 'react';
import { useInitData } from '@telegram-apps/sdk-react';
import { useUserProfile } from '@/src/hooks/useUserData';
import { MessageCard } from '@/src/components/common/cards/message-card';
import { betOptions } from '@/src/constants/challenges';
import { placeBet } from '@/src/actions/bet.action';
import { useFormState } from 'react-dom';
import { BetSummary } from './bet-summary';
import { BetResult } from './bet-result';
import { BetAmount } from './bet-amount';
import { BetChallenge } from './bet-challenge';
import { BetSideSelection } from './bet-side-selection';

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

	const initData = useInitData();
	const userId = BigInt(initData?.user?.id || 0);
	const { data, isLoading, mutate } = useUserProfile(initData?.user?.id);

	const [formState, formAction] = useFormState(placeBet.bind(null, userId), {
		message: {},
		result: null,
		winAmount: 0,
	});

	useEffect(() => {
		if (formState.result) {
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
				title='Preparing Coin Flip Challenge'
				message='Polishing the lucky coin and setting up the challenge. Get ready to test your fortune!'
				type='loading'
			/>
		);
	}

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
				<input type='hidden' name='betAmount' value={betAmount} />

				<BetAmount
					betAmount={betAmount}
					setBetAmount={setBetAmount}
					userBalance={userBalance}
					maxBet={maxBet}
					bettingPasses={profile?.powerPass || 0}
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
				result={formState.result}
				winAmount={formState.winAmount}
				message={formState.message}
				flipResult={formState.flipResult!}
				betAmount={betAmount}
				selectedSide={selectedSide}
			/>
		</div>
	);
}
