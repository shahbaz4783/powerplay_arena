import React from 'react';
import {
	AlertCircle,
	Database,
	Server,
	Wifi,
	AlertTriangle,
} from 'lucide-react';

interface ErrorComponentProps {
	error: Error | unknown;
}

export const ErrorComponent = ({ error }: ErrorComponentProps) => {
	const getErrorMessage = (error: Error | unknown): string => {
		if (error instanceof Error) {
			// Handle specific error types
			if (error.message.includes('database')) {
				return 'There was an issue connecting to the database. Please try again later.';
			}
			if (error.message.includes('network')) {
				return 'A network error occurred. Please check your internet connection and try again.';
			}
			if (error.message.includes('server')) {
				return 'The server encountered an error. Our team has been notified and is working on it.';
			}
			// If it's a general Error object, return its message
			return error.message;
		}
		// If it's not an Error object, return a generic message
		return 'An unexpected error occurred. Please try again later.';
	};

	const getErrorIcon = (message: string) => {
		if (message.includes('database')) return <Database className='w-6 h-6' />;
		if (message.includes('network')) return <Wifi className='w-6 h-6' />;
		if (message.includes('server')) return <Server className='w-6 h-6' />;
		return <AlertCircle className='w-6 h-6' />;
	};

	const errorMessage = getErrorMessage(error);
	const ErrorIcon = getErrorIcon(errorMessage);

	return (
		<div className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md flex items-start space-x-3'>
			<div className='flex-shrink-0 text-red-500'>{ErrorIcon}</div>
			<div>
				<p className='font-bold'>Error</p>
				<p>{errorMessage}</p>
			</div>
		</div>
	);
};
