'use client';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/src/components/ui/dialog';
import { Button } from '@/src/components/ui/button';
import { token } from '@/src/constants/app-config';
import { RefreshCw, Home } from 'lucide-react';

interface ResultModalProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	result: 'win' | 'lose' | null;
	winAmount: number;
	onBetAgain: () => void;
	onGoHome: () => void;
	message: {
		error?: string;
		success?: string;
	};
}

export function BetResult({
	isOpen,
	onOpenChange,
	result,
	winAmount,
	onBetAgain,
	onGoHome,
	message,
}: ResultModalProps) {
	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>
						{result === 'win' ? 'Congratulations!' : 'Better luck next time!'}
					</DialogTitle>
					<DialogDescription>
						{message.success ||
							message.error ||
							(result === 'win'
								? `You won ${winAmount} ${token.symbol}!`
								: 'You lost your bet.')}
					</DialogDescription>
				</DialogHeader>
				<div className='flex justify-center space-x-4 mt-6'>
					<Button onClick={onBetAgain} className='flex items-center'>
						<RefreshCw className='mr-2 h-4 w-4' />
						Bet Again
					</Button>
					<Button
						onClick={onGoHome}
						variant='outline'
						className='flex items-center'
					>
						<Home className='mr-2 h-4 w-4' />
						Go Home
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
