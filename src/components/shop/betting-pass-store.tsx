'use client';

import { useState } from 'react';
import { Ticket, ShoppingCart } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/src/components/ui/card';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/src/components/ui/dialog';

interface BettingPassOption {
	id: number;
	name: string;
	passes: number;
	price: number;
	discount?: number;
}

const bettingPassOptions: BettingPassOption[] = [
	{ id: 1, name: 'Starter Pack', passes: 5, price: 500 },
	{ id: 2, name: 'Popular Bundle', passes: 10, price: 950, discount: 5 },
	{ id: 3, name: 'Pro Package', passes: 20, price: 1800, discount: 10 },
	{ id: 4, name: 'Ultimate Deal', passes: 30, price: 2550, discount: 15 },
];

export function BettingPassStore() {
	const [selectedOption, setSelectedOption] =
		useState<BettingPassOption | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleSelect = (option: BettingPassOption) => {
		setSelectedOption(option);
		setIsModalOpen(true);
	};

	const handlePurchase = () => {};

	return (
		<div className='w-full max-w-4xl mx-auto p-4 space-y-8'>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
				{bettingPassOptions.map((option) => (
					<Card
						key={option.id}
						className='transition-all duration-300 hover:shadow-lg'
					>
						<CardHeader>
							<CardTitle className='flex items-center justify-between'>
								<span>{option.name}</span>
								<Ticket className='h-6 w-6 text-primary' />
							</CardTitle>
							<CardDescription>{option.passes} Betting Passes</CardDescription>
						</CardHeader>
						<CardContent>
							<p className='text-2xl font-bold'>{option.price} PWR</p>
							{option.discount && (
								<p className='text-sm text-green-500'>
									Save {option.discount}%
								</p>
							)}
						</CardContent>
						<CardFooter>
							<Button
								variant='outline'
								className='w-full'
								onClick={() => handleSelect(option)}
							>
								Select
							</Button>
						</CardFooter>
					</Card>
				))}
			</div>

			<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Confirm Purchase</DialogTitle>
						<DialogDescription>
							Please review your selection before purchasing.
						</DialogDescription>
					</DialogHeader>
					{selectedOption && (
						<div className='py-4'>
							<h3 className='text-lg font-semibold mb-2'>
								{selectedOption.name}
							</h3>
							<p className='text-sm text-gray-500 mb-1'>
								Passes: {selectedOption.passes}
							</p>
							<p className='text-sm text-gray-500 mb-4'>
								Price: {selectedOption.price} PWR
							</p>
							{selectedOption.discount && (
								<p className='text-sm text-green-500 mb-4'>
									You save {selectedOption.discount}%!
								</p>
							)}
						</div>
					)}
					<DialogFooter>
						<Button variant='outline' onClick={() => setIsModalOpen(false)}>
							Cancel
						</Button>
						<Button onClick={handlePurchase}>
							<ShoppingCart className='mr-2 h-5 w-5' /> Purchase
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
