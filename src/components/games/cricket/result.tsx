'use client';

import { useCricketGameState } from '@/src/lib/store';
import { Trophy, Target, Zap, Award, Coins } from 'lucide-react';
import { calculateRewards } from '@/src/lib/game-logics';
import { RewardItem } from '@/src/components/common/cards/reward-card';
import { Header } from '../../common/elements/header';
import { GradientBorder } from '../../common/elements/gradient-border';
import { token } from '@/src/constants/app-config';

interface ResultProps {
	rewards: number | null;
}

export function Result({ rewards }: ResultProps) {
	const { gameState } = useCricketGameState();
	const { player, opponent, matchResult } = gameState;

	const { fourReward, sixerReward, wicketTakenReward, winMarginReward } =
		calculateRewards(gameState);
	const totalReward =
		fourReward + sixerReward + wicketTakenReward + winMarginReward;

	const getResultColor = () => {
		switch (matchResult.winner) {
			case 'player':
				return 'bg-gradient-to-r from-green-700/50 to-green-800/20';
			case 'opponent':
				return 'bg-gradient-to-r from-red-700/50 to-red-800/20';
			case 'tie':
				return 'bg-gradient-to-r from-yellow-700/50 to-yellow-800/20';
			default:
				return 'bg-gradient-to-r from-slate-700/50 to-slate-800/20';
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
		<main className='space-y-4 flex flex-col justify-between'>
			<Header
				title='Match Concluded'
				subtitle='The dust settles on the Cricket Pitch'
			/>

			<GradientBorder className='bg-slate-800/50 backdrop-blur-md'>
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
						<div className='text-sm text-slate-400 mb-1'>Opponent Score</div>
						<div className='text-4xl font-bold text-white'>
							{opponent.runs}/{opponent.wickets}
						</div>
						<div className='text-sm text-slate-400 mt-1'>
							({opponent.oversPlayed})
						</div>
					</div>
				</div>
			</GradientBorder>

			<GradientBorder className={`${getResultColor()} backdrop-blur-sm`}>
				<h3 className={`text-2xl font-bold text-center `}>{getResultText()}</h3>
				<p className='text-slate-300 mt-2 text-center text-sm font-mono'>
					{matchResult.winner === 'tie'
						? 'The match ended in a tie!'
						: `${matchResult.winner === 'player' ? 'You' : 'Opponent'} won by ${
								matchResult.margin
						  } ${matchResult.marginType}`}
				</p>
			</GradientBorder>

			<GradientBorder>
				<h2 className='text-xl font-bold text-center text-cyan-400'>
					Your Rewards
				</h2>
				<div className='flex justify-between items-center  rounded-xl p-4'>
					<div className='flex items-center'>
						<div>
							<div className='text-sm text-slate-300'>Total {token.name}</div>
							<div className='text-2xl font-bold text-yellow-400'>
								{rewards !== null ? rewards : totalReward} {token.symbol}
							</div>
						</div>
					</div>
				</div>
				<div className='grid grid-cols-2 gap-4'>
					<RewardItem icon={Zap} label='Sixes' value={sixerReward} />
					<RewardItem icon={Target} label='Fours' value={fourReward} />
					<RewardItem icon={Award} label='Wickets' value={wicketTakenReward} />
					<RewardItem
						icon={Trophy}
						label='Win Margin'
						value={winMarginReward}
					/>
				</div>
			</GradientBorder>

			<GradientBorder>
				<div className='flex items-center justify-center space-x-2'>
					<Coins className='w-6 h-6 text-yellow-400' />
					<span className='text-lg font-semibold text-slate-200'>
						Total Earnings
					</span>
				</div>
				<p className='text-center text-2xl font-bold text-yellow-400 mt-2'>
					{rewards !== null ? rewards : totalReward} {token.symbol}
				</p>
			</GradientBorder>
		</main>
	);
}
