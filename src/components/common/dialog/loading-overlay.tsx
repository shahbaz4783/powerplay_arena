import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingOverlayProps {
	variant?: 'pulse' | 'ripple' | 'orbital';
	initialMessage?: string;
	isOpen?: boolean;
	portalTarget?: HTMLElement;
}

const messages = [
	'Loading amazing content...',
	'Getting everything ready...',
	'Just a moment...',
	'Almost there...',
];

// Example 1: Pulse Loading
const PulseLoading = () => (
	<div className='w-80 md:w-96 h-52 bg-slate-800/95 rounded-2xl flex items-center justify-center relative overflow-hidden'>
		{/* Animated background pulses */}
		<div className='absolute inset-0 flex items-center justify-center'>
			<div className='w-40 h-40 bg-blue-500/20 rounded-full animate-[ping_3s_infinite]' />
			<div className='w-40 h-40 bg-purple-500/20 rounded-full animate-[ping_3s_infinite] delay-1000' />
		</div>

		{/* Spinner */}
		<div className='relative group'>
			<div className='w-20 h-20 transition-transform duration-300 group-hover:scale-110'>
				<div className='absolute inset-0 rounded-full border-4 border-slate-600/50 border-t-blue-500 animate-[spin_1s_linear_infinite]' />
				<div className='absolute inset-2 rounded-full border-4 border-slate-600/50 border-t-purple-500 animate-[spin_1.5s_linear_infinite]' />
				<div className='absolute inset-4 rounded-full border-4 border-slate-600/50 border-t-cyan-500 animate-[spin_2s_linear_infinite]' />
			</div>
			<Loader2 className='absolute inset-0 m-auto w-8 h-8 text-white animate-[pulse_2s_infinite]' />
		</div>
	</div>
);

// Example 2: Ripple Loading
const RippleLoading = () => (
	<div className='w-80 md:w-96 h-52 bg-slate-800/95 rounded-2xl flex items-center justify-center relative overflow-hidden'>
		{/* Ripple effects */}
		<div className='absolute inset-0 flex items-center justify-center'>
			{[...Array(3)].map((_, i) => (
				<div
					key={i}
					className='absolute w-32 h-32 border-4 border-blue-500/20 rounded-full animate-[ripple_2s_cubic-bezier(0,0.2,0.8,1)_infinite]'
					style={{
						animationDelay: `${i * 0.5}s`,
					}}
				/>
			))}
		</div>

		{/* Center content */}
		<div className='relative z-10 group'>
			<div className='w-16 h-16 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 animate-[spin_3s_linear_infinite] transition-transform duration-300 group-hover:scale-110'>
				<div className='absolute inset-1 rounded-full bg-slate-800 flex items-center justify-center'>
					<Loader2 className='w-8 h-8 text-white animate-[spin_2s_linear_infinite]' />
				</div>
			</div>
		</div>
	</div>
);

// Example 3: Orbital Loading
const OrbitalLoading = () => (
	<div className='w-80 md:w-96 h-52 bg-slate-800/95 rounded-2xl flex items-center justify-center relative overflow-hidden group'>
		{/* Orbital rings */}
		<div className='relative w-32 h-32 transition-transform duration-300 group-hover:scale-110'>
			<div className='absolute inset-0 rounded-full border-2 border-slate-700 border-dashed animate-[spin_10s_linear_infinite]' />
			<div className='absolute inset-4 rounded-full border-2 border-slate-700 border-dashed animate-[spin_8s_linear_infinite_reverse]' />
			<div className='absolute inset-8 rounded-full border-2 border-slate-700 border-dashed animate-[spin_6s_linear_infinite]' />

			{/* Orbiting dots */}
			<div className='absolute inset-0'>
				<div className='absolute top-0 left-1/2 w-3 h-3 -ml-1.5 bg-blue-500 rounded-full animate-[orbit_3s_linear_infinite]' />
			</div>
			<div className='absolute inset-4'>
				<div className='absolute top-0 left-1/2 w-3 h-3 -ml-1.5 bg-purple-500 rounded-full animate-[orbit_4s_linear_infinite]' />
			</div>
			<div className='absolute inset-8'>
				<div className='absolute top-0 left-1/2 w-3 h-3 -ml-1.5 bg-cyan-500 rounded-full animate-[orbit_5s_linear_infinite]' />
			</div>

			{/* Center */}
			<div className='absolute inset-0 m-auto w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center'>
				<div className='w-6 h-6 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 animate-[pulse_2s_infinite]' />
			</div>
		</div>
	</div>
);

export const LoadingOverlay = ({
	variant = 'pulse',
	initialMessage = messages[0],
	isOpen = true,
	portalTarget,
}: LoadingOverlayProps) => {
	const [currentMessage, setCurrentMessage] = useState(initialMessage);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		return () => setMounted(false);
	}, []);

	useEffect(() => {
		if (!isOpen) return;

		let messageIndex = 0;
		const messageInterval = setInterval(() => {
			messageIndex = (messageIndex + 1) % messages.length;
			setCurrentMessage(messages[messageIndex]);
		}, 3000);

		return () => clearInterval(messageInterval);
	}, [isOpen]);

	if (!mounted || !isOpen) return null;

	const content = (
		<div
			className='fixed inset-0 bg-slate-900/90 flex items-center justify-center z-[9999] backdrop-blur-sm'
			role='dialog'
			aria-modal='true'
			aria-labelledby='loading-message'
		>
			<div className='flex flex-col items-center gap-6 p-4 animate-[fadeIn_0.3s_ease-out]'>
				{variant === 'pulse' && <PulseLoading />}
				{variant === 'ripple' && <RippleLoading />}
				{variant === 'orbital' && <OrbitalLoading />}
				<p
					id='loading-message'
					className='text-lg text-slate-300 text-center animate-[pulse_2s_infinite] font-medium'
				>
					{currentMessage}
				</p>
			</div>
		</div>
	);

	return content;
};
