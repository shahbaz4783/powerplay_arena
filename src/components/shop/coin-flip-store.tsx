'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpCircle, ArrowDownCircle, Coins } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/src/components/ui/card';
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/src/components/ui/tabs';
import { Slider } from '@/src/components/ui/slider';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/src/components/ui/dialog';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import { SubmitButton } from '../feedback/submit-button';

const bettingTiers = [
	{ name: 'Low Stakes', minBet: 10, maxBet: 100 },
	{ name: 'Medium Stakes', minBet: 100, maxBet: 1000 },
	{ name: 'High Roller', minBet: 1000, maxBet: 10000 },
];

const challenges = [
	{
		name: 'Safe Bet',
		description: '75% chance to win, but only 1.3x payout',
		odds: 0.75,
		payout: 1.3,
	},
	{
		name: 'Classic Flip',
		description: '50/50 chance to double your bet',
		odds: 0.5,
		payout: 2,
	},
	{
		name: 'Triple or Nothing',
		description: '33% chance to triple your bet',
		odds: 0.33,
		payout: 3,
	},
	{
		name: 'High Risk, High Reward',
		description: '20% chance to quintuple your bet',
		odds: 0.2,
		payout: 5,
	},
];

export function CoinFlipChallenge() {
	const [selectedTier, setSelectedTier] = useState(bettingTiers[0]);
	const [selectedChallenge, setSelectedChallenge] = useState(challenges[0]);
	const [betAmount, setBetAmount] = useState(selectedTier.minBet);
	const [userBalance, setUserBalance] = useState(1000);
	const [result, setResult] = useState<'win' | 'lose' | null>(null);
	const [isSpinning, setIsSpinning] = useState(false);
	const [selectedSide, setSelectedSide] = useState<'heads' | 'tails' | null>(
		null
	);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleBet = () => {
		if (betAmount > userBalance || !selectedSide) return;

		setIsSpinning(true);
		setResult(null);
		setIsModalOpen(true);

		setTimeout(() => {
			const randomOutcome = Math.random();
			const isWin = randomOutcome <= selectedChallenge.odds;

			if (isWin) {
				setUserBalance(
					userBalance + betAmount * (selectedChallenge.payout - 1)
				);
				setResult('win');
			} else {
				setUserBalance(userBalance - betAmount);
				setResult('lose');
			}

			setIsSpinning(false);
		}, 5000);
	};

	return (
		<div className='w-full max-w-2xl mx-auto'>
			<section className='space-y-4'>
				<Tabs
					defaultValue={bettingTiers[0].name}
					className='w-full bg-slate-900 rounded-xl p-3 space-y-3'
				>
					{bettingTiers.map((tier) => (
						<TabsContent key={tier.name} value={tier.name}>
							<div className='space-y-4'>
								<div className='flex justify-between text-sm text-muted-foreground'>
									<span>Min Bet: {tier.minBet}</span>
									<span>Max Bet: {tier.maxBet}</span>
								</div>
								<Slider
									min={tier.minBet}
									max={tier.maxBet}
									step={1}
									value={[betAmount]}
									onValueChange={(value) => setBetAmount(value[0])}
									className='w-full'
								/>
								<div className='text-center font-semibold'>
									Bet Amount: {betAmount} coins
								</div>
							</div>
						</TabsContent>
					))}
					<TabsList className='grid w-full grid-cols-3 rounded-xl'>
						{bettingTiers.map((tier) => (
							<TabsTrigger
								key={tier.name}
								value={tier.name}
								onClick={() => setSelectedTier(tier)}
								className='rounded-xl'
							>
								{tier.name}
							</TabsTrigger>
						))}
					</TabsList>
				</Tabs>
				<div className='space-y-2 bg-slate-900 rounded-xl p-3'>
					<h3 className='font-semibold text-lg'>Select Challenge:</h3>
					<div className='grid grid-cols-2 gap-2'>
						{challenges.map((challenge) => (
							<Button
								key={challenge.name}
								variant={
									selectedChallenge === challenge ? 'default' : 'outline'
								}
								className='w-full rounded-xl h-auto py-2 flex flex-col items-center justify-center'
								onClick={() => setSelectedChallenge(challenge)}
							>
								<span className='font-semibold'>{challenge.name}</span>
								<span className='text-sm'>
									{challenge.payout}x - {challenge.odds * 100}%
								</span>
							</Button>
						))}
					</div>
				</div>
				<div className=' bg-slate-900 rounded-xl p-3'>
					<h3 className='font-semibold text-lg mb-2'>Choose your side:</h3>
					<ToggleGroup
						type='single'
						value={selectedSide || ''}
						onValueChange={(value) =>
							setSelectedSide(value as 'heads' | 'tails')
						}
					>
						<ToggleGroupItem value='heads' aria-label='Heads'>
							Heads
						</ToggleGroupItem>
						<ToggleGroupItem value='tails' aria-label='Tails'>
							Tails
						</ToggleGroupItem>
					</ToggleGroup>
				</div>

				<SubmitButton
					title='Place Bet'
					loadingTitle='Please wait for result...'
					onClick={handleBet}
					disabled={betAmount > userBalance || !selectedSide || isSpinning}
					className='w-full'
				/>
			</section>

			<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
				<DialogContent className='sm:max-w-md'>
					<DialogHeader>
						<DialogTitle className='text-center'>
							Flipping the Coin!
						</DialogTitle>
					</DialogHeader>
					<div className='flex items-center justify-center py-8'>
						<AnimatePresence>
							{isSpinning && (
								<motion.div
									initial={{ rotateY: 0 }}
									animate={{ rotateY: 1800 }}
									transition={{ duration: 5, ease: 'easeInOut' }}
									className='w-32 h-32 bg-yellow-400 rounded-full flex items-center justify-center'
								>
									<Coins className='text-white' size={64} />
								</motion.div>
							)}
							{result && !isSpinning && (
								<motion.div
									initial={{ opacity: 0, scale: 0.5 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.5 }}
									className={`text-center p-4 rounded-md ${
										result === 'win' ? 'bg-green-500' : 'bg-red-500'
									} text-white font-bold text-xl`}
								>
									{result === 'win' ? (
										<ArrowUpCircle className='inline-block mr-2 h-8 w-8' />
									) : (
										<ArrowDownCircle className='inline-block mr-2 h-8 w-8' />
									)}
									You {result}!
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}
