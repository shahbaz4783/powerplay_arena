'use client';

import { useState, useEffect, useActionState } from 'react';
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/src/components/ui/tabs';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/src/components/ui/dialog';
import { Button } from '@/src/components/ui/button';

import {
	Zap,
	Target,
	Trophy,
	Award,
	Clock,
	Bolt,
	Shield,
	Info,
	Flag,
	Circle,
	Coins,
	Ticket,
} from 'lucide-react';
import { MATCH_FORMATS, token } from '@/src/constants/app-config';
import { useCricketGameState } from '@/src/lib/store';
import { MatchFormat } from '@prisma/client';
import { useCurrentUser } from '@/src/hooks/useCurrentUser';
import { useRouter } from 'next/navigation';
import { setupCricketMatch } from '@/src/actions/game.action';
import { IconButton } from '../../common/buttons/primary-button';
import LoadingCricketGame from '@/src/app/game/cricket/match-setup/loading';
import { GameHeader } from '../../layouts/global/game-header';
import { InfoCard } from '../../common/cards/info-card';
import { PiBaseballCap, PiCricketBold } from 'react-icons/pi';
import { useCricketStats, useUserInventory } from '@/src/hooks/useUserData';
import { GameBalanceCard } from '../../common/cards/balance-card';
import { GradientBorder } from '../../common/elements/gradient-border';
import { BackgroundPattern } from '../../common/elements/background-pattern';
import { SectionHeader } from '../../common/elements/section-header';
import { LoadingOverlay } from '../../common/dialog/loading-overlay';
import { GameLoadingScreen } from '../../layouts/global/game-loading-screen';

export function QuickPlayMode() {
	const [selectedFormat, setSelectedFormat] = useState<MatchFormat>('BLITZ');
	const { telegramId } = useCurrentUser();
	const { updateGameState } = useCricketGameState();

	const { data: stats, isPending: isStatsLoading } = useCricketStats(
		telegramId,
		selectedFormat
	);
	if (isStatsLoading) {
		<GameLoadingScreen gameType='powerStrike' />;
	}
	const winRate = ((stats?.matchesWon ?? 0) / stats?.matchesPlayed!) * 100 || 0;

	const { data, isPending } = useUserInventory(telegramId);

	const [response, formAction, isLoading] = useActionState(
		setupCricketMatch.bind(null, telegramId),
		{
			success: false,
			message: '',
			data: {
				matchId: '',
			},
		}
	);

	useEffect(() => {
		const format = MATCH_FORMATS[selectedFormat];
		if (format) {
			updateGameState({
				matchSetup: format,
			});
		}
	}, [selectedFormat, updateGameState]);

	const router = useRouter();

	useEffect(() => {
		if (response.success) {
			updateGameState({
				matchId: response.data?.matchId,
				gamePhase: 'toss',
				matchSetup: MATCH_FORMATS[selectedFormat],
			});
			router.push(`/game/cricket/match-setup/${response.message}`);
		}
	}, [
		response.success,
		response.data?.matchId,
		response.message,
		selectedFormat,
		updateGameState,
		router,
	]);

	const handleFormatChange = (format: string) => {
		setSelectedFormat(format as MatchFormat);
	};

	const handleSubmit = (formData: FormData) => {
		const format = MATCH_FORMATS[selectedFormat];
		if (format) {
			formData.append('entryFee', format.entryFee.toString());
			formData.append('passRequired', format.passRequired.toString());
			formData.append('overs', format.overs.toString());
			formData.append('format', format.format);
		}
		formAction(formData);
	};

	if (response.success) {
		return <LoadingCricketGame />;
	}

	return (
		<main className='min-h-svh flex flex-col justify-between border'>
			<BackgroundPattern />
			{/* Header Section */}
			<section className='space-y-2'>
				<GameHeader
					title='Power Strike'
					icon={Circle}
					hasUnsavedProgress={false}
					quitPath='/miniapp'
					iconColors='from-blue-400 to-blue-600'
					titleGradient='from-blue-200 via-blue-300 to-blue-400'
				/>
				<GradientBorder className='grid grid-cols-2 gap-3 mx-3'>
					<GameBalanceCard
						value={data?.powerCoin!}
						label='Coin Balance'
						type='balance'
						variant='green'
						isLoading={isPending}
					/>
					<GameBalanceCard
						value={data?.powerPass!}
						label='Pass Balance'
						type='pass'
						variant='amber'
						isLoading={isPending}
					/>
				</GradientBorder>
			</section>
			<section className='p-3 space-y-3'>
				<Tabs
					value={selectedFormat}
					onValueChange={handleFormatChange}
					className='space-y-2'
				>
					<TabsList className='block space-y-4'>
						<SectionHeader
							title='Choose Format'
							description='Choose the format and dominate the pitch!'
							icon={Award}
						/>
						<div className='grid grid-cols-3 gap-2 '>
							{Object.entries(MATCH_FORMATS).map(([key, format]) => (
								<TabsTrigger
									key={key}
									value={key}
									className='flex flex-col gap-1 items-center rounded-xl justify-center'
								>
									<FormatIcon format={format.format} className='w-5 h-5 ' />
									<span className='font-bold uppercase'>{format.format}</span>
								</TabsTrigger>
							))}
						</div>
					</TabsList>
					{Object.entries(MATCH_FORMATS).map(([key, format]) => (
						<TabsContent key={key} value={key} className='space-y-4'>
							<GradientBorder className='space-y-2'>
								<div className='grid grid-cols-2 gap-3'>
									<InfoCard
										title={'Match Played'}
										amount={stats?.matchesPlayed ?? 0}
										color='teal'
										isLoading={isStatsLoading}
										icon={<PiBaseballCap />}
									/>
									<InfoCard
										title='Win Rate'
										amount={`${winRate.toFixed(2)}%`}
										color={
											winRate < 30 ? 'red' : winRate >= 70 ? 'green' : 'yellow'
										}
										isLoading={isStatsLoading}
										icon={<PiBaseballCap />}
									/>
									<InfoCard
										title='Total Runs'
										amount={stats?.runsScored ?? 0}
										color='teal'
										isLoading={isStatsLoading}
										icon={<PiBaseballCap />}
									/>
									<InfoCard
										title='High Score'
										amount={stats?.highestRunsScored ?? 0}
										color='teal'
										isLoading={isStatsLoading}
										icon={<PiBaseballCap />}
									/>
								</div>
								<div className='sub-card'>
									<h4 className='text-lg font-semibold font-jetbrains mb-4 text-center'>
										Match Details
									</h4>
									<div className='grid grid-cols-2 gap-2'>
										<InfoCard
											title='Overs'
											icon={<PiBaseballCap />}
											color='teal'
											amount={format.overs}
											info={{
												title: 'What are Overs?',
												description: `An over in cricket consists of 6 legal balls bowled by a bowler.
											
											This match has ${
												format.overs
											} overs per team, meaning each team will face maximum ${
													format.overs * 6
												} balls total.`,
											}}
										/>
										<InfoCard
											title='Max Wickets'
											icon={<PiCricketBold />}
											color='teal'
											amount={format.totalWickets}
											info={{
												title: 'What are Wickets?',
												description: `Wickets are how teams get batters "out" in cricket.
											
											This match starts with ${format.totalWickets} wickets. Once a team loses all their wickets, their batting innings is over.`,
											}}
										/>
										<InfoCard
											title='Pass Required'
											icon={<Ticket />}
											color='pink'
											amount={format.passRequired}
										/>
										<InfoCard
											title={`Entry Fees ${token.symbol}`}
											icon={<Coins />}
											color='pink'
											amount={format.entryFee}
										/>
									</div>
								</div>
							</GradientBorder>

							<div className='flex justify-center'>
								<Dialog>
									<DialogTrigger asChild>
										<Button
											variant='outline'
											className='rounded-xl flex items-center gap-2'
										>
											<Info className='w-4 h-4' />
											View Reward Structure
										</Button>
									</DialogTrigger>
									<DialogContent className='w-11/12 rounded-xl'>
										<DialogHeader>
											<DialogTitle>Reward Structure</DialogTitle>
										</DialogHeader>
										<div className='grid grid-cols-2 gap-4 mt-4'>
											<InfoCard
												title='Six'
												icon={<Zap />}
												color='orange'
												amount={format.rewards.six}
												info={{
													title: 'Sixer Reward',
													description: `Example: If you hits 5 sixes in this match, you'll earn ${
														format.rewards.six * 5
													} coins.`,
												}}
											/>

											<InfoCard
												title='Four'
												icon={<Target />}
												color='orange'
												amount={format.rewards.four}
												info={{
													title: 'Four Reward',
													description: `Example: If you hits 7 fours in this match, you'll earn ${
														format.rewards.four * 7
													} coins.`,
												}}
											/>

											<InfoCard
												title='Wicket'
												icon={<Award />}
												color='green'
												amount={format.rewards.wicket}
												info={{
													title: 'Wicket Reward Points',
													description: `Example: Taking ${
														format.totalWickets > 2
															? format.totalWickets - 2
															: format.totalWickets
													} wickets will earn you ${
														format.rewards.wicket *
														(format.totalWickets > 2
															? format.totalWickets - 2
															: format.totalWickets)
													} coins.`,
												}}
											/>

											<InfoCard
												title='Victory Margin'
												icon={<Trophy />}
												color='teal'
												amount={format.rewards.runMargin}
												info={{
													title: 'Victory Margin Rewards',
													description: `For runs: If you win by 20 runs, you get ${
														format.rewards.runMargin * 20
													} coins. 

													For wickets: If you win by ${
														format.totalWickets > 2
															? format.totalWickets - 2
															: format.totalWickets
													} wickets, you get ${
														format.rewards.wicket *
														(format.totalWickets > 2
															? format.totalWickets - 2
															: format.totalWickets)
													} coins.`,
												}}
											/>
										</div>
									</DialogContent>
								</Dialog>
							</div>

							<section className='main-card grid grid-cols-2 sticky bottom-3 '>
								<div className='flex flex-col gap-1'>
									<span className='text-xs text-slate-400 font-jetbrains'>
										Required
									</span>
									<div className='flex items-center gap-2'>
										<Coins className='w-4 h-4 text-yellow-400' />
										<span className='font-bold'>{format.entryFee}</span>

										<Ticket className='w-4 h-4 text-purple-400 ml-2' />
										<span className='font-bold'>{format.passRequired}</span>
									</div>
								</div>
								<form action={handleSubmit}>
									<IconButton
										text={'Start Match'}
										loadingText='Initiating...'
										icon={Flag}
										isLoading={isLoading}
									/>
								</form>
							</section>
						</TabsContent>
					))}
				</Tabs>
				<LoadingOverlay isOpen={isLoading} scene='cricket' />
			</section>
		</main>
	);
}

// Match Format Icons
function FormatIcon({
	format,
	className,
}: {
	format: MatchFormat;
	className?: string;
}) {
	switch (format) {
		case 'BLITZ':
			return <Bolt className={className} />;
		case 'POWERPLAY':
			return <Trophy className={className} />;
		case 'CLASSIC':
			return <Shield className={className} />;
		default:
			return <Clock className={className} />;
	}
}
