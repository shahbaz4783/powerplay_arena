'use client';

import { useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/src/components/ui/dialog';
import { Info, BoltIcon as Bat, BellIcon as Ball } from 'lucide-react';
import { Button } from '@/src/components/ui/button';

interface InfoDialogProps {
	title: string;
	description: string;
	controls: { name: string; description: string; icon: React.ReactNode }[];
}

export function InfoDialog({ title, description, controls }: InfoDialogProps) {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					variant='ghost'
					size='icon'
					className='bg-black/50 rounded-full backdrop-blur-sm hover:bg-black/70'
				>
					<Info className='h-5 w-5 text-white' />
					<span className='sr-only'>Open info dialog</span>
				</Button>
			</DialogTrigger>
			<DialogContent className='w-11/12 bg-gray-900 border border-gray-800 rounded-xl p-0 overflow-hidden'>
				<DialogHeader className='p-6 bg-gradient-to-r from-blue-600/20 to-purple-800 border-b border-gray-800'>
					<DialogTitle className='text-2xl font-bold text-white flex items-center gap-2'>
						{title === 'Batting Controls' ? (
							<Bat className='w-6 h-6 text-yellow-500' />
						) : (
							<Ball className='w-6 h-6 text-yellow-500' />
						)}
						{title}
					</DialogTitle>
				</DialogHeader>
				<div className='p-6 space-y-6'>
					<p className='text-gray-300 text-sm'>{description}</p>

					<div className='grid grid-cols-1 gap-4'>
						{controls.map((control, index) => (
							<div
								key={control.name}
								className='bg-gray-800/50 rounded-xl p-4 border border-gray-700'
							>
								<div className='flex items-center gap-2 mb-2'>
									{control.icon}
									<h3 className='text-sm font-semibold text-white'>
										{control.name}
									</h3>
								</div>
								<p className='text-gray-300 text-sm'>{control.description}</p>
							</div>
						))}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
