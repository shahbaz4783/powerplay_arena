interface ScoreCardProps {
	title: string;
	runs: number;
	ballsFaced: number;
	fours: number;
	sixes: number;
	textColor?: string;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({
	title,
	runs,
	ballsFaced,
	fours,
	sixes,
	textColor = 'blue-400',
}) => {
	return (
		<div className='space-y-2 sub-card'>
			<h3 className='text-sm  text-slate-400'>{title}</h3>
			<div className={`text-2xl font-bold text-${textColor}`}>
				{runs}
				<span className='text-xs text-slate-400 ml-1'>({ballsFaced})</span>
			</div>
			<div className='grid grid-cols-2 gap-2 text-xs text-slate-300'>
				<p>{fours} fours</p>
				<p className='text-right'>{sixes} sixes</p>
			</div>
		</div>
	);
};
