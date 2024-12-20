'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/src/components/ui/tabs';
import { MATCH_FORMATS } from '@/src/constants/app-config';
import { useCricketStats } from '@/src/hooks/useUserData';
import { useCurrentUser } from '@/src/hooks/useCurrentUser';
import { OverallPerformance } from './performance';
import { BattingStats } from './batting-stats';
import { BowlingStats } from './bowling-stats';

interface MatchStats {
	matchesPlayed: number;
	matchesWon: number;
	matchesLost: number;
	matchesTie: number;
}

interface GameModeContentProps {
	gameMode: 'BLITZ' | 'POWERPLAY' | 'CLASSIC';
}

const GameModeContent: React.FC<GameModeContentProps> = ({ gameMode }) => {
	const { telegramId } = useCurrentUser();
	const { data: stats } = useCricketStats(telegramId, gameMode);

	const defaultStats: MatchStats = {
		matchesPlayed: 0,
		matchesWon: 0,
		matchesLost: 0,
		matchesTie: 0,
	};

	const { matchesPlayed, matchesWon, matchesLost, matchesTie } =
		stats || defaultStats;

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.5 }}
			className='space-y-4'
		>
			<OverallPerformance
				won={matchesWon}
				lost={matchesLost}
				tie={matchesTie}
				total={matchesPlayed}
			/>

			<BattingStats gameMode={gameMode} />
			<BowlingStats gameMode={gameMode} />
		</motion.div>
	);
};

const CricketStatsPage: React.FC = () => {
	return (
		<div className='min-h-screen bg-background text-foreground p-4 max-w-[480px] mx-auto'>
			<Tabs defaultValue='BLITZ' className='w-full'>
				<TabsList className='grid grid-cols-3 mb-8 gap-4 rounded-xl bg-slate-400 h-auto'>
					{Object.entries(MATCH_FORMATS).map(([key, format]) => (
						<TabsTrigger
							key={key}
							value={key}
							className='flex flex-col items-center rounded-xl justify-center p-4 bg-gradient-to-br text-gray-900'
						>
							<span className='font-bold uppercase'>{format.format}</span>
						</TabsTrigger>
					))}
				</TabsList>
				<TabsContent value='BLITZ'>
					<GameModeContent gameMode='BLITZ' />
				</TabsContent>
				<TabsContent value='POWERPLAY'>
					<GameModeContent gameMode='POWERPLAY' />
				</TabsContent>
				<TabsContent value='CLASSIC'>
					<GameModeContent gameMode='CLASSIC' />
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default CricketStatsPage;
