import React, { useState, useEffect } from 'react';
import { Loader2, Sparkles } from 'lucide-react';

type ThemeColor = 'blue' | 'purple' | 'green' | 'orange' | 'gold' | 'rainbow';
type LoadingScene =
	| 'cricket'
	| 'coinFlip'
	| 'purchase'
	| 'exchange'
	| 'saving'
	| 'victory'
	| 'generic';

interface LoadingOverlayProps {
	variant?: 'neon' | 'prism' | 'flux';
	scene?: LoadingScene;
	isOpen?: boolean;
	theme?: ThemeColor;
	customMessages?: string[];
	title?: string;
	subtitle?: string;
}

// Enhanced scene-specific messages
const sceneMessages: Record<LoadingScene, string[]> = {
	cricket: [
		'⚡ Powering up the stadium...',
		'🏏 Rolling the pitch...',
		'🎯 Setting up wickets...',
		'📊 Loading match stats...',
		'🌟 Preparing for an epic match...',
	],
	coinFlip: [
		'✨ Fortune awaits...',
		'🎲 Testing your luck...',
		'🌟 The coin dances in the air...',
		'🎯 Destiny is spinning...',
		'💫 Magic in motion...',
	],
	purchase: [
		'💎 Securing your treasure...',
		'✨ Processing magic...',
		'🌟 Creating something special...',
		'🎁 Wrapping up your goodies...',
		'⚡ Almost there...',
	],
	exchange: [
		'💫 Converting your power...',
		'⚡ Channeling energy...',
		'✨ Transforming assets...',
		'🌟 Making the exchange...',
		'💎 Perfecting the balance...',
	],
	saving: [
		'💾 Preserving your glory...',
		'🏆 Recording achievements...',
		'⚡ Securing your legacy...',
		'✨ Saving your journey...',
		'🌟 Making it permanent...',
	],
	victory: [
		'🏆 Preparing your triumph...',
		'🌟 Calculating rewards...',
		'💫 Creating memories...',
		'✨ Glory awaits...',
		'🎉 Almost ready to celebrate...',
	],
	generic: [
		'✨ Creating magic...',
		'💫 Preparing wonders...',
		'⚡ Loading excitement...',
		'🌟 Almost there...',
		'✨ Making it awesome...',
	],
};

// Enhanced Neon Animation
const NeonLoading = ({ theme }: { theme: ThemeColor }) => (
	<div className='relative w-52 h-52 flex items-center justify-center'>
		{/* Glowing background effect */}
		<div className='absolute inset-0 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-full animate-[pulse_3s_ease-in-out_infinite]' />

		{/* Neon rings */}
		<div className='relative w-40 h-40'>
			{[...Array(3)].map((_, i) => (
				<div
					key={i}
					className={`absolute inset-0 rounded-full border-2 
          ${
						theme === 'rainbow'
							? 'border-transparent bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500'
							: `border-${theme}-500/70`
					}`}
					style={{
						transform: `scale(${1 + i * 0.2}) rotate(${i * 30}deg)`,
						animation: `neonPulse ${2 + i}s ease-in-out infinite`,
						filter: 'blur(1px)',
					}}
				/>
			))}

			{/* Floating particles */}
			{[...Array(12)].map((_, i) => (
				<div
					key={`particle-${i}`}
					className={`absolute w-2 h-2 rounded-full 
          ${
						theme === 'rainbow'
							? 'bg-gradient-to-r from-pink-500 to-purple-500'
							: `bg-${theme}-500`
					}`}
					style={{
						left: `${50 + Math.cos(i * 30) * 50}%`,
						top: `${50 + Math.sin(i * 30) * 50}%`,
						animation: `floatParticle ${3 + (i % 2)}s ease-in-out infinite`,
						animationDelay: `${i * 0.2}s`,
					}}
				/>
			))}

			{/* Center piece */}
			<div className='absolute inset-0 m-auto w-20 h-20'>
				<div
					className={`w-full h-full rounded-xl 
          ${
						theme === 'rainbow'
							? 'bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500'
							: `bg-${theme}-500`
					}
          animate-[spin_4s_linear_infinite]`}
				>
					<div className='absolute inset-1 rounded-lg bg-slate-900 flex items-center justify-center'>
						<Sparkles className='w-10 h-10 text-white animate-[pulse_2s_infinite]' />
					</div>
				</div>
			</div>
		</div>
	</div>
);

// Prism Loading Effect
const PrismLoading = ({ theme }: { theme: ThemeColor }) => (
	<div className='relative w-52 h-52'>
		{/* Prismatic layers */}
		<div className='absolute inset-0 flex items-center justify-center'>
			{[...Array(6)].map((_, i) => (
				<div
					key={i}
					className={`absolute w-32 h-32 transform rotate-${i * 15} 
          ${
						theme === 'rainbow'
							? 'bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500'
							: `bg-${theme}-500`
					} 
          opacity-20 rounded-xl`}
					style={{
						animation: `prismRotate ${6 + i}s linear infinite`,
						filter: 'blur(2px)',
					}}
				/>
			))}
		</div>

		{/* Dynamic particles */}
		<div className='absolute inset-0'>
			{[...Array(20)].map((_, i) => (
				<div
					key={`sparkle-${i}`}
					className={`absolute w-1 h-1 rounded-full 
          ${
						theme === 'rainbow'
							? 'bg-gradient-to-r from-pink-500 to-purple-500'
							: `bg-${theme}-500`
					}`}
					style={{
						left: `${Math.random() * 100}%`,
						top: `${Math.random() * 100}%`,
						animation: `sparkle ${2 + Math.random() * 2}s ease-in-out infinite`,
						animationDelay: `${i * 0.1}s`,
					}}
				/>
			))}
		</div>

		{/* Center icon */}
		<div className='absolute inset-0 m-auto w-24 h-24 rounded-2xl overflow-hidden backdrop-blur-sm'>
			<div
				className={`w-full h-full ${
					theme === 'rainbow'
						? 'bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500'
						: `bg-${theme}-500`
				} animate-[spin_4s_linear_infinite]`}
			>
				<div className='absolute inset-2 rounded-xl bg-slate-900/90 flex items-center justify-center'>
					<Loader2 className='w-12 h-12 text-white animate-[spin_2s_linear_infinite_reverse]' />
				</div>
			</div>
		</div>
	</div>
);

// Flux Loading Animation
const FluxLoading = ({ theme }: { theme: ThemeColor }) => (
	<div className='relative w-52 h-52'>
		{/* Energy field */}
		<div className='absolute inset-0 flex items-center justify-center'>
			{[...Array(4)].map((_, i) => (
				<div
					key={i}
					className={`absolute w-40 h-40 rounded-full 
          ${
						theme === 'rainbow'
							? 'bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500'
							: `bg-${theme}-500`
					} 
          opacity-20`}
					style={{
						animation: `fluxPulse ${3 + i}s ease-in-out infinite`,
						transform: `scale(${1 + i * 0.2})`,
						filter: 'blur(8px)',
					}}
				/>
			))}
		</div>

		{/* Orbiting elements */}
		<div className='absolute inset-0'>
			{[...Array(8)].map((_, i) => (
				<div
					key={`orbit-${i}`}
					className='absolute inset-0 animate-[spin_4s_linear_infinite]'
					style={{ animationDelay: `${i * 0.5}s` }}
				>
					<div
						className={`absolute w-4 h-4 rounded-full 
            ${
							theme === 'rainbow'
								? 'bg-gradient-to-r from-pink-500 to-purple-500'
								: `bg-${theme}-500`
						}`}
						style={{
							top: '0%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							animation: `fluxOrbit ${2 + (i % 3)}s ease-in-out infinite`,
						}}
					/>
				</div>
			))}
		</div>

		{/* Core element */}
		<div className='absolute inset-0 m-auto w-24 h-24'>
			<div
				className={`w-full h-full rounded-full 
        ${
					theme === 'rainbow'
						? 'bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500'
						: `bg-${theme}-500`
				}
        animate-[spin_3s_linear_infinite]`}
			>
				<div className='absolute inset-2 rounded-full bg-slate-900 flex items-center justify-center'>
					<Sparkles className='w-12 h-12 text-white animate-[pulse_2s_infinite]' />
				</div>
			</div>
		</div>
	</div>
);

export const LoadingOverlay = ({
	variant = 'neon',
	scene = 'generic',
	isOpen = true,
	theme = 'blue',
	customMessages,
	title,
	subtitle,
}: LoadingOverlayProps) => {
	const [currentMessage, setCurrentMessage] = useState(0);
	const messages = customMessages || sceneMessages[scene];

	useEffect(() => {
		if (!isOpen) return;
		const interval = setInterval(() => {
			setCurrentMessage((prev) => (prev + 1) % messages.length);
		}, 2000);
		return () => clearInterval(interval);
	}, [isOpen, messages]);

	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 bg-slate-900/95 backdrop-blur-lg flex items-center justify-center z-[9999]'>
			<div className='flex flex-col items-center gap-6 p-8 max-w-md animate-[fadeIn_0.3s_ease-out]'>
				{/* Title Area */}
				{title && (
					<div className='text-center space-y-2'>
						<h2 className='text-3xl font-bold text-white tracking-tight'>
							{title}
						</h2>
						{subtitle && <p className='text-slate-400'>{subtitle}</p>}
					</div>
				)}

				{/* Loading Animation */}
				<div className='transform hover:scale-105 transition-all duration-300 ease-out'>
					{variant === 'neon' && <NeonLoading theme={theme} />}
					{variant === 'prism' && <PrismLoading theme={theme} />}
					{variant === 'flux' && <FluxLoading theme={theme} />}
				</div>

				{/* Message */}
				<div className='text-center'>
					<p className='text-xl text-white font-medium animate-[pulse_2s_infinite]'>
						{messages[currentMessage]}
					</p>
				</div>
			</div>
		</div>
	);
};

// Add these keyframes to your global CSS
const styles = `
@keyframes neonPulse {
  0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.5; }
  50% { transform: scale(1.1) rotate(180deg); opacity: 0.8; }
}

@keyframes floatParticle {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.8; }
  50% { transform: translate(5px, -5px) scale(1.5); opacity: 1; }
}

@keyframes prismRotate {
  0% { transform: rotate(0deg) translateX(10px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(10px) rotate(-360deg); }
}

@keyframes sparkle {
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(2); opacity: 1; }
}

@keyframes fluxPulse {
  0%, 100% { transform: scale(1); opacity: 0.2; }
  50% { transform: scale(1.2); opacity: 0.4; }
}

@keyframes fluxOrbit {
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -50%) scale(1.5); }
}
`;

export default LoadingOverlay;
