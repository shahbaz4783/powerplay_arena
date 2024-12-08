'use client';

import { useState, useEffect } from 'react';
import { Zap, Award, AlertTriangle, Users, Coins } from 'lucide-react';
import CountdownTimer from './countdown';
import OptionSelection from './options';
import BettingComponent from './betting';
import ResultsDisplay from './result';

const options = ['A', 'B', 'C', 'D'];

export default function UnderdogTriumph() {
	const [selectedOption, setSelectedOption] = useState<string | null>(null);
	const [betAmount, setBetAmount] = useState<number>(0);
	const [gameEnded, setGameEnded] = useState<boolean>(false);
	const [winningOption, setWinningOption] = useState<string | null>(null);

	// Simulated data - replace with actual data from your backend
	const [gameStats, setGameStats] = useState({
		totalParticipants: 28,
		totalPasses: 166,
	});

	const handleGameEnd = () => {
		setGameEnded(true);
	};

	return (
		<div className='rounded-lg backdrop-blur-sm shadow-xl mt-6'>
			<div className='flex justify-between items-center mb-6'>
				<div className='flex items-center'>
					<Zap className='w-6 h-6 text-yellow-400 mr-2' />
					<span className='text-yellow-400 font-bold'>Your Stars: 1000</span>
				</div>
				<CountdownTimer onGameEnd={handleGameEnd} />
			</div>

			<div className='grid grid-cols-2 gap-4 mb-6'>
				<div className='bg-gray-700 p-4 rounded-lg flex items-center justify-between'>
					<div className='flex items-center'>
						<Users className='w-5 h-5 text-cyan-400 mr-2' />
						<span className='text-gray-300'>Participants</span>
					</div>
					<span className='text-xl font-bold text-cyan-400'>
						{gameStats.totalParticipants}
					</span>
				</div>
				<div className='bg-gray-700 p-4 rounded-lg flex items-center justify-between'>
					<div className='flex items-center'>
						<Coins className='w-5 h-5 text-yellow-400 mr-2' />
						<span className='text-gray-300'>Total Passes</span>
					</div>
					<span className='text-xl font-bold text-yellow-400'>
						{gameStats.totalPasses}
					</span>
				</div>
			</div>

			<OptionSelection
				options={options}
				selectedOption={selectedOption}
				setSelectedOption={setSelectedOption}
			/>

			<BettingComponent
				selectedOption={selectedOption}
				betAmount={betAmount}
				setBetAmount={setBetAmount}
				totalPasses={gameStats.totalPasses}
			/>

			{/* {gameEnded && winningOption && (
				<ResultsDisplay winningOption={winningOption} gameStats={gameStats} />
			)} */}

			<div className='mt-6 bg-gray-700 p-4 rounded-lg'>
				<h3 className='text-lg font-semibold text-purple-400 mb-2 flex items-center'>
					<Award className='w-5 h-5 mr-2' />
					How It Works
				</h3>
				<ul className='list-disc list-inside text-gray-300 space-y-2'>
					<li>
						Select an option and bet your passes (1 pass = 20 Telegram stars)
					</li>
					<li>The least chosen option wins</li>
					<li>Winners share 80% of the total bet amount</li>
					<li>Game runs from Monday 00:00 UTC to Sunday 23:59:59 UTC</li>
				</ul>
			</div>

			<div className='mt-6 bg-gray-700 p-4 rounded-lg'>
				<h3 className='text-lg font-semibold text-yellow-400 mb-2 flex items-center'>
					<AlertTriangle className='w-5 h-5 mr-2' />
					Special Cases
				</h3>
				<ul className='list-disc list-inside text-gray-300 space-y-2'>
					<li>If an option isn't chosen, it's excluded from winning</li>
					<li>In case of a tie, winnings are split equally</li>
				</ul>
			</div>
		</div>
	);
}
