'use client';

import { useCricketGameState } from '@/src/lib/store';
import {
	Trophy,
	Target,
	Zap,
	Award,
	HomeIcon,
	RotateCcw,
	Gift,
	SquareChartGantt,
} from 'lucide-react';
import { RewardItem } from '@/src/components/common/cards/reward-card';
import { GradientBorder } from '../../common/elements/gradient-border';
import { token } from '@/src/constants/app-config';
import { useQueryClient } from '@tanstack/react-query';
import { GameButton } from '../../common/buttons/game-button';
import { cricketMatchRewards } from '@/src/lib/game-logics';
import confetti from 'canvas-confetti';
import RunsComparisonChart from './innings-comarison';
import { SectionHeader } from '../../common/elements/section-header';
import RunsBarComparison from './bar-compare';
import { InfoCard } from '../../common/cards/info-card';
import { FaFoursquare, FaSitrox } from 'react-icons/fa6';
import { PiCoinDuotone } from 'react-icons/pi';

interface ResultProps {
	rewards: number | null;
}

export function Result({ rewards }: ResultProps) {
	const { gameState } = useCricketGameState();
	const { player, opponent, matchResult } = gameState;
	const queryClient = useQueryClient();

	if (matchResult.winner === 'player') {
		confetti({
			particleCount: 100,
			spread: 70,
			origin: { y: 0.6 },
		});
	}

	const {
		fourReward,
		sixerReward,
		wicketTakenReward,
		winMarginReward,
		totalEarnings,
		totalXP,
	} = cricketMatchRewards(gameState);

	const clearGameState = () => {
		localStorage.removeItem('cricketGameState');
		queryClient.invalidateQueries({ queryKey: ['cricketGameState'] });
	};

	const getResultColor = () => {
		switch (matchResult.winner) {
			case 'player':
				return 'text-green-500';
			case 'opponent':
				return 'text-red-600';
			case 'tie':
				return 'text-yellow-600';
			default:
				return 'text-slate-200';
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
		<main className='space-y-4 flex flex-col justify-between p-3'>
			<GradientBorder className='space-y-2'>
				<SectionHeader
					title='Match'
					highlightedTitle='Summary'
					icon={SquareChartGantt}
				/>
				<section className='sub-card'>
					<div className='flex justify-between items-center'>
						<div className='text-center'>
							<div className='text-xs text-slate-400 mb-1 font-jetbrains'>
								Your Score
							</div>
							<div className='text-4xl font-bold text-white font-exo2'>
								{player.runs}/{player.wickets}
							</div>
							<div className='text-xs text-slate-400 mt-1 tracking-wider'>
								({player.oversPlayed})
							</div>
						</div>
						<div className='text-4xl font-bold text-cyan-400'>VS</div>
						<div className='text-center'>
							<div className='text-xs text-slate-400 mb-1 font-jetbrains'>
								Opponent Score
							</div>
							<div className='text-4xl font-bold text-white font-exo2'>
								{opponent.runs}/{opponent.wickets}
							</div>
							<div className='text-xs text-slate-400 mt-1 tracking-wider'>
								({opponent.oversPlayed})
							</div>
						</div>
					</div>
				</section>

				<section className='grid grid-cols-3 gap-2'>
					<div className='grid grid-cols-2 gap-2'>
						<RunsComparisonChart />
						<RunsBarComparison />
					</div>

					<InfoCard
						iconSize={3}
						amount={gameState.player.sixes + gameState.opponent.sixes}
						icon={<FaSitrox />}
						color='yellow'
						title='Sixes'
						info={{
							title: 'Total Sixes',
							description: 'Total sixes hit in this match',
						}}
					/>
					<InfoCard
						iconSize={3}
						amount={gameState.player.fours + gameState.opponent.fours}
						icon={<FaFoursquare />}
						color='green'
						title='Fours'
						info={{
							title: 'Total Fours',
							description: 'Total fours hit in this match',
						}}
					/>
				</section>

				<section className={`sub-card space-y-1`}>
					<h3
						className={`text-2xl font-bold font-jetbrains ${getResultColor()} text-center `}
					>
						{getResultText()}
					</h3>
					<p className={`text-slate-300 text-center text-sm font-fira-code`}>
						{matchResult.winner === 'tie'
							? 'The match ended in a tie!'
							: `${
									matchResult.winner === 'player' ? 'You' : 'Opponent'
							  } won by ${matchResult.margin} ${matchResult.marginType}`}
					</p>
				</section>
			</GradientBorder>

			<GradientBorder className='space-y-3'>
				<SectionHeader title='Your' highlightedTitle='Rewards' icon={Gift} />

				<section className='grid grid-cols-2 gap-3'>
					<InfoCard
						amount={rewards !== null ? rewards : totalEarnings}
						icon={<PiCoinDuotone />}
						color='yellow'
						title={`Total ${token.name}`}
					/>
					<InfoCard
						amount={totalXP}
						icon={<FaSitrox />}
						color='green'
						title={'Total XP'}
					/>
				</section>

				<section className='grid grid-cols-2 gap-2 sub-card'>
					<InfoCard
						amount={sixerReward}
						icon={<FaSitrox />}
						color='green'
						title={'Sixes'}
					/>
					<InfoCard
						amount={fourReward}
						icon={<FaFoursquare />}
						color='green'
						title={'Four'}
					/>
					<InfoCard
						amount={wicketTakenReward}
						icon={<Award />}
						color='purple'
						title={'Wickets'}
					/>
					<InfoCard
						amount={winMarginReward}
						icon={<Trophy />}
						color='teal'
						title={'Win Margin'}
					/>
				</section>
			</GradientBorder>

			<section className='flex justify-between gap-3 main-card backdrop-blur-md sticky bottom-2 shadow-2xl'>
				<GameButton
					href='/miniapp'
					onClick={clearGameState}
					icon={<HomeIcon className='w-6 h-6' />}
				>
					Home
				</GameButton>
				<GameButton
					href='/game/cricket/match-setup'
					onClick={clearGameState}
					icon={<RotateCcw className='w-6 h-6' />}
				>
					Play Again
				</GameButton>
			</section>
		</main>
	);
}
