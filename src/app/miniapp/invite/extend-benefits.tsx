import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/src/components/ui/dialog';
import { Button } from '@/src/components/ui/button';
import { Star, Calendar, TrendingUp, Shield, Lock, Check } from 'lucide-react';
import { Progress } from '@/src/components/ui/progress';
import { SectionHeader } from '@/src/components/common/elements/section-header';

interface ExtendOption {
	duration: number;
	cost: number;
	maxCapIncrease: number;
	recommended?: boolean;
}

const extendOptions: ExtendOption[] = [
	{ duration: 1, cost: 3, maxCapIncrease: 10 },
	{ duration: 2, cost: 5, maxCapIncrease: 25 },
	{ duration: 4, cost: 9, maxCapIncrease: 60, recommended: true },
	{ duration: 8, cost: 16, maxCapIncrease: 150 },
];

interface ExtendBenefitsModalProps {
	isOpen: boolean;
	onClose: () => void;
	userId: string;
	currentExpiryDate: Date;
	currentVouchers?: number;
}

export function ExtendBenefitsModal({
	isOpen,
	onClose,
	userId,
	currentExpiryDate,
	currentVouchers = 10,
}: ExtendBenefitsModalProps) {
	const [selectedOption, setSelectedOption] = useState<ExtendOption | null>(
		null
	);
	const [showConfirmation, setShowConfirmation] = useState(false);

	useEffect(() => {
		if (!isOpen) {
			setShowConfirmation(false);
			setSelectedOption(null);
		}
	}, [isOpen]);

	const handleExtend = () => {
		if (selectedOption) {
			setShowConfirmation(true);
			setTimeout(() => {
				onClose();
				setShowConfirmation(false);
			}, 1500);
		}
	};

	const getNewExpiryDate = (weeks: number) => {
		const date = new Date(currentExpiryDate);
		date.setDate(date.getDate() + weeks * 7);
		return date.toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
		});
	};


	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-700 text-gray-100 w-11/12 max-w-md rounded-xl shadow-xl'>
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
							<DialogHeader className='mb-6'>
								<SectionHeader
									title='Extend Benefits'
									icon={Calendar}
									description='Choose a duration to extend your referral benefits and increase max capacity.'
								/>
							</DialogHeader>
							<div className='space-y-6'>
								<div className='grid grid-cols-2 gap-4'>
									{extendOptions.map((option) => {
										const isAffordable = currentVouchers >= option.cost;
										return (
											<motion.div
												key={option.duration}
												whileTap={{ scale: 0.9 }}
												animate={selectedOption === option ? 'selected' : ''}
											>
												<motion.button
													disabled={!isAffordable}
													className={`relative w-full h-full p-4 flex flex-col items-center justify-center gap-2 rounded-xl border-2 transition-all
                            ${
															selectedOption === option
																? 'border-blue-500 bg-blue-500/10'
																: isAffordable
																? 'border-gray-700'
																: 'border-gray-800 opacity-50'
														}
                          `}
													onClick={() => setSelectedOption(option)}
												>
													{option.recommended && (
														<div className='absolute -top-2 -right-2'>
															<div className='bg-blue-500 text-xs px-2 py-1 rounded-full text-white'>
																Best Value
															</div>
														</div>
													)}
													{!isAffordable && (
														<Lock className='absolute top-2 right-2 w-4 h-4 text-gray-600' />
													)}
													<div className='text-lg font-bold text-gray-100'>
														{option.duration}{' '}
														{option.duration === 1 ? 'Week' : 'Weeks'}
													</div>
													<div className='flex items-center text-yellow-500 text-sm'>
														<Star className='w-4 h-4 mr-1' />
														<span>{option.cost} Vouchers</span>
													</div>
													<div className='flex items-center text-blue-400 text-sm mt-1'>
														<Shield className='w-4 h-4 mr-1' />
														<span>+{option.maxCapIncrease} Cap</span>
													</div>
												</motion.button>
											</motion.div>
										);
									})}
								</div>
								{selectedOption && (
									<motion.div
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										className='bg-gray-800/50 p-3 rounded-lg'
									>
										<div className='flex justify-between text-sm text-gray-400'>
											<span>Current expiry:</span>
											<span>
												{currentExpiryDate.toLocaleDateString('en-US', {
													month: 'short',
													day: 'numeric',
													year: 'numeric',
												})}
											</span>
										</div>
										<div className='flex justify-between text-sm mt-1'>
											<span className='text-gray-400'>New expiry:</span>
											<span className='text-blue-400'>
												{selectedOption &&
													getNewExpiryDate(selectedOption.duration)}
											</span>
										</div>
									</motion.div>
								)}
								<div className='flex justify-end pt-4 border-t border-gray-700'>
									<Button
										onClick={handleExtend}
										disabled={!selectedOption}
										className={`${
											selectedOption ? 'bg-blue-500' : 'bg-gray-700'
										} text-white px-6 transition-all`}
									>
										<TrendingUp className='w-4 h-4 mr-2' />
										Extend Now
									</Button>
								</div>
							</div>
						</>
					)}
				</AnimatePresence>
			</DialogContent>
		</Dialog>
	);
}
