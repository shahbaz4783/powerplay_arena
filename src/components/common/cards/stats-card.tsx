import { cn } from '@/src/lib/utils';
import { Card, CardContent } from '../../ui/card';

interface StatsCardProps {
	title: string;
	value: number | string;
	color?: string;
	className?: string;
}
export function StatCard({
	title,
	value,
	color = 'from-blue-500 to-cyan-300',
	className,
}: StatsCardProps) {
	return (
		<Card
			className={cn(
				'rounded-xl border-none bg-slate-800/50 backdrop-blur-md',
				className
			)}
		>
			<CardContent className='p-6'>
				<div className='flex items-center justify-between'>
					<div>
						<p className='text-xs text-gray-400'>{title}</p>
						<p
							className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${color}`}
						>
							{value}
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
