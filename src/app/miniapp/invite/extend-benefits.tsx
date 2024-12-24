'use client';

import { useState, useEffect, useActionState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/src/components/ui/dialog';
import { Button } from '@/src/components/ui/button';
import {
	Star,
	Calendar,
	TrendingUp,
	Shield,
	Check,
	AlertTriangle,
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { extendBenefits } from '@/src/actions/user.action';
import { SubmitButton } from '@/src/components/common/buttons/submit-button';
import { IconButton } from '@/src/components/common/buttons/primary-button';
import { ServerResponseType } from '@/src/types/types';

interface ExtendOption {
	duration: number;
	cost: number;
	maxCapIncrease: number;
	recommended?: boolean;
}

export const extendOptions: ExtendOption[] = [
	{ duration: 1, cost: 3, maxCapIncrease: 10 },
	{ duration: 2, cost: 5, maxCapIncrease: 25 },
	{ duration: 4, cost: 9, maxCapIncrease: 60 },
	{ duration: 8, cost: 16, maxCapIncrease: 150, recommended: true },
];

interface ExtendBenefitsModalProps {
	isOpen: boolean;
	onClose: () => void;
	userId: string;
	referredId: string;
	currentExpiryDate: Date;
	currentVouchers: number;
}

export function ExtendBenefitsModal({
	isOpen,
	onClose,
	userId,
	referredId,
	currentExpiryDate,
	currentVouchers,
}: ExtendBenefitsModalProps) {
	const [selectedOption, setSelectedOption] = useState<ExtendOption>(
		extendOptions[0]
	);
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!isOpen) {
			setShowConfirmation(false);
			setSelectedOption(extendOptions[0]);
		}
	}, [isOpen]);

	const getNewExpiryDate = (weeks: number) => {
		const date = new Date(currentExpiryDate);
		date.setDate(date.getDate() + weeks * 7);
		return date.toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
		});
	};

	const [state, dispatch, isPending] = useActionState(
		(
			prevState: ServerResponseType<{ newExpiryDate: Date | null }>,
			payload: { duration: number; cost: number }
		) => extendBenefits(prevState, { referrerId: referredId, ...payload }),
		{
			success: false,
			message: '',
			data: { newExpiryDate: null },
		}
	);

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-700 text-gray-100 w-11/12 max-w-md rounded-xl shadow-xl p-6'>
				<AnimatePresence>
					{showConfirmation ? (
						<motion.div
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0 }}
							className='flex flex-col items-center py-8'
						>
							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{ delay: 0.2 }}
								className='bg-green-500/20 p-3 rounded-full mb-4'
							>
								<Check className='w-8 h-8 text-green-500' />
							</motion.div>
							<h3 className='text-xl font-bold text-green-400 mb-2'>
								Benefits Extended!
							</h3>
							<p className='text-gray-400 text-center'>
								Your benefits have been extended by {selectedOption?.duration}{' '}
								weeks
							</p>
						</motion.div>
					) : (
						<>
							<DialogHeader className='mb-4'>
								<DialogTitle className='text-2xl font-bold text-gray-100'>
									Extend Benefits
								</DialogTitle>
								<p className='text-gray-400 text-sm'>
									Choose a duration to extend your referral benefits and
									increase max capacity.
								</p>
							</DialogHeader>
							<div className='space-y-4'>
								<div className='grid grid-cols-2 gap-3'>
									{extendOptions.map((option) => {
										return (
											<motion.button
												key={option.duration}
												className={cn(
													'relative w-full p-3 flex flex-col items-center justify-center gap-1 rounded-lg border transition-all',
													selectedOption === option
														? 'border-blue-500 bg-blue-500/10'
														: selectedOption
														? 'border-gray-700 hover:border-blue-500/50'
														: 'border-gray-800 opacity-50'
												)}
												onClick={() => setSelectedOption(option)}
											>
												{option.recommended && (
													<div className='absolute -top-2 -right-2 bg-blue-500 text-xs px-2 py-1 rounded-full text-white'>
														Best Value
													</div>
												)}
												<div className='text-lg font-bold text-gray-100'>
													{option.duration}{' '}
													{option.duration === 1 ? 'Week' : 'Weeks'}
												</div>
												<div className='flex items-center text-yellow-500 text-xs'>
													<Star className='w-3 h-3 mr-1' />
													<span>{option.cost} Vouchers</span>
												</div>
												<div className='flex items-center text-blue-400 text-xs'>
													<Shield className='w-3 h-3 mr-1' />
													<span>+{option.maxCapIncrease} Cap</span>
												</div>
											</motion.button>
										);
									})}
								</div>
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									className='bg-gray-800/50 p-3 sub-card rounded-lg text-sm'
								>
									<div className='flex justify-between text-gray-400'>
										<span>Current expiry:</span>
										<span>
											{currentExpiryDate.toLocaleDateString('en-US', {
												month: 'short',
												day: 'numeric',
												year: 'numeric',
											})}
										</span>
									</div>
									<div className='flex justify-between mt-1'>
										<span className='text-gray-400'>New expiry:</span>
										<span className='text-blue-400'>
											{getNewExpiryDate(selectedOption.duration)}
										</span>
									</div>
								</motion.div>
								<div className='flex justify-between items-center pt-3 border-t border-gray-700'>
									<div className='text-sm text-gray-400'>
										Available Vouchers:{' '}
										<span className='text-yellow-500'>{currentVouchers}</span>
									</div>
									<IconButton
										text={isLoading ? 'Extending...' : 'Extend'}
										icon={TrendingUp}
										onClick={() => dispatch({ duration: 2, cost: 3 })}
									/>
								</div>
							</div>
						</>
					)}
				</AnimatePresence>
			</DialogContent>
		</Dialog>
	);
}
