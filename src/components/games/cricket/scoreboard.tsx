import { Badge } from '@/src/components/ui/badge';
import { Progress } from '@/src/components/ui/progress';
import { useCricketGameState } from '@/src/lib/store';
import { getCurrentInningsData } from '@/src/lib/game-logics';
import { GradientBorder } from '../../common/elements/gradient-border';
import { BackgroundPattern } from '../../common/elements/background-pattern';

export function ScoreBoard() {
	const { gameState } = useCricketGameState();
	const {
		matchSetup: { overs },
	} = gameState;

	const { runs, runRate, wickets, oversPlayed, ballsFaced } =
		getCurrentInningsData(gameState);
	return (
		<GradientBorder className='space-y-4 sticky top-3 z-[100]'>
			<div className='flex justify-between items-center text-slate-200'>
				<div>
					<p className='text-4xl font-bold font-exo2'>
						{runs}/{wickets}
					</p>
				</div>
				<Badge
					variant='outline'
					className='text-blue-400 border-blue-400 font-jetbrains py-1 px-3'
				>
					{gameState.currentInnings === 1 ? '1st Innings' : '2nd Innings'}
				</Badge>
				<BackgroundPattern />
			</div>
			<div className='flex justify-between'>
				<div className='space-x-1'>
					<span className='text-sm text-slate-400 font-jetbrains'>Over:</span>
					<span className='text-slate-300 font-exo2'>{oversPlayed}</span>
					<span className='text-slate-300 font-exo2'>({overs})</span>
				</div>
				<div className='space-x-1'>
					<span className='text-sm text-slate-400 font-exo2'>Run Rate:</span>
					<span className='text-slate-300 font-exo2'>{runRate}</span>
				</div>
			</div>
			<Progress value={(ballsFaced / (overs * 6)) * 100} className='h-1' />
		</GradientBorder>
	);
}
