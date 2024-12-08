'use client';

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
	onGameEnd: () => void;
}

export default function CountdownTimer({ onGameEnd }: CountdownTimerProps) {
	const [timeLeft, setTimeLeft] = useState(getTimeUntilNextSunday());

	useEffect(() => {
		const timer = setInterval(() => {
			const newTimeLeft = getTimeUntilNextSunday();
			setTimeLeft(newTimeLeft);
			if (newTimeLeft <= 0) {
				onGameEnd();
				clearInterval(timer);
			}
		}, 1000);

		return () => clearInterval(timer);
	}, [onGameEnd]);

	function getTimeUntilNextSunday() {
		const now = new Date();
		const nextSunday = new Date(now);
		nextSunday.setUTCDate(now.getUTCDate() + (7 - now.getUTCDay()));
		nextSunday.setUTCHours(23, 59, 59, 999);
		return Math.max(0, nextSunday.getTime() - now.getTime());
	}

	const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
	const hours = Math.floor(
		(timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
	);
	const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

	return (
		<div className='flex items-center text-cyan-400'>
			<Clock className='w-5 h-5 mr-2' />
			<span className='font-mono text-lg'>
				{days}d {hours}h {minutes}m {seconds}s
			</span>
		</div>
	);
}
