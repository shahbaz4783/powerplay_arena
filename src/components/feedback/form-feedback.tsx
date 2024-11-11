'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/src/lib/utils';
import { FormResponse } from '@/src/types/types';
import { AlertCircle, CheckCircle, X } from 'lucide-react';

interface ToastProps {
	message: string;
	type: 'success' | 'error';
	onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
	return (
		<div className='p-4 rounded-xl shadow-lg backdrop-blur-md border transition-all duration-300 ease-in-out'>
			<div className='flex items-center'>
				<div>
					{type === 'success' ? (
						<CheckCircle className='w-6 h-6 text-green-500 mr-3' />
					) : (
						<AlertCircle className='w-6 h-6 text-red-500 mr-3' />
					)}
				</div>
				<p
					className={cn(
						'flex-grow text-sm font-medium font-mono',
						type === 'success' ? 'text-green-400' : 'text-red-400'
					)}
				>
					{message}
				</p>
				<button onClick={onClose} className='ml-3'>
					<X className='w-5 h-5 text-gray-500 hover:text-gray-700' />
				</button>
			</div>
		</div>
	);
};

export const FormFeedback: React.FC<FormResponse> = ({ message }) => {
	const [toasts, setToasts] = useState<
		Array<{ id: number; message: string; type: 'success' | 'error' }>
	>([]);

	useEffect(() => {
		if (message.error || message.success) {
			const newToast = {
				id: Date.now(),
				message: message.error || message.success || '',
				type: message.error ? 'error' : 'success',
			} as { id: number; message: string; type: 'error' | 'success' };

			setToasts((prev) => [...prev, newToast]);

			const timer = setTimeout(() => {
				setToasts((prev) => prev.filter((toast) => toast.id !== newToast.id));
			}, 5000);

			return () => clearTimeout(timer);
		}
	}, [message]);

	const closeToast = (id: number) => {
		setToasts((prev) => prev.filter((toast) => toast.id !== id));
	};

	return (
		<>
			{toasts.map((toast) => (
				<Toast
					key={toast.id}
					message={toast.message}
					type={toast.type}
					onClose={() => closeToast(toast.id)}
				/>
			))}
		</>
	);
};

export default FormFeedback;
