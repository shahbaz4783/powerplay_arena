'use client';

import { useCricketGameState } from '@/src/lib/store';
import { Trophy, Target, Zap, Award } from 'lucide-react';
import { calculateRewards } from '@/src/lib/game-logics';
import { RewardItem } from '@/src/components/common/cards/reward-card';
import { useFormState } from 'react-dom';
import { calculateXPGain } from '@/src/lib/utils';
import { SubmitButton } from '../../common/buttons/submit-button';
import { Header } from '../../common/elements/header';
import { GradientBorder } from '../../common/elements/gradient-border';
import { token } from '@/src/constants/app-config';
import { saveMatchDataToDatabase } from '@/src/actions/game.action';
import { useCurrentUser } from '@/src/hooks/useCurrentUser';

export function Result() {
	const { telegramId } = useCurrentUser();
	const { gameState, resetGame } = useCricketGameState();
	const { player, opponent, matchResult } = gameState;

	const { fourReward, sixerReward, wicketTakenReward, winMarginReward } =
		calculateRewards(gameState);
	const totalReward =
		fourReward + sixerReward + wicketTakenReward + winMarginReward;

	const [response, formAction] = useFormState(
		saveMatchDataToDatabase.bind(null, gameState, telegramId),
		{
			message: {},
		}
	);

	if (response.message.success) {
		resetGame();
	}

	const totalXP = calculateXPGain(gameState);

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
								{totalReward} {token.symbol}
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

			<section className='rounded-xl bg-gradient-to-t from-gray-900 via-gray-900 to-slate-900 p-6 sticky bottom-0'>
				<form action={formAction}>
					<SubmitButton
						title='Claim Rewards and XP'
						loadingTitle='Claiming...'
						className='w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold'
					/>
				</form>
			</section>
		</main>
	);
}