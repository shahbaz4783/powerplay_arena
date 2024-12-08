import { Trophy } from 'lucide-react';

interface ResultsDisplayProps {
	winningOption: string;
	optionData: Record<string, { users: number; totalBet: number }>;
}

export default function ResultsDisplay({
	winningOption,
	optionData,
}: ResultsDisplayProps) {
	const totalBet = Object.values(optionData).reduce(
		(sum, option) => sum + option.totalBet,
		0
	);
	const winningPot = totalBet * 0.8;
	const winningBetAmount = optionData[winningOption].totalBet;

	return (
		<div className='bg-gray-700 p-6 rounded-lg mb-6'>
			<h3 className='text-2xl font-bold text-yellow-400 mb-4 flex items-center'>
				<Trophy className='w-6 h-6 mr-2' />
				Game Results
			</h3>
			<p className='text-lg text-white mb-2'>
				Winning Option:{' '}
				<span className='font-bold text-purple-400'>{winningOption}</span>
			</p>
			<p className='text-gray-300 mb-2'>Total Bet: {totalBet} passes</p>
			<p className='text-gray-300 mb-2'>Winning Pot: {winningPot} passes</p>
			<p className='text-gray-300 mb-4'>
				Payout Ratio: {(winningPot / winningBetAmount).toFixed(2)}x
			</p>
			<div className='bg-gray-800 p-4 rounded-lg'>
				<h4 className='text-lg font-semibold text-purple-400 mb-2'>
					Option Statistics
				</h4>
				{Object.entries(optionData).map(([option, data]) => (
					<div key={option} className='flex justify-between text-gray-300 mb-1'>
						<span>Option {option}:</span>
						<span>
							{data.users} users, {data.totalBet} passes
						</span>
					</div>
				))}
			</div>
		</div>
	);
}
