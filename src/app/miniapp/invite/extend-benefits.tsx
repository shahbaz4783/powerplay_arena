import { useState } from 'react';
import { motion } from 'framer-motion';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/src/components/ui/dialog';
import { Button } from '@/src/components/ui/button';
import { Star, Calendar } from 'lucide-react';

interface ExtendOption {
	duration: number;
	cost: number;
}

const extendOptions: ExtendOption[] = [
	{ duration: 1, cost: 3 },
	{ duration: 2, cost: 5 },
	{ duration: 4, cost: 9 },
	{ duration: 8, cost: 16 },
];

interface ExtendBenefitsModalProps {
	isOpen: boolean;
	onClose: () => void;
	userId: string;
	currentExpiryDate: Date;
}

export function ExtendBenefitsModal({
	isOpen,
	onClose,
	userId,
	currentExpiryDate,
}: ExtendBenefitsModalProps) {
	const [selectedOption, setSelectedOption] = useState<ExtendOption | null>(
		null
	);

	const handleExtend = () => {
		if (selectedOption) {
			// TODO: Implement the actual extension logic here
			console.log(
				`Extending benefits for user ${userId} by ${selectedOption.duration} weeks`
			);
			onClose();
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='bg-gray-900 border-gray-700 text-gray-100 w-11/12 rounded-xl'>
				<DialogHeader>
					<DialogTitle className='text-xl font-bold text-blue-400 flex items-center gap-2'>
						<Calendar className='w-5 h-5' />
						Extend Benefits
					</DialogTitle>
				</DialogHeader>
				<div className='space-y-4'>
					<p className='text-sm text-gray-300'>
						Choose an option to extend the expiry date of your referral
						benefits:
					</p>
					<div className='grid grid-cols-2 gap-3'>
						{extendOptions.map((option) => (
							<motion.div
								key={option.duration}
								whileTap={{ scale: 0.95 }}
								className='flex-1'
							>
								<Button
									variant='outline'
									className={`w-full h-full p-2 flex flex-col items-center justify-center border ${
										selectedOption === option
											? 'border-blue-500 bg-blue-900/20'
											: 'border-gray-700'
									}`}
									onClick={() => setSelectedOption(option)}
								>
									<span className='text-lg font-bold'>{option.duration}</span>
									<span className='text-xs'>
										{option.duration === 1 ? 'Week' : 'Weeks'}
									</span>
									<div className='mt-1 flex items-center text-xs'>
										<Star className='w-3 h-3 text-yellow-500 mr-1' />
										<span>{option.cost} Voucher</span>
									</div>
								</Button>
							</motion.div>
						))}
					</div>
					<div className='flex justify-between items-center text-xs'>
						<p className='text-gray-400'>
							Expires: {currentExpiryDate.toLocaleDateString()}
						</p>
						<Button
							onClick={handleExtend}
							disabled={!selectedOption}
							className='bg-blue-600 text-white text-sm py-1 px-2'
						>
							Extend
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
