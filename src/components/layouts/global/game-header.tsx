'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, AlertCircle, LucideIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/src/components/ui/alert-dialog';

interface GameHeaderProps {
	title: string;
	icon: LucideIcon;
	iconColors: string;
	titleGradient: string;
	hasUnsavedProgress: boolean;
	quitPath: string;
}

export const GameHeader = ({
	title,
	icon: Icon,
	iconColors = 'from-yellow-400 to-yellow-600',
	titleGradient = 'from-yellow-200 via-yellow-300 to-yellow-200',
	hasUnsavedProgress = false,
	quitPath = '/miniapp',
}: GameHeaderProps) => {
	const [showQuitDialog, setShowQuitDialog] = useState(false);
	const router = useRouter();

	const handleQuit = async () => {
		router.push(quitPath);
	};

	return (
		<>
			<div className='fixed top-0 left-0 right-0 z-[10] text-slate-200'>
				<div className='bg-gradient-to-b from-gray-900/95 to-gray-900/75 backdrop-blur-sm border-b border-gray-800'>
					<div className='max-w-7xl mx-auto px-4 h-16 flex items-center justify-between'>
						{/* Game Title */}
						<div className='flex items-center space-x-3'>
							<motion.div
								initial={{ rotate: 0 }}
								animate={{ rotate: 360 }}
								transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
								className={`w-8 h-8 rounded-full bg-gradient-to-r ${iconColors}`}
							>
								<Icon className='w-6 h-6' />
							</motion.div>
							<h1
								className={`text-xl font-bold bg-gradient-to-r ${titleGradient} bg-clip-text text-transparent`}
							>
								{title}
							</h1>
						</div>

						{/* Quit Button */}
						<motion.button
							onClick={() => setShowQuitDialog(true)}
							whileTap={{ scale: 0.9 }}
							className='px-4 py-2 rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700'
						>
							<div className='flex items-center space-x-2'>
								<X className='w-4 h-4 text-gray-400' />
								<span className='text-sm font-medium text-gray-400 '>
									Quit Game
								</span>
							</div>
						</motion.button>
					</div>
				</div>

				{/* Quit Confirmation Dialog */}
				<AlertDialog open={showQuitDialog} onOpenChange={setShowQuitDialog}>
					<AlertDialogContent className='bg-gray-900 border rounded-xl border-gray-800 w-11/12 m-auto'>
						<AlertDialogHeader>
							<AlertDialogTitle className='flex items-center space-x-2'>
								<AlertCircle className='w-5 h-5 text-red-400' />
								<span>Quit Game?</span>
							</AlertDialogTitle>
							<AlertDialogDescription className='text-gray-400 text-left'>
								{hasUnsavedProgress
									? 'You have unsaved progress. Are you sure you want to quit?'
									: 'Are you sure you want to quit?'}
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter className='grid grid-cols-2 items-center gap-3'>
							<AlertDialogCancel className='bg-gray-800 border-gray-700'>
								Cancel
							</AlertDialogCancel>
							<AlertDialogAction
								onClick={handleQuit}
								className='bg-red-600 text-white border-0'
							>
								Quit Game
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div>
			<div className='h-16' />
		</>
	);
};
