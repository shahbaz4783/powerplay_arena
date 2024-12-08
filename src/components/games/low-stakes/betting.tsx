import { useState } from 'react';
import { Coins } from 'lucide-react';

interface BettingComponentProps {
	selectedOption: string | null;
	betAmount: number;
	setBetAmount: (amount: number) => void;
	totalPasses: number;
}

export default function BettingComponent({
	selectedOption,
	betAmount,
	setBetAmount,
	totalPasses,
}: BettingComponentProps) {
	const [customAmount, setCustomAmount] = useState('');

	const handleBet = (amount: number) => {
		setBetAmount(betAmount + amount);
	};

	const handleCustomBet = () => {
		const amount = parseInt(customAmount);
		if (!isNaN(amount) && amount > 0) {
			setBetAmount(betAmount + amount);
			setCustomAmount('');
		}
	};

	// Calculate potential winnings (80% of total passes)
	const potentialWinnings = totalPasses * 0.8;

	return (
		<div className='mb-6'>
			<h3 className='text-lg font-semibold text-purple-400 mb-2'>
				Place Your Bet
			</h3>
			<div className='flex space-x-2 mb-4'>
				{[20, 50, 100, 200].map((amount) => (
					<button
						key={amount}
						className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50'
						onClick={() => handleBet(amount)}
						disabled={!selectedOption}
					>
						{amount}
					</button>
				))}
				<div className='flex'>
					<input
						type='number'
						className='w-24 px-2 py-1 bg-gray-700 text-white rounded-l'
						placeholder='Custom'
						value={customAmount}
						onChange={(e) => setCustomAmount(e.target.value)}
						disabled={!selectedOption}
					/>
					<button
						className='px-4 py-2 bg-blue-600 text-white rounded-r hover:bg-blue-700 disabled:opacity-50'
						onClick={handleCustomBet}
						disabled={!selectedOption}
					>
						Bet
					</button>
				</div>
			</div>
			<div className='flex justify-between items-center bg-gray-700 p-4 rounded-lg'>
				<div>
					<p className='text-gray-300'>Your Bet: {betAmount} passes</p>
					<p className='text-gray-300'>
						Prize Pool: {potentialWinnings.toFixed(0)} passes
					</p>
				</div>
				<Coins className='w-6 h-6 text-yellow-400' />
			</div>
		</div>
	);
}
