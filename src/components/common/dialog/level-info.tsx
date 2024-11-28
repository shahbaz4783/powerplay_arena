'use client';

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/src/components/ui/dialog';
import { motion } from 'framer-motion';

interface LevelInfoProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	levels: {
		level: number;
		price: number;
		effect: string;
	}[];
}

export function LevelInfo({ isOpen, onClose, title, levels }: LevelInfoProps) {
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='bg-gray-900 border border-gray-800'>
				<DialogHeader>
					<DialogTitle className='text-xl font-bold text-white'>
						{title} Levels
					</DialogTitle>
				</DialogHeader>
				<div className='space-y-4 mt-4'>
					{levels.map((level, index) => (
						<motion.div
							key={level.level}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1 }}
							className='bg-gray-800 p-4 rounded-lg'
						>
							<div className='flex justify-between items-center mb-2'>
								<h4 className='text-lg font-semibold text-white'>
									Level {level.level}
								</h4>
								<span className='text-yellow-500 font-bold'>
									{level.price} coins
								</span>
							</div>
							<p className='text-gray-300 text-sm'>{level.effect}</p>
						</motion.div>
					))}
				</div>
			</DialogContent>
		</Dialog>
	);
}
