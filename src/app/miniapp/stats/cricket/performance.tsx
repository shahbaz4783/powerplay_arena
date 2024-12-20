import { GradientBorder } from '@/src/components/common/elements/gradient-border';
import { Crown, Percent, Repeat2Icon, Target, TrophyIcon } from 'lucide-react';
import { type LucideIcon } from 'lucide-react';

interface OverallPerformanceProps {
	won: number;
	lost: number;
	tie: number;
	total: number;
}

export function OverallPerformance({
	won,
	lost,
	tie,
	total,
}: OverallPerformanceProps) {
	const winRate = total > 0 ? (won / total) * 100 : 0;

	const stats = [
		{
			icon: TrophyIcon,
			label: 'Total Played',
			value: total,
			bgColor: 'bg-purple-900/30',
			textColor: 'text-purple-300',
		},
		{
			icon: Crown,
			label: 'Victories',
			value: won,
			bgColor: 'bg-green-900/30',
			textColor: 'text-green-300',
		},
		{
			icon: Target,
			label: 'Defeats',
			value: lost,
			bgColor: 'bg-red-900/30',
			textColor: 'text-red-300',
		},
		{
			icon: Repeat2Icon,
			label: 'Ties',
			value: tie,
			bgColor: 'bg-blue-900/30',
			textColor: 'text-blue-300',
		},
	];

	return (
		<GradientBorder className='bg-slate-800/50 backdrop-blur-md rounded-xl shadow-lg grid grid-cols-2 gap-4 p-4'>
			<section className='col-span-2 bg-yellow-900/30 rounded-xl p-4 flex justify-between items-center'>
				<div className='flex items-center space-x-3'>
					<TrophyIcon className='w-8 h-8 text-yellow-400' />
					<span className='text-sm font-mono text-yellow-300'>Win Rate</span>
				</div>
				<div className='flex items-center text-2xl font-bold font-mono text-yellow-400 glow'>
					<span className=''>{winRate.toFixed(1)}</span>
					<Percent />
				</div>
			</section>

			{stats.map((stat, index) => (
				<PerformanceStatCard key={index} {...stat} />
			))}
		</GradientBorder>
	);
}

interface StatCardProps {
	label: string;
	value: number | string;
	bgColor: string;
	textColor: string;
}

export function PerformanceStatCard({
	label,
	value,
	bgColor,
	textColor,
}: StatCardProps) {
	return (
		<section
			className={`${bgColor} rounded-xl p-4 flex flex-col items-center justify-center`}
		>
			<span className={`text-xs font-mono ${textColor}`}>{label}</span>
			<span className={`text-3xl font-bold font-mono ${textColor} glow`}>
				{value}
			</span>
		</section>
	);
}
