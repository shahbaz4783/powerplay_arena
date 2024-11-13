'use client';

import React, { useState, useEffect } from 'react';
import { Loader2, Zap, Target, Trophy } from 'lucide-react';
import { TIPS_AND_QUOTES } from '@/src/constants/game-texts';

export function LoadingUI() {
	const [quote, setQuote] = useState('');

	useEffect(() => {
		const randomIndex = Math.floor(Math.random() * TIPS_AND_QUOTES.length);
		setQuote(TIPS_AND_QUOTES[randomIndex]);
	}, []);

	return (
		<div className='min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden'>
			<div className='relative'>
				<div className='absolute inset-0 blur-3xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 opacity-30 animate-pulse'></div>
				<div className='relative z-10 bg-gray-900 bg-opacity-80 rounded-xl p-8 shadow-2xl'>
					<div className='flex items-center justify-center mb-6'>
						<div className='relative w-24 h-24'>
							<div className='absolute inset-0 border-4 border-cyan-300 border-t-cyan-600 rounded-full animate-spin'></div>
							<Loader2 className='w-full h-full text-cyan-500 animate-pulse' />
						</div>
					</div>
					<h1 className='text-3xl font-bold text-white mb-4 text-center'>
						Loading your game...
					</h1>
					<p className='text-cyan-300 text-center max-w-md mb-6'>{quote}</p>
					<div className='flex justify-center space-x-4'>
						<Zap className='w-6 h-6 text-yellow-400 animate-bounce' />
						<Target
							className='w-6 h-6 text-green-400 animate-bounce'
							style={{ animationDelay: '0.1s' }}
						/>
						<Trophy
							className='w-6 h-6 text-purple-400 animate-bounce'
							style={{ animationDelay: '0.2s' }}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
