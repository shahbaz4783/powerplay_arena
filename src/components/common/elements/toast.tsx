import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle, XCircle, Info, X } from 'lucide-react';

interface ToastProps {
	message: string;
	type: 'info' | 'success' | 'error' | 'warning';
	duration?: number;
	onClose?: () => void;
}

const toastConfig = {
	info: {
		background: 'bg-slate-900/90',
		ring: 'ring-1 ring-blue-500/20',
		gradient:
			'bg-gradient-to-r from-blue-500/10 via-transparent to-transparent',
		icon: Info,
		iconColor: 'text-blue-400',
		progressBar: 'bg-blue-500',
		textColor: 'text-slate-200',
	},
	success: {
		background: 'bg-slate-900/90',
		ring: 'ring-1 ring-green-500/20',
		gradient:
			'bg-gradient-to-r from-green-500/10 via-transparent to-transparent',
		icon: CheckCircle,
		iconColor: 'text-green-400',
		progressBar: 'bg-green-500',
		textColor: 'text-slate-200',
	},
	error: {
		background: 'bg-slate-900/90',
		ring: 'ring-1 ring-red-500/20',
		gradient: 'bg-gradient-to-r from-red-500/10 via-transparent to-transparent',
		icon: XCircle,
		iconColor: 'text-red-400',
		progressBar: 'bg-red-500',
		textColor: 'text-slate-200',
	},
	warning: {
		background: 'bg-slate-900/90',
		ring: 'ring-1 ring-yellow-500/20',
		gradient:
			'bg-gradient-to-r from-yellow-500/10 via-transparent to-transparent',
		icon: AlertCircle,
		iconColor: 'text-yellow-400',
		progressBar: 'bg-yellow-500',
		textColor: 'text-slate-200',
	},
};

export function Toast({
	message,
	type = 'info',
	duration = 4000,
	onClose,
}: ToastProps) {
	const [isVisible, setIsVisible] = useState(true);
	const config = toastConfig[type];
	const Icon = config.icon;

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(false);
			onClose?.();
		}, duration);

		return () => clearTimeout(timer);
	}, [duration, onClose]);

	const handleClose = () => {
		setIsVisible(false);
		onClose?.();
	};

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					initial={{ opacity: 0, x: 100, scale: 0.9 }}
					animate={{ opacity: 1, x: 0, scale: 1 }}
					exit={{ opacity: 0, x: 100, scale: 0.9 }}
					transition={{
						type: 'spring',
						stiffness: 400,
						damping: 25,
					}}
					className='fixed right-4 top-4 z-50 w-80 max-w-[calc(100vw-2rem)]'
				>
					<div
						className={`
              relative overflow-hidden rounded-lg
              ${config.background}
              ${config.ring}
              backdrop-blur-lg
              shadow-lg shadow-black/10
              transition-all duration-200
            `}
					>
						{/* Gradient Overlay */}
						<div
							className={`absolute inset-0 ${config.gradient} opacity-100`}
						/>

						{/* Content */}
						<div className='relative px-4 py-3'>
							<div className='flex items-center justify-between gap-3'>
								<div className='flex items-center gap-3 min-w-0'>
									<Icon
										className={`w-5 h-5 ${config.iconColor} flex-shrink-0`}
									/>
									<p
										className={`${config.textColor} text-sm font-medium truncate`}
									>
										{message}
									</p>
								</div>
								<button
									onClick={handleClose}
									className={`${config.iconColor} hover:opacity-70 transition-opacity p-1 rounded-full
                    flex-shrink-0 -mr-1`}
								>
									<X size={14} />
								</button>
							</div>
						</div>

						{/* Progress bar */}
						<motion.div
							initial={{ width: '100%' }}
							animate={{ width: '0%' }}
							transition={{ duration: duration / 1000, ease: 'linear' }}
							className={`
                absolute bottom-0 left-0 h-0.5
                ${config.progressBar}
                opacity-50
              `}
						/>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
