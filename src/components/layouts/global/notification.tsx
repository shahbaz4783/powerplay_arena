import React, { useState, useEffect } from 'react';
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/src/components/ui/alert-dialog';
import { X, CheckCircle, XCircle } from 'lucide-react';

interface NotificationDialogProps {
	message: string;
	success: boolean;
	duration?: number;
}

const NotificationDialog: React.FC<NotificationDialogProps> = ({
	message,
	success,
	duration = 50000,
}) => {
	const [isOpen, setIsOpen] = useState(true);

	useEffect(() => {
		setIsOpen(message === '' ? false : true);

		const timer = setTimeout(() => {
			setIsOpen(false);
		}, duration);

		return () => clearTimeout(timer);
	}, [message, duration]);

	return (
		<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
			<AlertDialogContent className='w-11/12 rounded-lg animate-in fade-in-0 zoom-in-95 duration-200'>
				<div className='absolute right-4 top-4'>
					<button
						onClick={() => setIsOpen(false)}
						className='rounded-full p-1 hover:bg-slate-800 transition-colors'
					>
						<X className='h-4 w-4 text-slate-400' />
					</button>
				</div>
				<AlertDialogHeader>
					<AlertDialogTitle className='flex items-center gap-2'>
						{success ? (
							<CheckCircle className='h-5 w-5 text-green-500' />
						) : (
							<XCircle className='h-5 w-5 text-red-500' />
						)}
						<span className={success ? 'text-green-500' : 'text-red-500'}>
							{success ? 'Success' : 'Error'}
						</span>
					</AlertDialogTitle>
					<div className='text-sm text-slate-400 text-left mt-2'>{message}</div>
				</AlertDialogHeader>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default NotificationDialog;
