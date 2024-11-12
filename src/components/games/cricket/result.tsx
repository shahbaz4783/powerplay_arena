'use client';

import { useCricketGameState } from '@/src/lib/store';
import { Trophy, Target, Zap, Award, Coins, TrendingUp } from 'lucide-react';
import { calculateRewards } from '@/src/lib/game-logics';
import { RewardItem } from '@/src/components/common/cards/reward-card';
import { SubmitButton } from '@/src/components/feedback/submit-button';
import { useFormState } from 'react-dom';

import { calculateXPGain } from '@/src/lib/utils';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/src/components/ui/card';
import { Progress } from '@/src/components/ui/progress';
import { Header } from '../../shared/header';

export function Result() {
	const { gameState, endMatchAndClaimReward } = useCricketGameState();
	const { player, opponent, matchResult } = gameState;

	const { fourReward, sixerReward, wicketTakenReward, winMarginReward } =
		calculateRewards(gameState);
	const totalReward =
		fourReward + sixerReward + wicketTakenReward + winMarginReward;

	const [response, formAction] = useFormState(endMatchAndClaimReward, {
		message: {},
	});

	const totalXP = calculateXPGain(gameState);

	const getResultColor = () => {
		switch (matchResult.winner) {
			case 'player':
				return 'bg-green-900/30';
			case 'opponent':
				return 'bg-red-900/30';
			case 'tie':
				return 'bg-yellow-900/30';
			default:
				return 'bg-slate-700/30';
		}
	};

	const getResultText = () => {
		switch (matchResult.winner) {
			case 'player':
				return 'Victory!';
			case 'opponent':
				return 'Defeat';
			case 'tie':
				return 'Tie';
			default:
				return 'Match Ended';
		}
	};

	return (
		<div className='w-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl'>
			<Header title='Match Result' />

			<section className='space-y-6 p-6'>
				<Card>
					<CardContent className='pt-6'>
						<div className='flex justify-between items-center'>
							<div className='text-center'>
								<div className='text-sm text-slate-400 mb-1'>Your Score</div>
								<div className='text-4xl font-bold text-white'>
									{player.runs}/{player.wickets}
								</div>
								<div className='text-sm text-slate-400 mt-1'>
									({player.oversPlayed})
								</div>
							</div>
							<div className='text-4xl font-bold text-cyan-400'>VS</div>
							<div className='text-center'>
								<div className='text-sm text-slate-400 mb-1'>
									Opponent Score
								</div>
								<div className='text-4xl font-bold text-white'>
									{opponent.runs}/{opponent.wickets}
								</div>
								<div className='text-sm text-slate-400 mt-1'>
									({opponent.oversPlayed})
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className={`${getResultColor()} border-none`}>
					<CardContent className='pt-6'>
						<h3
							className={`text-2xl font-bold text-center ${
								matchResult.winner === 'tie'
									? 'text-yellow-400'
									: matchResult.winner === 'player'
									? 'text-green-400'
									: 'text-red-400'
							}`}
						>
							{getResultText()}
						</h3>
						<p className='text-slate-300 mt-2 text-center'>
							{matchResult.winner === 'tie'
								? 'The match ended in a tie!'
								: `${
										matchResult.winner === 'player' ? 'You' : 'Opponent'
								  } won by ${matchResult.margin} ${matchResult.marginType}`}
						</p>
					</CardContent>
				</Card>

				<Card className='bg-slate-700/50'>
					<CardHeader>
						<CardTitle className='text-xl font-bold text-center text-cyan-400'>
							Your Rewards
						</CardTitle>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div className='grid grid-cols-2 gap-4'>
							<RewardItem icon={Zap} label='Sixes' value={sixerReward} />
							<RewardItem icon={Target} label='Fours' value={fourReward} />
							<RewardItem
								icon={Award}
								label='Wickets'
								value={wicketTakenReward}
							/>
							<RewardItem
								icon={Trophy}
								label='Win Bonus'
								value={winMarginReward}
							/>
						</div>
						<div className='flex justify-between items-center bg-slate-600/50 rounded-xl p-4'>
							<div className='flex items-center'>
								<div>
									<div className='text-sm text-slate-300'>Total Coins</div>
									<div className='text-2xl font-bold text-yellow-400'>
										{totalReward} PWR
									</div>
								</div>
							</div>
							<div className='flex items-center'>
								<div>
									<div className='text-sm text-slate-300'>Total XP</div>
									<div className='text-2xl font-bold text-green-400'>
										{totalXP} XP
									</div>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</section>

			<section className='p-6'>
				<form action={formAction}>
					<SubmitButton
						title='Claim Rewards and XP'
						loadingTitle='Claiming...'
						className='w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold'
					/>
				</form>
			</section>
		</div>
	);
}
