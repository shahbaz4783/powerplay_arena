'use client';

import { useState, useEffect, useActionState } from 'react';
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/src/components/ui/tabs';
import {
	Table,
	TableBody,
	TableCell,
	TableRow,
} from '@/src/components/ui/table';
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
	PlayCircle,
	Flag,
	Circle,
	Coins,
	Ticket,
} from 'lucide-react';
import { MATCH_FORMATS, token } from '@/src/constants/app-config';
import { RewardItem } from '../../common/cards/reward-card';
import { useCricketGameState } from '@/src/lib/store';
import { SubmitButton } from '../../common/buttons/submit-button';
import { Header } from '../../common/elements/header';
import { MatchFormat } from '@prisma/client';
import { useCurrentUser } from '@/src/hooks/useCurrentUser';
import { useRouter } from 'next/navigation';
import { MessageCard } from '../../common/cards/message-card';
import { setupCricketMatch } from '@/src/actions/game.action';
import { IconButton } from '../../common/buttons/primary-button';
import LoadingCricketGame from '@/src/app/game/cricket/match-setup/loading';
import { GameHeader } from '../../layouts/global/game-header';
import { RewardDialog } from '../../common/dialog/match-reward';
import { InfoCard } from '../../common/cards/info-card';
import { PiBaseballCap, PiCricketBold, PiCricketThin } from 'react-icons/pi';
import { useUserInventory } from '@/src/hooks/useUserData';
import { GameBalanceCard } from '../../common/cards/balance-card';

export function QuickPlayMode() {
	const [selectedFormat, setSelectedFormat] = useState<MatchFormat>('BLITZ');
	const { telegramId } = useCurrentUser();
	const { updateGameState } = useCricketGameState();

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
		<main className='min-h-svh flex flex-col justify-between'>
			<GameHeader
				title='Power Strike'
				icon={Circle}
				hasUnsavedProgress={false}
				quitPath='/miniapp'
				iconColors='from-blue-400 to-blue-600'
				titleGradient='from-blue-200 via-blue-300 to-blue-400'
			/>
			<section className='p-3 space-y-3'>
				<div className='grid grid-cols-2 gap-3 sub-card backdrop-blur-sm'>
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
				</div>
				<Tabs
					value={selectedFormat}
					onValueChange={handleFormatChange}
					className='w-full'
				>
					<TabsList className='grid grid-cols-3 gap-4 rounded-xl h-auto'>
						{Object.entries(MATCH_FORMATS).map(([key, format]) => (
							<TabsTrigger
								key={key}
								value={key}
								className='flex flex-col items-center rounded-xl justify-center p-3'
							>
								<FormatIcon format={format.format} className='w-6 h-6 ' />
								<span className='font-bold uppercase'>{format.format}</span>
							</TabsTrigger>
						))}
					</TabsList>
					{Object.entries(MATCH_FORMATS).map(([key, format]) => (
						<TabsContent key={key} value={key} className='space-y-4'>
							<h4 className='text-lg font-semibold mb-4 text-center'>
								Match Details
							</h4>
							<div className='sub-card grid grid-cols-2 gap-2 backdrop-blur-md p-3 rounded-xl'>
								<InfoCard
									title='Overs'
									icon={<PiBaseballCap />}
									color='blue'
									amount={format.overs}
								/>
								<InfoCard
									title='Max Wickets'
									icon={<PiCricketBold />}
									color='blue'
									amount={format.totalWickets}
								/>
								<InfoCard
									title='Pass Required'
									icon={<Ticket />}
									color='blue'
									amount={format.passRequired}
								/>
								<InfoCard
									title='Entry Fees (PWR)'
									icon={<Coins />}
									color='blue'
									amount={format.entryFee}
								/>
							</div>

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
											<RewardItem
												icon={Zap}
												label='Six'
												value={format.rewards.six}
											/>
											<RewardItem
												icon={Target}
												label='Four'
												value={format.rewards.four}
											/>
											<RewardItem
												icon={Award}
												label='Wicket'
												value={format.rewards.wicket}
											/>
											<RewardItem
												icon={Trophy}
												label='Run Margin'
												value={format.rewards.runMargin}
											/>
										</div>
									</DialogContent>
								</Dialog>
							</div>

							<section className='sub-card flex justify-between backdrop-blur-sm p-3 sticky bottom-3 '>
								<div className='flex flex-col gap-1'>
									<span className='text-sm text-slate-400'>Required</span>
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
			</section>
		</main>
	);
}

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
