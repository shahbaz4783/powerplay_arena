'use client';

import { useState, useEffect, useCallback, useActionState } from 'react';
import { MessageCard } from '@/src/components/common/cards/message-card';
import { betOptions } from '@/src/constants/challenges';
import { placeBet } from '@/src/actions/bet.action';
import { BetSummary } from './bet-summary';
import { BetResult } from './bet-result';
import { BetAmount } from './bet-amount';
import { BetChallenge } from './bet-challenge';
import { BetSideSelection } from './bet-side-selection';
import { useCurrentUser } from '@/src/hooks/useCurrentUser';
import { useUserInventory } from '@/src/hooks/useUserData';
import LoadingGame from '@/src/app/game/loading';
import { CoinsIcon, HandCoins } from 'lucide-react';
import { GameHeader } from '../../layouts/global/game-header';

interface BetOption {
	name: string;
	description: string;
	payout: number;
}

export function CoinFlipChallenge() {
	const { telegramId } = useCurrentUser();
	const { data: inventory, isLoading, mutate } = useUserInventory(telegramId);
	const userBalance = inventory?.powerCoin as number;

	const [betAmount, setBetAmount] = useState(100);
	const [selectedChallenge, setSelectedChallenge] = useState<BetOption>(
		betOptions[0]
	);
	const [selectedSide, setSelectedSide] = useState<string | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [formState, formAction, isPending] = useActionState(
		placeBet.bind(null, telegramId),
		{
			success: false,
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
		return <LoadingGame />;
	}

	const maxBet = Math.floor((userBalance * 0.65) / 10) * 10;
	const isBetValid = betAmount > 0 && selectedChallenge && selectedSide;

	return (
		<>
			<div className='w-11/12 m-auto'>
				<GameHeader
					title='Fortune Flip'
					icon={CoinsIcon}
					hasUnsavedProgress={false}
					quitPath='/miniapp'
					iconColors='from-yellow-400 to-yellow-600'
					titleGradient='from-yellow-200 via-yellow-300 to-yellow-200'
				/>
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
							isLoading={isPending}
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
		</>
	);
}
